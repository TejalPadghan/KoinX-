import BitcoinPrice from '@/components/BitcoinPrice'
import TradingViewChart from '@/components/TradingViewChart'
import TrendingCoins from '@/components/TrendingCoins'
import YouMayAlsoLike from '@/components/YouMayAlsoLike'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BitcoinPrice />
          <TradingViewChart />
        </div>
        <div>
          <TrendingCoins />
        </div>
      </div>
      <YouMayAlsoLike />
    </main>
  )
}

