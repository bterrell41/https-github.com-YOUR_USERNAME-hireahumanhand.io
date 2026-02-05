import { createServerSupabaseClient } from '@/lib/db/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Send } from "lucide-react"
import { sendMessage } from './actions'

export const dynamic = 'force-dynamic'

export default async function MessagesPage({ searchParams }: { searchParams: { id?: string } }) {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // 1. Fetch Conversations
    // We fetch conversations where the user is the 'human_id'. 
    // Ideally we would also join to get the 'Target' name.
    // Since our schema is limited, we rely on the `subject` hack: "DIRECT_MESSAGE:{targetUserId}"
    const { data: conversations } = await supabase
        .from('conversations')
        .select('*')
        .or(`human_id.eq.${user.id}`)
        .order('created_at', { ascending: false })

    const activeConversationId = searchParams.id

    // 2. Fetch Active Messages
    let messages = []
    let activeSubject = "Select a conversation"

    if (activeConversationId) {
        const { data: msgs } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', activeConversationId)
            .order('created_at', { ascending: true })

        messages = msgs || []

        const activeConvo = conversations?.find(c => c.id === activeConversationId)
        if (activeConvo) {
            // Parse subject hack or use generic fallback
            if (activeConvo.subject?.startsWith("DIRECT_MESSAGE:")) {
                // Fetch target user name? Too expensive for MVP loop. 
                // Just Show "Conversation"
                activeSubject = "Hiring Discussion"
            } else {
                activeSubject = activeConvo.subject || "Conversation"
            }
        }
    }

    return (
        <div className="flex h-[calc(100vh-8rem)] rounded-xl border border-border/50 bg-card/30 overflow-hidden">
            {/* Sidebar List */}
            <div className="w-80 border-r border-border/50 flex flex-col bg-card/20 text-foreground">
                <div className="p-4 border-b border-border/50">
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search messages..." className="pl-8 bg-background/50 h-9" />
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    <div className="flex flex-col p-2 gap-1">
                        {conversations?.map((convo: any) => (
                            <Link
                                key={convo.id}
                                href={`/dashboard/messages?id=${convo.id}`}
                                className={`flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${activeConversationId === convo.id ? 'bg-primary/10 hover:bg-primary/15' : 'hover:bg-muted/50'}`}
                            >
                                <Avatar className="h-10 w-10 border border-border/50">
                                    <AvatarFallback>C</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-semibold text-sm truncate">
                                            {convo.subject?.replace('DIRECT_MESSAGE:', 'Chat: ').substring(0, 20)}...
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(convo.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">
                                        View conversation
                                    </p>
                                </div>
                            </Link>
                        ))}
                        {(!conversations || conversations.length === 0) && (
                            <div className="p-4 text-center text-xs text-muted-foreground">
                                No conversations yet. <br /> <Link href="/browse" className="text-primary hover:underline">Hire someone</Link> to start.
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-background/30 text-foreground">
                {activeConversationId ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-16 border-b border-border/50 flex items-center justify-between px-6 bg-card/20">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>#</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-bold leading-none">{activeSubject}</h4>
                                    <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        Active
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Message List */}
                        <ScrollArea className="flex-1 p-6">
                            <div className="flex flex-col gap-4">
                                {messages.map((msg: any) => {
                                    const isMe = msg.sender_id === user.id
                                    return (
                                        <div key={msg.id} className={`flex gap-3 max-w-[80%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}>
                                            <Avatar className="h-8 w-8 mt-1">
                                                <AvatarFallback>{isMe ? 'Me' : '?'}</AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-1">
                                                <div className={`rounded-2xl p-3 text-sm ${isMe ? 'rounded-tr-sm bg-primary text-primary-foreground' : 'rounded-tl-sm bg-muted'}`}>
                                                    {msg.content}
                                                </div>
                                                <p className={`text-[10px] text-muted-foreground ${isMe ? 'text-right' : ''}`}>
                                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </ScrollArea>

                        {/* Input Area */}
                        <div className="p-4 border-t border-border/50 bg-card/20">
                            <form
                                action={async (formData) => {
                                    'use server'
                                    await sendMessage(activeConversationId, formData.get('content') as string)
                                }}
                                className="flex gap-2"
                            >
                                <Input
                                    name="content"
                                    placeholder="Type a message..."
                                    className="flex-1 bg-background/50"
                                    required
                                />
                                <Button type="submit">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                        Select a conversation to start chatting.
                    </div>
                )}
            </div>
        </div>
    )
}
