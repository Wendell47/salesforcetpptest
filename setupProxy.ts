const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
	app.use(
		"/api",
		createProxyMiddleware({
			target: "https://bemoldigital.my.salesforce.com",
			changeOrigin: true,
			pathRewrite: {
				"^/api": "",
			},
			onProxyReq: (proxyReq, req, res) => {
				proxyReq.setHeader("Authorization", "Bearer UQvmKdhsgEupPZs22Q6AAnE1");
			},
		}),
	);
};
