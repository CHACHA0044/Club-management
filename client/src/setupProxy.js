// This file is automatically picked up by Create React App in development only.
// It is NEVER included in the production build, so the proxy is dev-only.
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true,
        })
    );
};
