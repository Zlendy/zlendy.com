# zlendy.com

This is the SvelteKit codebase that powers [zlendy.com](https://zlendy.com/).

## Getting started

Install dependencies with `npm ci`.

Copy `example.env` to `.env` and modify it if necessary

## Developing

Once you've installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deploying

This project is meant to be deployed to GitHub Pages.

Before it can be deployed, you must go to `https://github.com/<USERNAME>/<REPOSITORY>/settings/environments` and copy every environment variable in `.env` to the environment `github-pages`.

## License

There are [different licenses](LICENSE.md) applied to specific parts of the project:
