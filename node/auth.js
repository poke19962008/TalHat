var crypto = require('crypto');

var encryption = {
  "key": "iloveapple",
  "algorithm": "sha1",
  "digest": "hex"
};

function encrypt(data) {
  var sha = crypto.createHash(encryption.algorithm, encryption.key);
  var gen = sha.update(data).digest(encryption.digest);
  return gen;
}

exports.encrypt = encrypt;
