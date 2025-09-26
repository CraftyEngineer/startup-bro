# Startup Bro Idea Generator

A satirical web app that generates absurd, buzzword-filled startup ideas using AI. Built with Next.js, shadcn/ui, and Tailwind CSS.

## Features

- 🤖 **AI-Powered**: Uses Groq as primary AI with Gemini as fallback
- 🎲 **Random Buzzwords**: Generate random tech buzzwords or input your own
- 🎨 **Beautiful UI**: Modern design with Framer Motion animations
- 📱 **Responsive**: Works on desktop and mobile
- 🐦 **Social Sharing**: Share generated ideas on X (Twitter)
- ⚡ **Fast**: Built with Next.js App Router and optimized for performance

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI Services**: Groq (primary), Gemini (fallback)
- **Image Generation**: html-to-image

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd startup-bro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_GROQ_API_KEY`
   - `NEXT_PUBLIC_GEMINI_API_KEY`
4. Deploy!

## API Keys

- **Groq**: Get your API key from [console.groq.com](https://console.groq.com) ✅ **Working**
- **Gemini**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey) ⚠️ **Needs valid key**

### Current Status
- ✅ **Groq API**: Working with `llama-3.1-8b-instant` model
- ⚠️ **Gemini API**: Requires a valid API key (current key is invalid)
- 🔄 **Fallback**: If Groq fails, the app will attempt Gemini, but will show an error if Gemini key is invalid

## How It Works

1. Enter three buzzwords or click "Randomize" to get random ones
2. Click "Generate Idea" to create a satirical startup concept
3. The app tries Groq first, falls back to Gemini if needed
4. Share your hilarious startup idea on social media!

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for your own satirical startup ideas! 🚀