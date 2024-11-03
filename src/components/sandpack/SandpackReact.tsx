"use client";

import SandpackBase from "./SandpackBase";

interface SandpackReactProps {
	code: string;
}

export default function SandpackReact({ code }: SandpackReactProps) {
	return (
		<SandpackBase
			template="react"
			dependencies={{
				react: "latest",
				"react-dom": "latest",
				"react-markdown": "latest",
				axios: "latest",
				"@tanstack/react-query": "latest",
				"@tanstack/react-table": "latest",
				"framer-motion": "latest",
				tailwindcss: "latest",
				"react-hook-form": "latest",
				zod: "latest",
				"lucide-react": "latest",
				"@headlessui/react": "latest",
				"@heroicons/react": "latest",
				"@mui/material": "latest",
				"@mui/icons-material": "latest",
				"@chakra-ui/react": "latest",
				"@chakra-ui/icons": "latest",
				"semantic-ui-react": "latest",
				prettier: "latest",
				"react-spinners": "latest",
				"react-router": "latest",
				"date-fns": "latest",
				"class-variance-authority": "latest",
				clsx: "latest",
				"tailwind-merge": "latest",
				"tailwindcss-animate": "latest",
				vaul: "latest",
				recharts: "latest",
				sonner: "latest",
				"input-otp": "latest",
				"embla-carousel-react": "latest",
			}}
			files={{
				"App.js": { code, hidden: false },
				"/public/index.html": {
					code: `
<!DOCTYPE html>
<html lang="en" className="h-full w-full">
  <head className="h-full w-full">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body className="h-screen w-screen">
    <div id="root" className="h-full w-full"></div>
  </body>
</html>`,
					hidden: true,
				},
			}}
		/>
	);
}
