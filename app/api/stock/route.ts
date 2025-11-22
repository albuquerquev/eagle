import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json(
      { error: 'Stock symbol is required' },
      { status: 400 }
    );
  }

  try {
    // Using Alpha Vantage API (free tier: 500 requests/day)
    // Users can get a free API key at https://www.alphavantage.co/support/#api-key
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY || 'demo';

    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol.toUpperCase()}&apikey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }

    const data = await response.json();

    // Check if we got valid data
    if (data['Error Message']) {
      return NextResponse.json(
        { error: 'Invalid stock symbol' },
        { status: 404 }
      );
    }

    if (data['Note']) {
      return NextResponse.json(
        { error: 'API rate limit reached. Please try again later.' },
        { status: 429 }
      );
    }

    const quote = data['Global Quote'];

    if (!quote || !quote['05. price']) {
      return NextResponse.json(
        { error: 'Stock data not available' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: quote['10. change percent'],
      lastUpdated: quote['07. latest trading day']
    });

  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    );
  }
}
