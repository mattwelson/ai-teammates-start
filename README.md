# TanStack Start + shadcn/ui

This is a template for a new TanStack Start project with React, TypeScript, and shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## Authentication

Authentication uses Clerk. Copy `.env.example` to `.env`, then replace the
publishable and secret keys with values from your Clerk Dashboard. The
`/sign-in` and `/sign-up` routes host Clerk's prebuilt authentication flows;
`/dashboard` is protected on the server.

Environment variables are validated with `@t3-oss/env-core`: the Clerk
publishable key is client-visible, while the secret key and auth route URLs are
validated on the server only.

For Render, provide `VITE_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` when
creating the Blueprint or in the service's environment settings.

## Deploying to Render

The repository includes a `render.yaml` Blueprint for a Node web service. Push
the repository to a Git provider connected to Render, then create a new
Blueprint in Render and select this repository. Render installs dependencies,
builds the Nitro server, and starts it with `pnpm start`.
