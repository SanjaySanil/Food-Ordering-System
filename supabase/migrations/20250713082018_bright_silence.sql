/*
  # Create settings table for application configuration

  1. New Tables
    - `settings`
      - `key` (text, primary key) - Setting identifier
      - `value` (text) - Setting value
      - `updated_at` (timestamp) - Last update time

  2. Security
    - Enable RLS on `settings` table
    - Add policy for public access to settings

  3. Initial Data
    - Insert default 'orders_open' setting as 'true'
*/

CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public access to settings"
  ON settings
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default ordering status
INSERT INTO settings (key, value) 
VALUES ('orders_open', 'true') 
ON CONFLICT (key) DO NOTHING;