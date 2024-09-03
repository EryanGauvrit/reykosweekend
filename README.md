# How to use fast configuration ?

## Technos

-   Next.js
-   Auth.js
-   Prisma
-   Tailwind and Shadcn
-   Lucid react
-   mysql

## Run app

### Set environement variable

To generate random secret

```bash
    openssl rand -base64 33
```

Look in the env file to set the variables that the application needs

### Git initialization

-   Clone this respository
-   Remove connexion

```bash
    rm -rf .git
```

-   New Git initialization

```bash
    git init
    git add .
    git commit -m "SETUP - Nextjs fast configuration"
```

### Database

### Commands

-   Install dependencies

```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
```

-   Run app

```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
```
