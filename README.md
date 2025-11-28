# Flex Living Reviews Dashboard

A Next.js dashboard for managing property reviews with approval functionality.

## Project Structure

```
src/
├── app/
│   ├── api/reviews/hostaway/route.ts    # API route for fetching reviews
│   ├── dashboard/page.tsx               # Dashboard page for managing reviews
│   ├── property/[id]/page.tsx           # Public property page showing approved reviews
│   └── page.tsx                         # Home page (redirects to dashboard)
├── data/
│   └── mockReviews.json                 # Mock data for reviews
├── lib/
│   ├── normalize/normalizeHostaway.ts   # Normalization function for review data
│   └── types/Review.ts                  # TypeScript interface for Review
```

## Features

1. **Dashboard Page** (`/dashboard`): 
   - Displays all reviews grouped by property
   - Allows managers to approve/reject reviews
   - Simple filtering by property

2. **Property Page** (`/property/[id]`):
   - Displays only approved reviews for a specific property
   - Public-facing page for guests to view reviews

3. **API Route** (`/api/reviews/hostaway`):
   - Normalizes mock data into a consistent format
   - Adds approval status to each review

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

1. The dashboard fetches review data from the API route
2. Reviews are displayed grouped by property
3. Managers can toggle the approval status of each review
4. The property page only shows reviews that have been approved
5. All data is currently sourced from mock JSON data

## Data Flow

```
Mock Data → API Route → Normalization → Dashboard/Property Pages
```