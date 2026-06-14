# MovieHub

A modern movie discovery application built with TanStack Start, React, and The Movie Database (TMDB) API. Browse popular movies, search with advanced filters, and manage your favorite films.

## Features

- **Movie Discovery**: Browse movies by different categories (Now Playing, Popular, Top Rated, Upcoming)
- **Advanced Search**: Search movies with filters for genre, year, rating, and sorting options
- **Movie Details**: View comprehensive information including cast, crew, and recommendations
- **Favorites Management**: Save and manage your favorite movies locally
- **Responsive Design**: Modern UI built with Radix UI components and Tailwind CSS
- **Server-Side Rendering**: Powered by TanStack Start for optimal performance
- **State Management**: Uses Zustand for efficient client-side state management
- **Type Safety**: Full TypeScript implementation

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) with React 19
- **Routing**: TanStack Router with file-based routing
- **Styling**: Tailwind CSS v4 with Radix UI components
- **Data Fetching**: TanStack Query (React Query) with Axios
- **State Management**: Zustand with persistence
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite
- **Deployment**: Nitro with Cloudflare target

## Project Structure

```
src/
├── api/                    # API integration layer
│   ├── axios.ts           # Axios instance configuration
│   └── movie.api.ts       # TMDB API endpoints
├── components/            # React components
│   ├── layout/           # Layout components (Header, Footer, etc.)
│   ├── movie/            # Movie-specific components
│   └── ui/               # Reusable UI components (Radix UI)
├── hooks/                # Custom React hooks
│   └── queries/          # TanStack Query hooks
├── lib/                  # Utility functions and configurations
│   ├── api/             # API helpers
│   ├── config.server.ts # Server configuration
│   ├── error-capture.ts # Error handling
│   └── utils.ts         # General utilities
├── routes/              # File-based routing
│   ├── __root.tsx       # Root layout
│   ├── index.tsx        # Home page (Now Playing)
│   ├── popular.tsx      # Popular movies
│   ├── top-rated.tsx    # Top rated movies
│   ├── upcoming.tsx     # Upcoming movies
│   ├── search.tsx       # Search with filters
│   ├── favorites.tsx    # Saved favorites
│   └── movie.$id.tsx    # Movie details page
├── store/               # Zustand stores
│   ├── favorites.store.ts # Favorites management
│   └── filters.store.ts   # Search filters state
├── types/               # TypeScript type definitions
├── router.tsx           # Router configuration
├── server.ts            # Server entry point
└── styles.css           # Global styles

```

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- TMDB API Key (get it from [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/benion28/benion-moviehub.git
cd benion-moviehub
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:

Copy all contents from `.env.example` to a new file named `.env`:

```bash
# On Windows (CMD)
copy .env.example .env

# On Windows (PowerShell)
Copy-Item .env.example .env

# On macOS/Linux
cp .env.example .env
```

4. Edit the `.env` file and add your TMDB API key:
```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p/w500
```

### Development

Start the development server:

```bash
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:

```bash
npm run build
# or
bun run build
```

Preview the production build:

```bash
npm run preview
# or
bun run preview
```

### Code Quality

Lint the code:
```bash
npm run lint
```

Format the code:
```bash
npm run format
```

## API Integration

The application uses The Movie Database (TMDB) API for fetching movie data. Key endpoints include:

- `/movie/now_playing` - Currently playing movies
- `/movie/popular` - Popular movies
- `/movie/top_rated` - Top rated movies
- `/movie/upcoming` - Upcoming movies
- `/movie/{id}` - Movie details with credits
- `/search/movie` - Search movies
- `/discover/movie` - Discover with filters
- `/genre/movie/list` - Movie genres

## State Management

- **Favorites**: Persisted to localStorage using Zustand persist middleware
- **Filters**: In-memory state for search filters
- **Server State**: Managed by TanStack Query for caching and synchronization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [TanStack](https://tanstack.com/) for the excellent React tooling
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
