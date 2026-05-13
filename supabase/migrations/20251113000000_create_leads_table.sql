create table leads (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  source text not null,  -- 'gap_assessment' | 'deadline_tracker' | 'newsletter'
  score integer,         -- for gap assessment
  answers jsonb,         -- for gap assessment
  facility_type text,
  annual_sales_range text,
  created_at timestamptz default now()
);

create index leads_email_idx on leads(email);
create index leads_source_idx on leads(source);
create index leads_created_at_idx on leads(created_at);

-- Row level security
alter table leads enable row level security;
-- Only server-side access (no client reads)
create policy "Service role only" on leads
  using (false);
