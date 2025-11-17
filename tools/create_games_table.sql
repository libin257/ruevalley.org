-- Create games table in Supabase
CREATE TABLE IF NOT EXISTS games (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT,
  thumbnail TEXT,
  rating NUMERIC,
  status TEXT,
  iframe_src TEXT,
  iframe_html TEXT,
  is_embeddable BOOLEAN DEFAULT false,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  controls TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  category TEXT,
  play_count INTEGER DEFAULT 0,
  reviews JSONB DEFAULT '[]'::jsonb,
  review_count INTEGER DEFAULT 0,
  average_rating NUMERIC,
  source_file TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_games_rating ON games(rating DESC);
CREATE INDEX IF NOT EXISTS idx_games_status ON games(status);
CREATE INDEX IF NOT EXISTS idx_games_category ON games(category);
CREATE INDEX IF NOT EXISTS idx_games_tags ON games USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_games_is_embeddable ON games(is_embeddable);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_games_updated_at BEFORE UPDATE ON games
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (optional)
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON games
  FOR SELECT USING (true);

-- Grant permissions (adjust as needed)
GRANT SELECT ON games TO anon, authenticated;
