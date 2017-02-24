'use strict';

// More info: // REF: http://goenning.net/2016/05/13/how-i-manage-application-configuration-with-nodejs/
module.exports = {
  firebase: {
    databaseURL: process.env.FIREBASE_DB_URL,
    serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT
  }
};