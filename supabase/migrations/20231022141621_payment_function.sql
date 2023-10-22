CREATE OR REPLACE FUNCTION deduct_balance() RETURNS TRIGGER AS $$
BEGIN 
    UPDATE Invoices
    SET status = 'Paid'
    WHERE Invoices.id = NEW.invoice_id;

    UPDATE Tenants
    SET balance = balance - NEW.amount_paid
    WHERE Tenants.id = NEW.tenant_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER deduct_balance_trigger BEFORE INSERT ON Payments FOR EACH ROW 
EXECUTE FUNCTION deduct_balance();
