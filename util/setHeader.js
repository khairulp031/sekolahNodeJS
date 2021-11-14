const nocache = (req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, must-revalidate');
    res.header('Expires', '-1');
    next();
}
const nohttp = (req, res, next) => {
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-XSS-Protection', '1; mode=block');
    /*res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "*");*/
    res.header("Access-Control-Max-Age", "86400");
    res.header('X-Frame-Options', 'SAMEORIGIN');
    res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    if (req.headers.token) {
        res.header('token', req.headers.token);
    }
    next();
}

module.exports = {
    nocache,
    nohttp
}