/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true"
})

module.exports = withBundleAnalyzer({
	eslint: {
		dirs: ["."]
	},
	poweredByHeader: false,
	trailingSlash: true,
	// The starter code load resources from `public` folder with `router.basePath` in React components.
	// So, the source code is "basePath-ready".
	// You can remove `basePath` if you don't need it.
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_SWELL_STORE: process.env.NEXT_PUBLIC_SWELL_STORE,
		NEXT_PUBLIC_SWELL_API_TOKEN: process.env.NEXT_PUBLIC_SWELL_API_TOKEN
	},
	compiler: {
		// ssr and displayName are configured by default
		styledComponents: true
	}
})
