// scripts/fetch-steam.js
import fs from 'node:fs/promises'

const STEAM_APP_ID = '2126190'
const API_URL = `https://steamspy.com/api.php?request=appdetails&appid=${STEAM_APP_ID}`
const OUTPUT_PATH = './public/data/steamspy.json'

async function fetchSteamData() {
  try {
    console.log('🔄 Fetching SteamSpy data...')

    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const raw = await response.json()

    const data = {
      fetchedAt: Date.now(),
      name: raw.name,
      positive: raw.positive,
      negative: raw.negative,
      owners: raw.owners,
      price: raw.price,
      scoreRank: raw.score_rank
    }

    // 确保目录存在
    await fs.mkdir('./public/data', { recursive: true })

    // 写入文件
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(data, null, 2))

    console.log('✅ Steam 数据已保存到', OUTPUT_PATH)
    console.log('📊 数据摘要:')
    console.log(`   - 游戏名: ${data.name}`)
    console.log(`   - 好评: ${data.positive}`)
    console.log(`   - 差评: ${data.negative}`)
    console.log(`   - 好评率: ${((data.positive / (data.positive + data.negative)) * 100).toFixed(1)}%`)
    console.log(`   - 预估销量: ${data.owners}`)

  } catch (error) {
    console.error('❌ 拉取Steam数据失败:', error.message)
    process.exit(1)
  }
}

fetchSteamData()
