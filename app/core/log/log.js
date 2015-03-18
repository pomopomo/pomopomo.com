var winston = require('winston');

function traceCaller() {
  var stack = ((new Error()).stack).split('\n');
  if (stack.length > 4) {
    var line = stack[4];
    var start = line.indexOf(':', line.lastIndexOf('.'));
    var end = line.indexOf(')', start);
    return line.slice(start, end);
  }
  return '';
}

function getLogger(module) {
  var path = module.filename
      .replace(process.cwd(), '')
      .split('\\')
      .join('/');

  var transports = [
    new winston.transports.Console({
      colorize: true,
      levels: 'debug',
      label: path
    })
  ];

  var logger = new winston.Logger({
    transports: transports
  });

  var oldLog = logger.log;

  logger.log = function () {
    var args = Array.prototype.slice.call(arguments);
    args.splice(1, 0, traceCaller());
    oldLog.apply(logger, args);
  };

  return logger;
}
module.exports = getLogger;