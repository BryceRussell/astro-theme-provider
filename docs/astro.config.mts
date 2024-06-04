import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import { packageVersion } from "./src/utils";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "Astro Theme Provider",
			lastUpdated: true,
			social: {
				discord: "https://chat.astrolicious.dev/",
				github: "https://github.com/astrolicious/astro-theme-provider",
			},
			editLink: {
				baseUrl: "https://github.com/astrolicious/astro-theme-provider/edit/main/docs"
			},
			customCss: ["./src/styles/global.css"],
			sidebar: [
				{
					label: "Introduction",
					items: [
						{
							label: "Why?",
							link: "/why",
						},
						{
							label: "Core Concepts",
							link: "/core-concepts",
						},
						{
							label: "Getting Started",
							link: "/getting-started",
						},
					]
				},
				{
					label: "Conventions and Techniques",
					items: [
						{
							label: "Theme Configurations",
							link: "#",
						},
						{
							label: "Styling a Theme",
							link: "/conventions/styles",
						},
						{
							label: "Authoring Routes",
							link: "#",
						},
						{
							label: "Authoring Components",
							link: "#",
						},
						{
							label: "Client Scripts & Frameworks",
							link: "#",
						},
						// {
						// 	label: "Integration Wrappers",
						// 	link: "#",
						// 	badge: {
						// 		text: "Advanced",
						// 		variant: "caution",
						// 	}
						// },
					],
				},
				{
					label: "Reference",
					items: [
						{
							label: "Author API",
							link: "/reference/author",
						},
						{
							label: "User API",
							link: "/reference/user",
						},
					]
				},
				{
					label: "Upgrade Guide",
					link: "/upgrade-guide",
				},
				{
					label: `v${packageVersion} Changelog ↗`,
					link:
						`https://github.com/astrolicious/astro-theme-provider/blob/main/package/CHANGELOG.md#${packageVersion.replaceAll(".", "")}`,
					attrs: {
						target: "_blank",
					},
				},
				{
					label: "Need Help? ↗",
					link: "https://chat.astrolicious.dev/"
				},
			],
		}),
	],
});
