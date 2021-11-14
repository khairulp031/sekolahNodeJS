const env = require('node-env-file');
env('.env');
const rs = require('jsrsasign');
const rsu = require('jsrsasign-util');
const JWS = rs.jws.JWS;
const path = require('path');
const base64url = require('base64url');

const verifyJWT = (token) => {
    const pemFile = rsu.readFile(path.join(__dirname, 'rsa/rsa.pub.pem'));
    const publicKey = rs.KEYUTIL.getKey(pemFile);
    const isValid = JWS.verify(token, publicKey);
    if (isValid) {
        const tokenParts = token.split('.');
        const payload = JSON.parse(base64url.decode(tokenParts[1]));
        return payload;
    }
    return {};
}
const verifyToken = (req, res, next) => {
    try {
        const headers = req.headers
        const cookie = headers['cookie']
        let token = cookie.split(';')
        token = token[0].split('=')
        token = token[1]
        const csrf = headers['csrf']
        const decoded = verifyJWT(token);
        if (decoded && decoded.csrf === csrf) {
            return next();
        }
    } catch (e) {
    }
    return res.status(403).send({
        status: 'ERROR',
        message: "insufficient permission."
    });
}
const getTokenData = (req) => {
    try {
        const headers = req.headers
        const cookie = headers['cookie']
        let token = cookie.split(';')
        token = token[0].split('=')
        token = token[1]
        const tokenParts = token.split('.');
        const payload = JSON.parse(base64url.decode(tokenParts[1]));
        return payload;
    } catch (e) {
    }
    return null;
}
module.exports = {
    verifyToken,
    getTokenData
}