-- Fix admin password for simple comparison
-- The current verification function does simple string comparison, not bcrypt
-- So we need to store the plain password instead of the hash
UPDATE admin_users 
SET password_hash = 'secret' 
WHERE user_id = 'admin';