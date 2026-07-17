# Professional Developer Portfolio

![Preview](public/assets/profile.jpg)

A responsive personal portfolio for an AI and data science developer, built
with HTML, CSS, and JavaScript.

## Project structure

- `public/` contains every browser-facing website asset.
- `wrangler.jsonc` configures Cloudflare Workers Static Assets.
- `package.json` pins Wrangler and provides local deployment checks.

## Customization

1. Replace `public/assets/profile.jpg` with your professional photo.
2. Update personal information and links in `public/index.html`.
3. Customize colors and layout in `public/styles.css`.

## Deployment

Cloudflare Workers Builds deploys the `public/` directory whenever a commit is
pushed to the connected `main` branch.

Run `pnpm deploy:dry-run` to validate the deployment package locally without
publishing it.

## License

MIT License
