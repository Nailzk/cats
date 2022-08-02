const HttpsProxyAgent = require("https-proxy-agent");
const proxyConfig = [
  {
    context: "/api",
    target: "https://api.thecatapi.com/v1",
    secure: false,
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
  },
];

function setupForCorporateProxy(proxyConfig) {
  var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  if (proxyServer) {
    var agent = new HttpsProxyAgent(proxyServer);
    console.log("Using corporate proxy server: " + proxyServer);
    proxyConfig.forEach(function (entry) {
      entry.agent = agent;
    });
  }
  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
