var request = require('./requests');

timeToUpdate(function (item) {
  // if update fails, maybe token has expired
  if (item === false) {
    timeToAuth(function (item) {
      // if auth succeeds, try to update again
      if (item === true) {
        timeToUpdate(function (item) {
          if (item === false) {
            console.log('Updating fails.');
          }
        });
      } else {
        console.log('Authentication fails.')
      }
    });
  }
  // else everything is well
});

function timeToUpdate (callback) {
  request.setIp(function (item) {
    if (typeof callback === 'function' && callback()) {
      if (JSON.parse(item).success === false) {
        callback(false);
      } else {
        callback(true);
      }
    }
  });
};

function timeToAuth (callback) {
  request.authenticate(function (item) {
    if (typeof callback === 'function' && callback()) {
      if (item.success === false) {
        callback(false);
      } else {
        callback(true);
      }
    }
  });
};