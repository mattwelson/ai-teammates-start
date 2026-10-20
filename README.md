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

## Deploying to Render

The repository includes a `render.yaml` Blueprint for a Node web service. Push
the repository to a Git provider connected to Render, then create a new
Blueprint in Render and select this repository. Render installs dependencies,
builds the Nitro server, and starts it with `pnpm start`.
