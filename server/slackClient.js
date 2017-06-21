'use strict'

var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

module.exports.init = function slackClient(bot_token, logLevel) {
    const rtm = new RtmClient(bot_token, { logLevel: logLevel });
    return rtm;
}

