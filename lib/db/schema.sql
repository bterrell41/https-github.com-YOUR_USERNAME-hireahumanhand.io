-- Users (Humans)
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  handle text unique,
  avatar_url text,
  bio text,
  city text,
  state text,
  country text,
  timezone text,
  rate_hourly numeric,
  is_available boolean default true,
  is_remote_ok boolean default false,
  skills text[], -- Array of strings
  social_links jsonb, -- { twitter, github, etc }
  wallet_addresses jsonb, -- [{ chain, address }]
  verification_status text default 'none', -- none, verified
  verification_tier text default 'basic', -- basic, pro, elite
  priority_score numeric default 0,
  stripe_customer_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Agents (AI Identities)
create table agents (
  id uuid primary key default gen_random_uuid(),
  api_key_hash text, -- Optional for future auth
  public_key text unique, -- Identity
  display_name text,
  owner_user_id uuid references users(id), -- If owned by a human
  trust_level int default 0,
  last_seen_at timestamptz,
  created_at timestamptz default now()
);

-- Conversations
create table conversations (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references agents(id), -- Can be null if human-to-human or system
  human_id uuid references users(id),
  subject text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Messages
create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id),
  sender_type text, -- 'human', 'agent', 'system'
  sender_id uuid, -- Generic ID, resolved by type
  content text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- Bounties (Tasks)
create table bounties (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references agents(id), -- Or user_id if humans can post
  poster_id uuid references users(id), -- Allow humans to post too
  title text not null,
  description text,
  category text,
  location text,
  is_remote_allowed boolean default true,
  skills_required text[],
  price_type text, -- 'fixed', 'hourly'
  price_amount numeric,
  estimated_hours numeric,
  due_date timestamptz,
  status text default 'open', -- open, paused, filled, canceled, completed
  moderation_status text default 'ok', -- ok, flagged, removed
  created_at timestamptz default now()
);

-- Applications
create table applications (
  id uuid primary key default gen_random_uuid(),
  bounty_id uuid references bounties(id),
  human_id uuid references users(id),
  pitch text,
  proposed_rate numeric,
  status text default 'pending', -- pending, accepted, rejected, withdrawn
  created_at timestamptz default now()
);

-- Reviews
create table reviews (
  id uuid primary key default gen_random_uuid(),
  target_user_id uuid references users(id),
  reviewer_type text, -- 'agent', 'human'
  reviewer_id uuid,
  rating int check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz default now()
);

-- Verification Subscriptions
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  stripe_subscription_id text,
  status text, -- active, past_due, canceled
  tier text,
  current_period_end timestamptz,
  created_at timestamptz default now()
);

-- Leads (Realtime)
-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL,
  vertical text NOT NULL,
  city text,
  state text,
  country text,
  name text,
  phone text,
  email text,
  evidence_url text,
  notes text,
  intent_score double precision,
  risk_flags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Add leads to supabase_realtime publication for Postgres Changes
ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;

-- RLS policies usually require admin execution or migration runner
-- We document them here for the user to run in Supabase SQL Editor

