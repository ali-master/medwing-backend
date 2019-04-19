module.exports = {
	apps: [
		{
			name: "api",
			script: "index.js",
			env: { NODE_ENV: "development" },
			args: "--port 3001",
			watch: true,
			watch_options: { followSymlinks: false },
			ignore_watch: ["node_modules", "db"],
		},
	],
};
