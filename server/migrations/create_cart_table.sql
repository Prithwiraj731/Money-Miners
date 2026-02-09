-- SQL Migration: Create cart table

-- Create cart table
CREATE TABLE IF NOT EXISTS cart (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    course_id TEXT NOT NULL,
    added_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- Add foreign key constraint (optional, if users table has id as primary key)
-- ALTER TABLE cart ADD CONSTRAINT fk_cart_user 
-- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_course_id ON cart(course_id);

-- Add comment
COMMENT ON TABLE cart IS 'Shopping cart for course purchases';
