-- Shop2GY MVP database schema for Supabase/Postgres

create extension if not exists "uuid-ossp";

create table if not exists customers (
  id uuid primary key default uuid_generate_v4(),
  customer_id text unique not null,
  first_name text not null,
  last_name text not null,
  email text unique not null,
  phone text,
  whatsapp text,
  guyana_address text,
  us_locker_number text,
  status text default 'active',
  created_at timestamptz default now()
);

create table if not exists packages (
  id uuid primary key default uuid_generate_v4(),
  package_id text unique not null,
  customer_id text references customers(customer_id),
  carrier text,
  tracking_number text unique,
  product_type text,
  weight_lbs numeric,
  declared_value numeric,
  status text default 'Received in Florida',
  invoice_required boolean default true,
  insurance boolean default false,
  notes text,
  created_at timestamptz default now()
);

create table if not exists shipments (
  id uuid primary key default uuid_generate_v4(),
  shipment_id text unique not null,
  method text check (method in ('air','ocean')),
  carrier text,
  flight_or_container text,
  departure_date date,
  arrival_date date,
  status text default 'scheduled',
  created_at timestamptz default now()
);

create table if not exists shipment_packages (
  shipment_id text references shipments(shipment_id),
  package_id text references packages(package_id),
  primary key (shipment_id, package_id)
);

create table if not exists quote_rates (
  id uuid primary key default uuid_generate_v4(),
  method text not null,
  product_type text not null,
  rate_per_lb numeric not null,
  multiplier numeric default 1,
  duty_rate numeric default 0,
  handling_fee numeric default 0,
  is_air_allowed boolean default true,
  is_ocean_allowed boolean default true,
  warning text,
  updated_at timestamptz default now()
);

create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  invoice_number text unique not null,
  customer_id text references customers(customer_id),
  package_id text references packages(package_id),
  amount numeric not null,
  currency text default 'USD',
  payment_method text,
  status text default 'unpaid',
  paid_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists deliveries (
  id uuid primary key default uuid_generate_v4(),
  delivery_id text unique not null,
  package_id text references packages(package_id),
  customer_id text references customers(customer_id),
  driver_name text,
  delivery_address text,
  status text default 'pending',
  signature_url text,
  proof_photo_url text,
  delivered_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  customer_id text references customers(customer_id),
  package_id text,
  channel text check (channel in ('email','sms','whatsapp','in_app')),
  template_key text,
  subject text,
  body text,
  status text default 'queued',
  sent_at timestamptz,
  created_at timestamptz default now()
);
