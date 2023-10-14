-- Create the Rooms table
CREATE TABLE Rooms (
    room_id SERIAL PRIMARY KEY,
    room_number VARCHAR(10) NOT NULL,
    rent DECIMAL(10, 2) NOT NULL
);
-- Create the Tenants table
CREATE TABLE Tenants (
    tenant_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10),
    email VARCHAR(100),
    phone_number VARCHAR(15),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(15),
    occupation VARCHAR(100),
    move_in_date DATE,
    move_out_date DATE,
    lease_term_months INT,
    lease_start_date DATE,
    lease_end_date DATE,
    room_id INT REFERENCES Rooms(room_id)
);
-- Create the Payments table
CREATE TABLE Payments (
    payment_id SERIAL PRIMARY KEY,
    tenant_id INT REFERENCES Tenants(tenant_id),
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL
);
create table public.admin (
    id uuid not null references auth.users on delete cascade,
    first_name text,
    last_name text,
    primary key (id)
);
alter table public.admin enable row level security;
-- inserts a row into public.profiles
create function public.handle_new_user() returns trigger language plpgsql security definer
set search_path = public as $$ begin
insert into public.admin (id)
values (new.id);
return new;
end;
$$;
-- trigger the function every time a user is created
create trigger on_auth_user_created
after
insert on auth.users for each row execute procedure public.handle_new_user();