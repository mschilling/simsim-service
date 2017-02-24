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
