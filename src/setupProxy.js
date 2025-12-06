const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api_nasa',
        createProxyMiddleware({
            target: 'https://power.larc.nasa.gov',
            changeOrigin: true,
            secure: true,
            pathRewrite: {
                '^/api_nasa': ''
            },
            onError: (err, req, res) => {
                console.error('Proxy error:', err.message);
                res.status(500).json({ error: 'Error de conexión con API de radiación solar' });
            }
        })
    );
};
/* // ⚠️ OPCIONAL: Si necesitas mantener PVGIS por si acaso, déjalo comentado o así:
app.use(
    '/api_pvgis', 
    createProxyMiddleware({
        target: 'https://re.jrc.ec.europa.eu', 
        changeOrigin: true, 
        pathRewrite: {
            '^/api_pvgis': '', 
        },
    })
);
*/
