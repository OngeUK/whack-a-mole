const workboxBuild = require("workbox-build");

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
	// This will return a Promise
	return workboxBuild
		.injectManifest({
			swSrc: "public/sw.js",
			swDest: "dist/sw.js",
			globDirectory: "dist",
			globPatterns: ["**/*.{mp3,js,woff2,html}"],
			globIgnores: ["**/sw.js", "**/report.html"]
		})
		.then(({ count, size, warnings }) => {
			// Optionally, log any warnings and details.
			warnings.forEach(console.warn);
			console.log(`${count} files will be precached, totaling ${size} bytes.`);
		});
};

buildSW();
