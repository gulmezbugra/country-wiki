# 🌍 CountryWiki

A production-quality React application that lets you explore detailed information about every country in the world — with infinite scrolling, search & filtering, and a persistent favorites system.

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)
![Zustand](https://img.shields.io/badge/Zustand-4.5-orange?style=flat-square)
![Axios](https://img.shields.io/badge/Axios-1.6-5A29E4?style=flat-square)
![React Router](https://img.shields.io/badge/React_Router-6.22-CA4245?style=flat-square&logo=reactrouter)

---

## ✨ Features

- **Infinite Scrolling Feed** — Countries load progressively (20 at a time) as you scroll, like a Twitter/Instagram feed
- **Search & Filter** — Search by name, capital, or region; filter by continent
- **Country Detail Page** — Full info: population, area, languages, currencies, borders, coat of arms, Google Maps link
- **Favorites System** — Heart button on every card; favorites persist across page refreshes via localStorage
- **Skeleton Loaders** — Smooth loading experience with shimmer placeholders
- **Responsive Design** — Works on mobile, tablet, and desktop

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/country-wiki.git
cd country-wiki

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will open at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

---

## 🗂️ Project Structure

```
src/
├── api/
│   └── countriesApi.js       # Axios client + API calls
├── store/
│   └── index.js              # Zustand stores (countries + favorites)
├── hooks/
│   ├── useCountries.js       # Fetch-once hook with session caching
│   └── useInfiniteScroll.js  # IntersectionObserver-based pagination
├── utils/
│   └── countryUtils.js       # Pure formatting helpers
├── components/
│   ├── CountryCard.jsx        # Memoized card with favorite button
│   ├── Navbar.jsx             # Sticky nav with live favorite count
│   ├── SearchBar.jsx          # Search input + region filter buttons
│   └── SkeletonCard.jsx       # Shimmer loading placeholders
├── pages/
│   ├── HomePage.jsx           # Infinite scroll feed with search
│   ├── DetailPage.jsx         # Full country detail view
│   └── FavoritesPage.jsx      # Saved countries list
├── App.jsx                    # Router setup
├── index.js                   # React entry point
└── index.css                  # Global styles & design tokens
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI — functional components + hooks |
| **React Router v6** | Client-side routing |
| **Zustand** | Global state management |
| **Axios** | HTTP requests to REST Countries API |
| **localStorage** | Favorites persistence |
| **IntersectionObserver** | Infinite scroll |

---

## ⚙️ Architecture Decisions

### Single API Call
Data is fetched **once per session** and stored in Zustand. A `fetched` flag prevents redundant calls when navigating between pages.

### Two Separate Stores
- `useCountriesStore` — holds the full countries list (session only)
- `useFavoritesStore` — holds favorite `cca3` codes, persisted to localStorage via Zustand's `persist` middleware

### Client-Side Pagination
Since the REST Countries API doesn't support server-side pagination, `useInfiniteScroll` slices the filtered array into chunks of 20 and exposes a sentinel `ref`. When the sentinel enters the viewport, the next chunk renders.

### Performance Optimizations
- `React.memo` on `CountryCard` and `SearchBar` — prevents re-renders on unrelated state changes
- `useMemo` on filtered/visible item lists — recalculates only when dependencies change
- `useCallback` on all event handlers inside cards
- Zustand selectors — components subscribe only to the slice of state they need
- `loading="lazy"` on all flag `<img>` elements

---

## 🌐 Data Source

All country data is fetched from the free [REST Countries API](https://restcountries.com/):

```
GET https://restcountries.com/v3.1/all
```

---

## 📸 Pages

| Page | Route | Description |
|---|---|---|
| Explore | `/` | Infinite scroll feed of all countries |
| Detail | `/country/:cca3` | Full country information |
| Favorites | `/favorites` | All saved/favorited countries |

---

