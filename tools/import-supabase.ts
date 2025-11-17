#!/usr/bin/env bun

/**
 * Import games to Supabase using Supabase JS Client
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

// Load environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Error: Missing Supabase credentials!')
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables')
  console.error('\nExample:')
  console.error('export SUPABASE_URL="https://your-project.supabase.co"')
  console.error('export SUPABASE_SERVICE_KEY="your-service-key"')
  process.exit(1)
}

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

console.log('🚀 Starting Supabase import...\n')

// Read merged games data
const dataPath = join(__dirname, 'merged_games.json')
const gamesData = JSON.parse(readFileSync(dataPath, 'utf8'))

console.log(`📊 Found ${gamesData.games.length} games to import\n`)

async function createTable() {
  console.log('📝 Creating games table...')

  const createTableSQL = `
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

    CREATE INDEX IF NOT EXISTS idx_games_rating ON games(rating DESC);
    CREATE INDEX IF NOT EXISTS idx_games_status ON games(status);
    CREATE INDEX IF NOT EXISTS idx_games_category ON games(category);
    CREATE INDEX IF NOT EXISTS idx_games_tags ON games USING GIN(tags);
    CREATE INDEX IF NOT EXISTS idx_games_is_embeddable ON games(is_embeddable);

    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ language 'plpgsql';

    DROP TRIGGER IF EXISTS update_games_updated_at ON games;
    CREATE TRIGGER update_games_updated_at BEFORE UPDATE ON games
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  `

  const { error } = await supabase.rpc('exec_sql', { sql: createTableSQL })

  if (error) {
    console.error('❌ Error creating table:', error.message)
    console.log('\n💡 Alternative: Run create_games_table.sql in Supabase SQL Editor')
    return false
  }

  console.log('✅ Table created successfully\n')
  return true
}

async function insertGames() {
  console.log('📥 Inserting games data...')

  const batchSize = 100
  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < gamesData.games.length; i += batchSize) {
    const batch = gamesData.games.slice(i, i + batchSize)

    const { data, error } = await supabase
      .from('games')
      .upsert(batch, { onConflict: 'id' })

    if (error) {
      console.error(`❌ Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error.message)
      errorCount += batch.length
    } else {
      successCount += batch.length
      console.log(`   ✓ Inserted batch ${Math.floor(i / batchSize) + 1} (${batch.length} games)`)
    }
  }

  console.log(`\n📊 Import Summary:`)
  console.log(`   ✅ Success: ${successCount} games`)
  if (errorCount > 0) {
    console.log(`   ❌ Failed: ${errorCount} games`)
  }

  return successCount
}

async function verifyImport() {
  console.log('\n🔍 Verifying import...')

  const { count, error } = await supabase
    .from('games')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('❌ Error verifying:', error.message)
    return
  }

  console.log(`   ✓ Total games in database: ${count}`)

  // Get sample data
  const { data: samples } = await supabase
    .from('games')
    .select('id, name, rating, status')
    .order('rating', { ascending: false })
    .limit(5)

  if (samples && samples.length > 0) {
    console.log('\n📋 Top 5 games by rating:')
    samples.forEach((game, i) => {
      console.log(`   ${i + 1}. ${game.name} - ${game.rating} ⭐ ${game.status || ''}`)
    })
  }
}

// Main execution
async function main() {
  try {
    // Try to create table (will skip if using RPC is not available)
    // await createTable()

    // Insert/Update games
    const inserted = await insertGames()

    if (inserted > 0) {
      await verifyImport()
    }

    console.log('\n✨ Import completed!')
  } catch (error) {
    console.error('\n❌ Fatal error:', error)
    process.exit(1)
  }
}

main()
