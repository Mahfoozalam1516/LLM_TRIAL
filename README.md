# DigiRocket Technologies AI Assistant

A modern, professional AI chatbot interface for DigiRocket Technologies with streaming capabilities. Built with Next.js, Tailwind CSS, and shadcn/ui.

## Features

- Real-time streaming chat interface with DigiRocket's AI assistant
- Company information sidebar with DigiRocket's global presence and achievements
- Responsive design optimized for all device sizes
- Professional animations for improved user experience
- Session persistence for chat history
- Loading states and error handling
- Fully deployable on Vercel
- API integration with the custom Hugging Face endpoint

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/digirocket-ai-assistant.git
cd digirocket-ai-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

   Create a `.env.local` file at the root of your project with the following:
   ```env
   NEXT_PUBLIC_OPENAI_BASE_URL="https://t1ahx01o6cu6k9zr.us-east-1.aws.endpoints.huggingface.cloud/v1/"
   NEXT_PUBLIC_OPENAI_API_KEY="your_huggingface_token"
   ```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push your code to a GitHub repository

2. Visit [Vercel](https://vercel.com) and import your repository

3. Add environment variables:
   - `NEXT_PUBLIC_OPENAI_BASE_URL`
   - `NEXT_PUBLIC_OPENAI_API_KEY`

4. Deploy your application

## Project Structure

- `/app` - Next.js app directory with page components
- `/components` - React components for UI elements
- `/hooks` - Custom React hooks including chat state management
- `/lib` - Utility functions and API clients

## License

This project is licensed under the MIT License