'use client'

import { useState, useEffect } from 'react'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid'

interface BitcoinPriceData {
  usd: number
  inr: number
  usd_24h_change: number
}

export default function BitcoinPrice() {
  const [priceData, setPriceData] = useState<BitcoinPriceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr,usd&include_24hr_change=true'
        )
        if (!response.ok) {
          throw new Error('Failed to fetch Bitcoin price')
        }
        const data = await response.json()
        setPriceData(data.bitcoin)
        setLoading(false)
      } catch (err) {
        setError('Error fetching Bitcoin price')
        setLoading(false)
      }
    }

    fetchBitcoinPrice()
    const interval = setInterval(fetchBitcoinPrice, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!priceData) return null

  const priceChangeColor = priceData.usd_24h_change >= 0 ? 'text-green-500' : 'text-red-500'
  const PriceChangeIcon = priceData.usd_24h_change >= 0 ? ArrowUpIcon : ArrowDownIcon

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <img src="/bitcoin-logo.png" alt="Bitcoin" className="w-10 h-10 mr-4" />
        <h2 className="text-2xl font-bold">Bitcoin</h2>
        <span className="text-gray-500 ml-2">BTC</span>
      </div>
      <div className="flex items-baseline">
        <span className="text-4xl font-bold">${priceData.usd.toLocaleString()}</span>
        <span className={`ml-4 ${priceChangeColor} flex items-center`}>
          <PriceChangeIcon className="w-4 h-4 mr-1" />
          {Math.abs(priceData.usd_24h_change).toFixed(2)}%
        </span>
      </div>
      <div className="text-gray-500 mt-2">₹ {priceData.inr.toLocaleString()}</div>
    </div>
  )
}

