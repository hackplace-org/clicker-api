import { Hono } from "hono";
import { serveStatic } from "hono/bun";

import * as elements from "typed-html";

const Root = ({ children }: elements.Children) => `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Document</title>

			<link href="/static/uno.css" rel="stylesheet" type="text/css" />
			<script src="https://unpkg.com/htmx.org@1.9.4"></script>
		</head>

		${children}
	</html>
`;

const app = new Hono();
app.use("/static/*", serveStatic({ root: "./" }));

let clicks = 0;
app.post("/click", (c) => {
	clicks++;
	return c.text(`Clicked ${clicks} time${clicks === 1 ? "" : "s"}!`);
});

app.get("/", (c) =>
	c.html(
		<Root>
			<body class="h-screen bg-[#0c0a09] text-light">
				<main class="h-full space-y-4 flex flex-col justify-center items-center">
					<h1 class="text-6xl font-bold">Not clicked.</h1>
					<button
						class="px-4 py-2 rounded-lg bg-[#e11d48]"
						hx-post="/click"
						hx-target="previous h1"
						hx-swap="textContent"
					>
						Click me!
					</button>
				</main>
			</body>
		</Root>
	)
);

export default app;
