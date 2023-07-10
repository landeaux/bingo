# Bingo — GPT-Driven Band Name Generator

## About

Bingo is a band name generator app powered by OpenAI's GPT models. The user
provides a desired genre and three novel band names will be provided that fit
in that genre.

The application was built with [Nuxt 3]. Look at the [Nuxt 3
documentation](https://nuxt.com/docs/getting-started/introduction) to learn
more.

### What's with the name?

The name "Bingo" is a "backronym" formed from the words, "Band Name Generator".

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

Also, make sure to configure your environment.

1. Copy the example env file:

   ```bash
   cp .env.example .env
   ```

2. Update the `OPENAI_API_KEY` variable with your OpenAI API Key.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

## Deployment

Check out the [deployment
documentation](https://nuxt.com/docs/getting-started/deployment) for more
information.
