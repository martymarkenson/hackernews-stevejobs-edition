# Hacker News Clone

A modern Hacker News clone built with Next.js, TypeScript, and Tailwind CSS, using the official Hacker News API.

## Features

- Browse top, new, best, ask, show, and job stories
- View individual stories with comments
- View user profiles
- Responsive design
- Server-side rendering for better performance and SEO

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Axios](https://axios-http.com/) - HTTP client
- [Hacker News API](https://github.com/HackerNews/API) - Official Hacker News API

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/hacker-news-clone.git
cd hacker-news-clone
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   ├── services/            # API services
│   └── utils/               # Utility functions
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Project dependencies and scripts
```

## API Reference

This project uses the official [Hacker News API](https://github.com/HackerNews/API) to fetch data.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Y Combinator](https://www.ycombinator.com/) for creating Hacker News
- [Firebase](https://firebase.google.com/) for hosting the Hacker News API
