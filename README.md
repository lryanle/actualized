## Project Summary

- [src](src/): Main application codebase
- [src/app](src/app/): Application-specific code and routing
- [src/app/api](src/app/api/): API services and endpoints
- [src/app/auth](src/app/auth/): User authentication modules
- [src/components](src/components/): Reusable UI components
- [src/lib](src/lib/): Utility libraries and helpers
- [src/types](src/types/): TypeScript type definitions
- [public](public/): Publicly accessible static assetsd

## Setting Up

Insert your environment variables.

## Run Locally

1. Clone AIAIO repository:  
```bash  
git clone https://github.com/lryanle/AIAIO  
```
2. Install the dependencies with one of the package managers listed below:  
```bash  
pnpm install  
bun install  
npm install  
yarn install  
```
3. Start the development mode:  
```bash  
pnpm dev  
bun dev  
npm run dev  
yarn dev  
```

## Contributors

[![Contributors](https://contrib.rocks/image?repo=lryanle/AIAIO)](https://github.com/lryanle/AIAIO/graphs/contributors)

## FAQ

#### 1.What is this project about?

This project aims to **briefly describe your project's purpose and goals.**

#### 2.How can I contribute to this project?

Yes, we welcome contributions! Please refer to our [Contribution Guidelines](CONTRIBUTING.md) for more information on how to contribute.

#### 3.What is this project about?

Your answer.

## License

This project is licensed under the **MIT License** - see the [MIT License](https://github.com/lryanle/AIAIO/blob/main/LICENSE) file for details.

## Table of Contents

- [Project Summary](#project-summary)
- [Setting Up](#setting-up)
- [Run Locally](#run-locally)
- [Contributors](#contributors)
- [FAQ](#faq)
    - [1.What is this project about?](#1what-is-this-project-about)
    - [2.How can I contribute to this project?](#2how-can-i-contribute-to-this-project)
    - [3.What is this project about?](#3what-is-this-project-about)
- [License](#license)
- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Deploy](#deploy)

## Overview

AIAIO (@HackTX 2024) is a rapid prototyping tool using Vercel's AI SDK, Clerk, CodeSandbox's Sandpack, React-flow, TLDRAW, Shadcn/UI, Supabase, T3, and more.

## Project Structure

```bash
├── .eslintrc.json
├── .gitignore
├── .terraform.lock.hcl
├── .terraform.tfstate.lock.info
├── LICENSE
├── README.md
├── components.json
├── declarations.d.ts
├── main.tf
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   └── logo.svg
├── src
│   ├── app
│   │   ├── api
│   │   │   └── ai
│   │   │       └── ui
│   │   │           └── route.ts
│   │   ├── auth
│   │   │   └── confirm
│   │   │       └── route.ts
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── middleware.ts
│   │   ├── page.tsx
│   │   ├── proto
│   │   │   └── [protoId]
│   │   │       ├── client-page.tsx
│   │   │       └── page.tsx
│   │   ├── sign-in
│   │   │   └── [[...sign-in]]
│   │   │       └── page.tsx
│   │   └── sign-up
│   │       └── [[...sign-up]]
│   │           └── page.tsx
│   ├── client-store.ts
│   ├── components
│   │   ├── draw-section.tsx
│   │   ├── logiceditor
│   │   │   ├── CustomEdge.tsx
│   │   │   ├── connectionline.tsx
│   │   │   └── logiceditor.tsx
│   │   ├── navigation
│   │   │   ├── navbar-wrapper.tsx
│   │   │   └── navbar.tsx
│   │   ├── sandpack
│   │   │   ├── SandpackBase.tsx
│   │   │   ├── SandpackCore.tsx
│   │   │   └── SandpackReact.tsx
│   │   ├── sign-in.tsx
│   │   ├── sign-up.tsx
│   │   └── ui
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── popover.tsx
│   │       ├── resizable.tsx
│   │       ├── separator.tsx
│   │       ├── tabs.tsx
│   │       ├── text-hover-effect.tsx
│   │       ├── textarea.tsx
│   │       └── tooltip.tsx
│   ├── db
│   │   └── index.ts
│   ├── env.mjs
│   ├── lib
│   │   ├── actions.ts
│   │   ├── supabase
│   │   │   ├── client.ts
│   │   │   ├── middleware.ts
│   │   │   └── server.ts
│   │   └── utils.ts
│   ├── prompt.ts
│   ├── types
│   │   └── tools.ts
│   └── validators.ts
├── tailwind.config.ts
└── tsconfig.json

```

## Deployment

https://oldmcdonaldhadafarmAIAIO.tech

# Acknowledgements

- [TLDRAW](https://github.com/TLDRAW/TLDRAW) - Inspiration for turning designs into code. Our prompt is partially based on their work.
- [V0](https://v0.dev) - Inspiration of turning words into code. Our application is heavily inspired by V0 and their ethos
