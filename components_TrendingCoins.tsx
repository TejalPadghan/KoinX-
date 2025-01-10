'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface TrendingCoin {
  item: {
    id: string
    coin_id: number
    name: string
    symbol: string
    market_cap_rank: number
    thumb: string
    small: string
    large: string
    slug: string
    price_btc: number
    score: number
  }
}

export default function TrendingCoins() {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/search/trending')
        if (!response.ok) {
          throw new Error('Failed to fetch trending coins')
        }
        const data = await response.json()
        setTrendingCoins(data.coins.slice(0, 3))
        setLoading(false)
      } catch (err) {
        setError('Error fetching trending coins')
        setLoading(false)
      }
    }

    fetchTrendingCoins()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Trending Coins (24h)</h2>
      {trendingCoins.map((coin) => (
        <div key={coin.item.id} className="flex items-center mb-4">
          <Image src={coin.item.small} alt={coin.item.name} width={24} height={24} className="mr-4" />
          <span className="font-medium">{coin.item.name}</span>
          <span className="ml-auto text-green-500">
            {coin.item.price_btc.toFixed(8)} BTC
          </span>
        </div>
      ))}
    </div>
  )
}

