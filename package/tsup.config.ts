import { defineConfig } from "tsup";
import { peerDependencies } from "./package.json";

export default defineConfig((options) => {
	const dev = !!options.watch;
	return {
		entry: ["src/**/*.(ts|js)"],
		format: ["esm"],
		target: "node18",
		bundle: true,
		dts: true,
		sourcemap: true,
		clean: true,
		splitting: true,
		noExternal: ["astro-public"],
		minify: !dev,
		external: [...Object.keys(peerDependencies)],
		tsconfig: "tsconfig.build.json",
	};
});
