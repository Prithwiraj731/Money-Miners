-- SQL Migration: Add phone column to users table

-- Add phone column to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS phone VARCHAR(20);

-- Optional: Add index for phone lookup
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);

-- Optional: Add comment
COMMENT ON COLUMN users.phone IS 'User phone number for contact';
