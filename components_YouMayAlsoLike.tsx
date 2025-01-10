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
    data: {
      price: string
      price_change_percentage_24h: {
        usd: number
      }
      sparkline: string
    }
  }
}

export default function YouMayAlsoLike() {
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
        setTrendingCoins(data.coins)
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
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">You May Also Like</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4">
          {trendingCoins.map((coin) => (
            <div key={coin.item.id} className="flex-shrink-0 w-64 bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <Image src={coin.item.small} alt={coin.item.name} width={24} height={24} className="mr-2" />
                <span className="font-medium">{coin.item.symbol}</span>
                <span className={`ml-auto ${coin.item.data.price_change_percentage_24h.usd >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                </span>
              </div>
              <div className="font-bold">{coin.item.data.price}</div>
              <Image src={coin.item.data.sparkline} alt={`${coin.item.name} price graph`} width={200} height={60} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

