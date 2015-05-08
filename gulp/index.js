var drFrankenstyle = require('dr-frankenstyle');
var through2 = require('through2');
var File = require('vinyl');

module.exports = function() {
  return drFrankenstyle({stream: true})
    .pipe(through2.obj(function(file, encoding, callback) {
      file.drFrankenstyle = true;
      callback(null, Object.setPrototypeOf(file, new File(file)));
    }));
};

module.exports.done = function() {
  return through2.obj(function(file, encoding, callback) {
    if (file.drFrankenstyle) {
      var clone = Object.getPrototypeOf(file);
      Object.keys(file).forEach(function(key) {
        clone[key] = file[key];
      });
      file = clone;
    }
    callback(null, file);
  });
};