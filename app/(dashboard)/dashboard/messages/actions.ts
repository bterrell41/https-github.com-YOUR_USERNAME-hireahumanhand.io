'use server'

import { createServerSupabaseClient } from '@/lib/db/supabase-server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function startConversation(targetUserId: string) {
    const supabase = await createServerSupabaseClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    // Check if conversation already exists
    // Does Supabase have a good way to check "conversations where I am a participant and target is a participant"?
    // Since our schema (from previous view) uses a specific structure:
    // create table conversations (id, human_id, agent_id, ...) 
    // Wait, the schema view showed:
    // human_id uuid references users(id)
    // agent_id uuid references agents(id)
    // This schema seems to enforce Human-Agent pairing?
    // Let's re-read the schema.sql in memory or assume I might need to adjust logic or schema if Human-Human is allowed.
    // Schema said: "agent_id uuid references agents(id) -- Can be null if human-to-human or system"
    // "human_id uuid references users(id)"
    // If it's human-to-human hiring, we might need a different structure or abuse these fields.
    // For now, let's assume filtering by participant logic which refers to 'messages' or we create a new conversation 
    // associated with the current user.

    // Simplification for MVP: Just create a new conversation row.
    // Ideally we deduplicate.

    // We need to know who is the 'initiator' vs 'target'.
    // If our schema relies on 'human_id' field, that implies one side is the 'human'.

    // Let's look at schema again if possible. 
    // Schema: 
    // create table conversations (
    //   id uuid primary key default gen_random_uuid(),
    //   agent_id uuid references agents(id), 
    //   human_id uuid references users(id),
    //   ...
    // );
    // This schema seems designed for Agent <-> Human. 
    // If we are doing Human <-> Human (User hiring another User), this schema is limiting.
    // However, for this MVP, let's just insert a row.
    // Maybe we treat the "Hiree" as the "Agent" conceptually? Or just add a new field 'target_user_id'?

    // ACTION: I will proceed by just inserting into `conversations` with `human_id = user.id` 
    // and storing the `targetUserId` in `subject` or a specialized field if I can't change schema.
    // Actually, let's check if I can modify schema. The user said "Marketplace for AI-verified human labor".
    // Usually Human (Employer) Hires Human (Worker).

    // Let's assume we use `human_id` for the creator, and maybe `agent_id` is null, 
    // but we need to store the other participant. 
    // Use `subject` to store "Conversation with [Name]" for now?
    // Better: Creating a new `messages` row is what matters.

    // Let's create a conversation.
    const { data: conversation, error } = await supabase
        .from('conversations')
        .insert({
            human_id: user.id,
            subject: `Hiring Inquiry`,
            // Storing the target user ID in metadata or relying on the first message to define it?
            // This schema is a bit sparse for Human-Human.
            // Let's insert a message immediately to establish context.
        })
        .select()
        .single()

    if (error) {
        console.error('Error creating conversation:', error)
        throw new Error('Failed to create conversation')
    }

    // Insert the initial "system" or "intent" message implies the target
    // But we need to knowing WHO receives it.
    // The `messages` table has `sender_id`.
    // We are missing a `recipient_id` or a `participants` table.
    // It's likely this schema was "Agent-first".

    // Workaround: I'll direct the user to the messages page with the NEW conversation ID.
    // And I will insert a message from the Current User.
    // But how does the Target User see it?
    // We need to associate the Target User. 
    // I will try to add `target_user_id` to `conversations` schema via SQL if I can't find a better way.
    // OR create a `participants` table.

    // For SPEED/MVP: Use `agent_id` column to store the `targetUserId` if the column constraints allow UUIDs from users table?
    // The schema said `references agents(id)`. It will fail foreign key constraint if I put a User ID there.
    // Check schema line 42: `agent_id uuid references agents(id)`.

    // OK, I should probably add `recipient_id` to conversations or `other_user_id`.
    // Or just use `subject` to store JSON `{"target_user_id": "..."}`? Hacky.

    // Let's try to UPDATE the schema to add `participant_ids` array or `target_user_id`.
    // Wait, I can't run SQL migrations easily without prompt.
    // Let's double check if `users` table acts as agents too? No.

    // OK, let's look at `bounties`.
    // Maybe "Hiring" creates a `bounty`?
    // "Hire Human" -> "Create Bounty assigned to Human"?
    // That fits the schema better: `bounties` has `agent_id` or `human_id`.
    // "poster_id uuid references users(id)"
    // But we want a Chat.

    // Decision: I will assume I can create a conversation and I will use the `subject` field to store 
    // "Conversation with [Target User Name]" and I will use a `metadata` jsonb column if it exists?
    // Schema didn't show metadata.

    // Let's ADD a simple migration file instructions or just try to work with what matches.
    // Actually, `messages` table has `sender_id`.
    // If I send a message, it exists in the conversation.
    // If the Other User queries for "Conversations where I am mentioned"? No.

    // REALITY CHECK: The provided schema is for an "AI Agent Platform" where users talk to Agents.
    // The user pivoted to "Hire A Human".
    // I need to enable Human-to-Human chat.

    // Plan: 
    // 1. Create conversation.
    // 2. Insert message from `user.id` saying "Hi, I'd like to hire you."
    // 3. Insert message from `targetUserId` (phantom) or just rely on the UI to show it?
    // No, logic breaks for the recipient.

    // I will add `target_user_id` to the `conversations` table in the schema plan or just execute a raw SQL command if possible?
    // I can't execute raw SQL.
    // I will write a Server Action that attempts to use `agent_id` as NULL and expects to find the conversation via...
    // This is tricky.

    // Let's look at `bounties` again.
    // `applications` links `bounty` and `human`.

    // Maybe "Hire" -> Create a private Bounty?
    // That seems heavy.

    // Pivot: I will add a column `recipient_id` to `conversations` by creating a migration file and asking User to run it? 
    // No, User said "Fix all of this".

    // I will try to use the `subject` field to store the target user ID in a structured way, 
    // e.g. "DIRECT_MESSAGE:{target_user_id}"
    // And then filter in the UI. It's ugly but works without schema change commands.

    const subject = `DIRECT_MESSAGE:${targetUserId}`

    // Check if exists
    // We need to fetch all conversations content matches? No, subject matches.
    const { data: existing } = await supabase
        .from('conversations')
        .select('id')
        .eq('human_id', user.id)
        .eq('subject', subject)
        .single()

    if (existing) {
        redirect(`/dashboard/messages?id=${existing.id}`)
    }

    const { data: newConvo, error: createError } = await supabase
        .from('conversations')
        .insert({
            human_id: user.id,
            subject: subject // This links the target user
        })
        .select()
        .single()

    if (createError) throw new Error(createError.message)

    // Send initial message
    await supabase.from('messages').insert({
        conversation_id: newConvo.id,
        sender_type: 'human',
        sender_id: user.id,
        content: "I'm interested in hiring you. Are you available?"
    })

    redirect(`/dashboard/messages?id=${newConvo.id}`)
}

export async function sendMessage(conversationId: string, content: string) {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase.from('messages').insert({
        conversation_id: conversationId,
        sender_type: 'human',
        sender_id: user.id,
        content
    })

    if (error) return { error: error.message }

    revalidatePath('/dashboard/messages')
}
