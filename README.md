# Sparrow

A stock search application built with Next.js and Shadcn UI.

## Features

- Simple stock symbol search interface
- Real-time stock price lookup using Alpha Vantage API
- Display current price, change, and percentage change
- Built with Next.js 16 and React
- Styled with Tailwind CSS v4 and Shadcn UI components

## Getting Started

### 1. Set up API Key

Get a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key) (no credit card required).

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add your API key to `.env.local`:

```
ALPHA_VANTAGE_API_KEY=your_api_key_here
```

### 2. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [Shadcn UI](https://ui.shadcn.com) - UI component library
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [TypeScript](https://www.typescriptlang.org) - Type safety
