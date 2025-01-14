# Introduction
This is the frontend of the portfolio, built using Next.js 15 with the app router.

## Getting Started

To install dependencies and run the development server, use the following commands:

```bash
npm install
npm run dev
```

## Dependencies

### Redis
Install Redis using the official documentation. For a local machine, Redis runs on port 6379 by default. Add `redis://localhost:6379` to your `.env.local` file.

### PostHog
- **API Key**: Used for analytics.

Before running this project, ensure the CMS and Andy servers are running.

## Configuration

Create a `.env.local` file based on the `.env.example` file and populate it with the relevant data.

### .env.local File Explained

```plaintext
NEXT_PUBLIC_STRAPI_URL=strapi_url          # Strapi server URL; for local it is https://localhost:1337
NEXT_API_TOKEN=strapi_token                # API key from Strapi admin panel; provide read access to all fields and write access to contact
NEXT_PUBLIC_WEBSITE_URL=website_url        # URL of the frontend; for local it is http://localhost:3000
NEXT_PUBLIC_POSTHOG_KEY=posthog_key        # Obtained from PostHog
NEXT_PUBLIC_POSTHOG_HOST=posthog_host      # Obtained from PostHog
NEXT_REDIS_URL=redis_url                   # For example redis://localhost:6379
NEXT_PUBLIC_ANDY_API_URL=andy_api_url      # URL for Andy server, http://localhost:8080/ for local
NEXT_PUBLIC_INTERNAL_API_TOKEN=internal_api_token # Used to verify if the API request to Next server is from Next.js itself
```

**Note:** All URLs except the Andy API URL must not have a trailing slash.

## Coding Guidelines

- All functions, except for React components or hooks, should be written as arrow functions.