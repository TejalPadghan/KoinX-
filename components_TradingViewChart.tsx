'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    TradingView: any
  }
}

export default function TradingViewChart() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/tv.js'
      script.async = true
      script.onload = () => {
        if (window.TradingView) {
          new window.TradingView.widget({
            autosize: true,
            symbol: 'BITSTAMP:BTCUSD',
            interval: 'D',
            timezone: 'Etc/UTC',
            theme: 'light',
            style: '1',
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: 'tradingview_chart'
          })
        }
      }
      containerRef.current.appendChild(script)
    }
  }, [])

  return <div id="tradingview_chart" ref={containerRef} className="h-[400px]" />
}

