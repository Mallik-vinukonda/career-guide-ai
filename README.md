# Career Guide AI - Student Career Guidance RAG Chatbot

A comprehensive AI-powered career guidance platform that helps students explore career options, understand educational requirements, and receive personalized recommendations based on their interests, skills, and goals.

## Features

- **AI-Powered Career Guidance**: Natural language conversations about career paths, education requirements, and job prospects
- **Personalized Recommendations**: Career suggestions based on user interests, skills, and preferences
- **Comprehensive Knowledge Base**: Information on diverse career fields, education pathways, and job market trends
- **User Profile Management**: Collection and storage of user preferences for personalized guidance
- **Modern UI/UX**: Clean, responsive interface built with React and Tailwind CSS
- **Dashboard**: Track career exploration progress and saved recommendations
- **Scholarship & Internship Information**: Access to relevant opportunities based on career interests

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **AI Integration**: Google's Gemini API
- **Vector Database**: Simulated RAG implementation (can be extended with Pinecone or similar)
- **State Management**: React Context API
- **Styling**: Tailwind CSS with responsive design
- **Icons**: React Icons
- **Animation**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Gemini API key (for production use)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd career-guidance-bot
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:

```
GEMINI_API_KEY=your_gemini_api_key
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Project Structure

```
career-guidance-bot/
├── src/
│   ├── app/
│   │   ├── page.tsx (Landing page)
│   │   ├── chat/page.tsx (Main chat interface)
│   │   ├── onboarding/page.tsx (User profile setup)
│   │   ├── dashboard/page.tsx (User progress tracking)
│   │   ├── api/chat/route.ts (Chat API endpoint)
│   │   └── layout.tsx (Main layout)
│   ├── contexts/
│   │   ├── UserProfileContext.tsx (User profile state management)
│   │   └── ChatContext.tsx (Chat state management)
│   └── lib/
│       └── utils/
│           └── vector-store.ts (Simulated vector database)
├── public/
│   └── (static assets)
└── package.json
```

## Key Components

### Vector Database

The application includes a simulated vector database implementation in `src/lib/utils/vector-store.ts`. In a production environment, this would be replaced with a proper vector database like Pinecone, Weaviate, or similar.

The current implementation includes:

- Sample career data with detailed information
- Sample education pathway data
- Sample scholarship information
- Simple search functions that mimic vector similarity search

### Chat Interface

The chat interface in `src/app/chat/page.tsx` provides a natural language interface for users to interact with the AI assistant. It supports:

- Multi-turn conversations
- Message history persistence
- Loading states
- Context-aware responses based on user profile

### User Onboarding

The onboarding flow in `src/app/onboarding/page.tsx` collects user information to provide personalized guidance:

- Personal information
- Interests and preferences
- Skills assessment
- Education background
- Career goals
- Resume/transcript upload

### Dashboard

The dashboard in `src/app/dashboard/page.tsx` provides:

- Career recommendations based on user profile
- Scholarship opportunities
- Internship listings
- Progress tracking

## API Integration

The application is designed to work with Google's Gemini API. The integration is implemented in `src/app/api/chat/route.ts`.

For demo purposes, the application includes fallback responses when no API key is provided.

## Extending the Project

### Adding More Career Data

Expand the career database in `src/lib/utils/vector-store.ts` by adding more entries to the `CAREERS` array.

### Implementing a Real Vector Database

Replace the simulated vector database with a real implementation using Pinecone, Weaviate, or similar:

1. Install the appropriate client library
2. Create vector embeddings for career data
3. Update the search functions to use the vector database

### Enhancing the AI Model

Improve the AI responses by:

1. Fine-tuning the Gemini model on career guidance data
2. Implementing more sophisticated prompt engineering
3. Adding more context from the user profile

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Next.js and React
- Styled with Tailwind CSS
- AI powered by Google's Gemini API
