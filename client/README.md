# Memory Lane: School Days

A web application that helps users preserve and organize their school memories through stories, photos, and storyboards.

## Project Structure

This project is organized as a monorepo with separate frontend and backend directories:

```
memory-lane/
├── client/ (Next.js)
└── server/ (Nest.js)
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Setting Up the Frontend (Demo Mode)

The frontend includes a mock data implementation that allows you to test the application without setting up the backend. To run in demo mode:

1. Navigate to the frontend directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3001](http://localhost:3001) in your browser.

6. Use the demo credentials to log in:
   - Email: demo@example.com
   - Password: password

### Setting Up the Backend (When Ready)

When the backend is ready, you'll need to:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=3001
   JWT_SECRET=your_jwt_secret
   DATABASE_URL=your_database_connection_string
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Switch the frontend to use the real backend by setting `USE_MOCK = false` in each service file.

## Features

- **User Authentication**: Register, login, and secure routes
- **Story Management**: Create, edit, and view your school memories
- **Photo Management**: Upload and organize photos related to your stories
- **Storyboard Creation**: Combine stories and photos into visual storyboards
- **Dashboard**: Track your project progress and recent activities

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- React Context API
- Axios

### Backend
- Node.js
- Express
- JWT Authentication
- TypeScript
- RESTful API design

## Folder Structure

### Frontend

```
frontend/
├── public/
├── src/
│   ├── app/                  # Next.js App Router pages
│   ├── components/           # Reusable components
│   │   ├── common/           # UI components like Button, Card, etc.
│   │   ├── dashboard/        # Dashboard-specific components
│   │   ├── layout/           # Layout components
│   │   ├── story/            # Story-related components
│   │   ├── storyboard/       # Storyboard-related components
│   │   └── upload/           # Upload-related components
│   ├── contexts/             # React Context for state management
│   ├── services/             # API service functions
│   └── types/                # TypeScript type definitions
```

### Backend

```
backend/
├── src/
│   ├── ai/                   # AI-related services
│   ├── auth/                 # Authentication
│   ├── customer/             # User profile and activities
│   ├── media/                # Media files management
│   ├── models/               # Data models
│   ├── story/                # Story management
│   ├── storyboard/           # Storyboard management
│   └── app.ts                # Main application entry
```

## Mock Data Implementation

The frontend includes a comprehensive mock data implementation that simulates API calls:

- All service functions have a `USE_MOCK` flag to toggle between mock and real API calls
- Mock data is stored in `src/utils/mockData.ts`
- API delays are simulated for a realistic experience
- Demo credentials are provided for testing

To switch from mock data to real API:
1. Set `USE_MOCK = false` in each service file
2. Ensure your backend server is running

## Deployment

### Frontend

The Next.js frontend can be deployed to Vercel with minimal configuration:

1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

### Backend

The backend can be deployed to any Node.js hosting service:

1. Set up a database (PostgreSQL recommended)
2. Configure environment variables
3. Deploy to your preferred hosting service (Heroku, Digital Ocean, AWS, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License.
