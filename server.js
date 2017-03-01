'use strict';

require('dotenv').config({ silent: true });
const config = require('./config');
const moment = require('moment');

const twilio = require('twilio');
const client = new twilio.RestClient(config.twilio.accountSid, config.twilio.authToken);

const firebase = require('firebase');
firebase.initializeApp({
  serviceAccount: config.firebase.serviceAccount,
  databaseURL: config.firebase.databaseURL
});

const ref = firebase.database().ref();
let appSettings = {};

ref.child('settings').once('value').then((snapshot) => {
  appSettings = snapshot.val();

  ref.child('settings').on('child_changed', function(snapshot) {
    appSettings[snapshot.key] = snapshot.val();
  });

  ref.child('gate/open').on('child_added', onCodeEntered);
});

function onCodeEntered(snapshot) {
    const data = snapshot.val();
    return logEntry(data)
      .then(() => processEntry(snapshot))
      .then(() => snapshot.ref.remove());
  }

function logEntry(obj) {
    obj.timestamp = moment().valueOf();
    console.log(obj);
    return ref.child('history').push(obj);
  }

function processEntry(snapshot) {
    console.log('Pin correct so lets open gate', snapshot.val());
    if (appSettings.enabled === true) {
      return ref.child(`codes/${snapshot.val().code}`)
        .once('value').then((codeSnapshot) => {
          const validate = codeSnapshot.val();
          if(validate.debug == true) {
            return Promise.resolve();
          }
          return openGateUsingOutgoingCall();
        });
    }
    console.log('App disabled');
    return Promise.resolve();
  }

function openGateUsingOutgoingCall() {
    const voiceUrl = 'https://api.michaelschilling.com/voice/default-message';

    return client.calls.create({
      url: voiceUrl,
      to: config.twilio.gateNumber,
      from: config.twilio.number,
      method: 'GET',
      fallbackMethod: 'GET',
      statusCallbackMethod: 'GET',
      record: false,
      timeout: 5

    }, function (err, message) {
      if (err) {
        console.log(err, message.sid);
      }
    });
  }
