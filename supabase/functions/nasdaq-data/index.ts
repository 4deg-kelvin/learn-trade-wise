import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('POLYGON_API_KEY')
    if (!apiKey) {
      throw new Error('POLYGON_API_KEY not found')
    }

    // Fetch aggregated bars for NASDAQ (QQQ ETF as proxy)
    const response = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/QQQ/range/1/hour/2025-08-15/2025-08-16?adjusted=true&sort=asc&apikey=${apiKey}`
    )

    if (!response.ok) {
      throw new Error(`Polygon API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Transform data for the chart
    const chartData = (data.results || []).map((item: any, index: number) => ({
      t: `${new Date(item.t).getHours()}h`,
      p: item.c, // closing price
      timestamp: item.t
    }))

    return new Response(
      JSON.stringify({ data: chartData }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error fetching NASDAQ data:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})