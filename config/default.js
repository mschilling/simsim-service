'use strict';

// More info: // REF: http://goenning.net/2016/05/13/how-i-manage-application-configuration-with-nodejs/
module.exports = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_TOKEN,
    number: process.env.TWILIO_NUMBER,
    gateNumber: process.env.GATE_NUMBER
  },
  firebase: {
    databaseURL: process.env.FIREBASE_DB_URL,
    serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT
  }
};
