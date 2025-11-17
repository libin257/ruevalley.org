#!/usr/bin/env node

/**
 * Script to import game data to Supabase
 * Reads all JSON files from scrapy/data and imports to Supabase
 */

const fs = require('fs');
const path = require('path');

// Read all game data files
const dataDir = path.join(__dirname, 'scrapy', 'data');
const jsonFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== '.gitkeep');

console.log(`Found ${jsonFiles.length} JSON files to process`);

// Collect all games
const allGames = [];
const gameIds = new Set();

for (const file of jsonFiles) {
  const filePath = path.join(dataDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);

  let games = [];

  if (Array.isArray(data)) {
    games = data;
  } else if (data.games && Array.isArray(data.games)) {
    games = data.games;
  } else if (data.selected_games && Array.isArray(data.selected_games)) {
    games = data.selected_games;
  }

  console.log(`${file}: ${games.length} games`);

  // Deduplicate by game ID
  for (const game of games) {
    if (!gameIds.has(game.id)) {
      gameIds.add(game.id);
      allGames.push({
        ...game,
        source_file: file
      });
    }
  }
}

console.log(`\nTotal unique games: ${allGames.length}`);

// Save merged data
const outputPath = path.join(__dirname, 'merged_games.json');
fs.writeFileSync(outputPath, JSON.stringify({
  total_games: allGames.length,
  merged_at: new Date().toISOString(),
  games: allGames
}, null, 2));

console.log(`Merged data saved to: ${outputPath}`);

// Generate SQL for Supabase table creation
const sqlPath = path.join(__dirname, 'create_games_table.sql');
const createTableSQL = `-- Create games table in Supabase
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
`;

fs.writeFileSync(sqlPath, createTableSQL);
console.log(`\nSQL schema saved to: ${sqlPath}`);

// Generate insert SQL
const insertSqlPath = path.join(__dirname, 'insert_games_data.sql');
let insertSQL = '-- Insert game data\n';
insertSQL += '-- Run this after creating the table\n\n';

for (const game of allGames) {
  const values = {
    id: game.id,
    name: game.name,
    url: game.url || null,
    thumbnail: game.thumbnail || null,
    rating: game.rating || null,
    status: game.status || null,
    iframe_src: game.iframe_src || null,
    iframe_html: game.iframe_html || null,
    is_embeddable: game.is_embeddable || false,
    description: game.description || null,
    features: JSON.stringify(game.features || []),
    controls: game.controls || null,
    tags: JSON.stringify(game.tags || []),
    category: game.category || null,
    play_count: game.play_count || 0,
    reviews: JSON.stringify(game.reviews || []),
    review_count: game.review_count || 0,
    average_rating: game.average_rating || null,
    source_file: game.source_file
  };

  const escapeSql = (val) => {
    if (val === null) return 'NULL';
    if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
    if (typeof val === 'number') return val;
    return `'${String(val).replace(/'/g, "''")}'`;
  };

  insertSQL += `INSERT INTO games (id, name, url, thumbnail, rating, status, iframe_src, iframe_html, is_embeddable, description, features, controls, tags, category, play_count, reviews, review_count, average_rating, source_file) VALUES (\n`;
  insertSQL += `  ${escapeSql(values.id)},\n`;
  insertSQL += `  ${escapeSql(values.name)},\n`;
  insertSQL += `  ${escapeSql(values.url)},\n`;
  insertSQL += `  ${escapeSql(values.thumbnail)},\n`;
  insertSQL += `  ${escapeSql(values.rating)},\n`;
  insertSQL += `  ${escapeSql(values.status)},\n`;
  insertSQL += `  ${escapeSql(values.iframe_src)},\n`;
  insertSQL += `  ${escapeSql(values.iframe_html)},\n`;
  insertSQL += `  ${escapeSql(values.is_embeddable)},\n`;
  insertSQL += `  ${escapeSql(values.description)},\n`;
  insertSQL += `  ${escapeSql(values.features)}::jsonb,\n`;
  insertSQL += `  ${escapeSql(values.controls)},\n`;
  insertSQL += `  ${escapeSql(values.tags)}::jsonb,\n`;
  insertSQL += `  ${escapeSql(values.category)},\n`;
  insertSQL += `  ${escapeSql(values.play_count)},\n`;
  insertSQL += `  ${escapeSql(values.reviews)}::jsonb,\n`;
  insertSQL += `  ${escapeSql(values.review_count)},\n`;
  insertSQL += `  ${escapeSql(values.average_rating)},\n`;
  insertSQL += `  ${escapeSql(values.source_file)}\n`;
  insertSQL += `);\n\n`;
}

fs.writeFileSync(insertSqlPath, insertSQL);
console.log(`Insert SQL saved to: ${insertSqlPath}`);

console.log(`\n✅ Done! Next steps:`);
console.log(`1. Copy the SQL from create_games_table.sql`);
console.log(`2. Run it in Supabase SQL Editor to create the table`);
console.log(`3. Copy the SQL from insert_games_data.sql`);
console.log(`4. Run it to insert all game data`);
console.log(`\nOr use the Supabase CLI or API to import merged_games.json directly`);
