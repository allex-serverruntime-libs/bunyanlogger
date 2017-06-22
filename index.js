var bunyan = require('bunyan'),
  Path = require('path');

function BunyanLogger (file_path, rotation_interval, backcopies, app_name) {
  this.logger = bunyan.createLogger({
    name : app_name || 'allex',
    streams: [{
      type: 'rotating-file',
      path : Path.resolve(process.cwd(), file_path || '.bunyan.log'),
      period: rotation_interval || '1d',
      count : isNaN(backcopies) ? 3 : backcopies
    }]
  });
}


function toString (item) {
  try {
    if ('object' === typeof(item)) {
      return JSON.stringify(item, null, 2);
    }
  }catch (e) {
  }
  return item ? item.toString() : item;
}

BunyanLogger.prototype.info = function () {
  if (this.logger) this.logger.info.apply(this.logger, arguments);
};

BunyanLogger.prototype.error = function () {
  if (this.logger) this.logger.error.apply(this.logger, arguments);
};

BunyanLogger.prototype.warn = function () {
  if (this.logger) this.logger.warn.apply(this.logger, arguments);
};


module.exports = BunyanLogger;
