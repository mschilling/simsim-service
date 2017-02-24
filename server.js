'use strict';

require('dotenv').config({ silent: true });
const config = require('./config');
const moment = require('moment');

const firebase = require('firebase');
firebase.initializeApp({
  serviceAccount: config.firebase.serviceAccount,
  databaseURL: config.firebase.databaseURL
});

const ref = firebase.database().ref();

ref.child('gate/open').on('child_added', onCodeEntered);

function onCodeEntered(snapshot) {
  const log = snapshot.val();
  return logEntry(log)
    .then(() => snapshot.ref.remove());
}

function logEntry(obj) {
  obj.log_time = moment().valueOf();
  return ref.child('history').push(obj);
}
