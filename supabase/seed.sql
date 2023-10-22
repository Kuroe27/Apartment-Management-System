-- Insert data into the Apartment table
INSERT INTO Apartment (apartment_name, apartment_description) VALUES ('Apartment 1', 'A cozy one-bedroom apartment');

-- Insert data into the Rooms table, associating with Apartment 1
INSERT INTO Rooms (apartment_id, rent) VALUES (1, 1000.00);

-- Insert data into the Tenants table, associating with Room 1
INSERT INTO Tenants (first_name, last_name, email, phone_number, move_in_date, balance, room_id, monthly_rate)
VALUES ('John', 'Doe', 'john.doe@email.com', '555-123-4567', '2023-10-22', 0.00, 1, 1000.00);

-- Insert data into the Invoices table, associating with Tenant 1
INSERT INTO Invoices (tenant_id, due_date, total_amount, status)
VALUES (1, '2023-11-22', 1000.00, 'Unpaid');

-- -- Insert data into the Payments table, associating with Tenant 1 and Invoice 1
-- INSERT INTO Payments (tenant_id, invoice_id, amount_paid, payment_date)
-- VALUES (1, 1, 0.00, '2023-10-22');
