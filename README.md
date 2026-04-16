# Weather App

A weather application built with Next.js 16, React 19, and Tailwind CSS 4.

**Live demo:** https://weather-app-six-chi-91.vercel.app

---

## Features

- City search with autocomplete (debounced, geocoding-backed)
- Current conditions and 7-day forecast
- Save favourite cities (only persists to localStorage)
- Dark / light mode with no flash on load
- Manual weather refresh (server-action cache revalidation)
- Skeleton loading states and graceful error handling
- Fully accessible (ARIA attributes, keyboard navigation)

---

## Setup

**Prerequisites:** Node.js 20+, pnpm

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm run dev
```

Open http://localhost:3000.

```bash
# Run unit tests
pnpm run test

# Run Storybook (component docs + visual tests)
pnpm run storybook

# Production build
pnpm run build
pnpm run start
```

No API keys are required — the app uses the free [Open-Meteo](https://open-meteo.com/) API.

---

## Architecture

### Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Language | TypeScript 5 (strict) |
| Icons | lucide-react |
| State | React context, localStorage |
| Testing | Jest 30, Testing Library, Storybook 10 + Vitest, Playwright |
| Font | Raleway via `next/font` |

### Directory structure

```
src/
├── app/
│   ├── page.tsx                  # Home — search + saved cities
│   ├── weather/[city]/
│   │   ├── page.tsx              # Weather detail (server component)
│   │   ├── actions.ts            # Server action: cache revalidation
│   │   └── loading.tsx           # Suspense skeleton
│   ├── favourites/page.tsx       # Saved cities list
│   └── api/city-suggestions/     # Autocomplete API route
├── components/
│   ├── ui/                       # Design-system primitives (Button, Input, Card…)
│   └── WeatherResult/            # Feature components (BentoHeader, ForecastRow…)
├── lib/
│   ├── weather.ts                # API fetching + caching logic
│   ├── weatherCodes.ts           # WMO code → label/icon mappings
│   └── favourites.ts             # localStorage helpers
└── hooks/
    └── useFavourites.ts          # Hydration-safe favourites hook
```

### Data flow

```
CitySearch (client)
  → debounced fetch → GET /api/city-suggestions
  → user selects city
  → navigate to /weather/[city]?lat=X&lon=Y&tz=TZ&country=C

/weather/[city] (server component)
  → getWeatherByCoords()  (preferred — lat/lon in query params)
  → getWeatherForCity()   (fallback — geocode by name)
  → render WeatherBentoHeader + WeatherForecastRow
```

### Caching strategy

The app uses Next.js 15's `'use cache'` directive with differentiated TTLs per data type:

| Function | Stale-while-revalidate | Hard expiry | Cache tag |
|---|---|---|---|
| `geocodeCity()` | 1 hour | 1 day | `geocode:{city}` |
| `fetchForecast()` | 1 minute | 1 hour | `forecast:{lat},{lon}` |
| `searchCities()` | 1 hour | 1 day | `search:{query}` |

Forecast data revalidates aggressively in the background. Geocoding data is stable and cached for longer. Users can also trigger an immediate cache bust via the **Refresh** button, which calls a server action that invokes `revalidateTag()`.

---

## Key decisions and trade-offs

### Server Components for data fetching

All weather and geocoding fetches happen in Server Components (or the API route handler). This avoids shipping fetch logic to the client, reduces bundle size, and lets Next.js manage caching centrally. The trade-off is that the weather detail page requires a full server round-trip on first load — the skeleton loading UI mitigates the perceived latency.

### Coordinate-based navigation

After a user selects a city from the autocomplete, the app navigates to `/weather/[city]?lat=X&lon=Y&tz=TZ&country=C` rather than just the city name. This eliminates geocoding ambiguity (e.g. multiple cities named "Springfield") and avoids a redundant geocoding round-trip on the detail page. Direct URL access (without query params) falls back to name-based geocoding.

### Hydration-safe localStorage

Both the favourites list and theme preference are stored in `localStorage`. Naively reading `localStorage` on the server causes hydration mismatches. Two different strategies are used:

- **Theme:** An inline `<script>` in `<head>` applies the correct class before React hydrates, preventing a flash of unstyled content. The `ThemeProvider` then re-syncs state client-side. This felt quite hacky in practice and I'd have liked to have explored cleaners options.

- **Favourites:** The `useFavourites` hook returns an empty array on first render (matching the server), then syncs with `localStorage` in a `useEffect` after hydration. Again the useEffect to immedately set the state felt like an anti-pattern to me, but it was a toss up between this and the hydration warning, surpressing that felt worse in this instance. 

### Tailwind CSS 4 design tokens

Semantic CSS custom properties (`--color-background`, `--color-surface`, `--color-accent-*`, etc.) are defined in `globals.css` using `@theme inline`. Tailwind 4 exposes these as utility classes automatically. This gives a single source of truth for theming without a separate design-token pipeline.

### Testing split: Jest + Storybook/Vitest

Unit logic and component behaviour are tested with Jest + Testing Library. Visual/interactive component states are documented and tested via Storybook stories, which Vitest can run in a real browser via Playwright. This split avoids over-mocking DOM APIs in Jest while still having fast unit tests for business logic. I'd have liked to have added more comprehensive tests, but time constraints meant I had to prioritise some simpler component based tests as a talking point. 

---

## API reference

### `GET /api/city-suggestions?q={query}`

Returns up to 5 city matches from the Open-Meteo geocoding API.

- `q` must be at least 2 characters
- Responses are cached for 1 hour (stale-while-revalidate)

**Response:**
```json
[
  {
    "id": 5128581,
    "name": "New York",
    "country": "United States",
    "countryCode": "US",
    "region": "New York",
    "latitude": 40.71427,
    "longitude": -74.00597,
    "timezone": "America/New_York"
  }
]
```

### Weather detail page

`/weather/[city]?lat={lat}&lon={lon}&tz={timezone}&country={country}`

All query params are optional. If omitted, the city name is geocoded server-side. Providing `lat`/`lon` is strongly preferred for accuracy.

---

## Trade-offs summary

| Area | Decision | Cost |
|---|---|---|
| Data fetching | Server Components only | Full server round-trip on first load; no optimistic updates |
| Favourites persistence | localStorage only | Data is device-local; lost on clear, not synced across browsers |
| Theme hydration | Inline `<script>` in `<head>` | Feels hacky; blocking script before React loads |
| Favourites hydration | `useEffect` sync after mount | Anti-pattern; causes a render cycle after hydration |
| Caching | Next.js `'use cache'` (experimental) | API is still evolving; behaviour may change across Next.js versions |

---

## Potential improvements

Given more time, these are the areas I'd address first:

- **More thorough tests** — add integration tests covering the search-to-detail flow, server action behaviour, and error states; configure Playwright for E2E coverage
- **User accounts + server-side favourites** — move favourites out of localStorage into a database so they persist across devices and browsers; localStorage is a reasonable MVP shortcut but not a real solution
- **Cleaner theme handling** — investigate cookie-based theme persistence so the server can render the correct theme on the first response, removing the need for the inline script hack entirely
- **Hourly forecast** — the Open-Meteo API returns hourly data; surfacing a 24-hour breakdown alongside the 7-day view would add meaningful value with minimal extra fetching
- **Geolocation** — detect the user's current location on first visit and show local weather without requiring a search
- **Offline support** — add a service worker to cache the last-viewed forecast so the app is usable without a network connection
