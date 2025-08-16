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
      throw new Error('POLYGON_API_KEY not configured')
    }

    const url = `https://api.polygon.io/v2/reference/news?limit=10&apikey=${apiKey}`
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Polygon API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Transform Polygon.io format to our expected format
    const transformedNews = data.results?.map((item: any) => ({
      id: item.id,
      title: item.title,
      source: item.publisher?.name || 'Unknown',
      link: item.article_url,
      imgURL: item.image_url,
      description: item.description,
      publishedAt: item.published_utc,
    })) || []

    return new Response(
      JSON.stringify({ news: transformedNews }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error fetching Polygon news:', error)
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