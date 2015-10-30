var crypto = require('crypto');
var config = require('./config')['auth'];

function encrypt(data) {
  var sha = crypto.createHash(auth.algorithm, auth.key);
  var gen = sha.update(data).digest(auth.digest);
  return gen;
}

exports.encrypt = encrypt;
