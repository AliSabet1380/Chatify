module.exports = (fn) => async (token, secret) => await fn(token, secret);
