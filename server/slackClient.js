'use strict'

var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
let rtm = null;
let channel;

const handleOnAuthenticated = (rtmStartData) => {
    // The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
    for (const c of rtmStartData.channels) {
        if (c.is_member && c.name === 'general') { channel = c.id }
    }
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

const addAuthenticatedHandler = (rtm, handler) => {
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

// Send responce to slack on connected
const handleOnConnected = () => {
    rtm.sendMessage("Hello!", channel);
}

// Handle on message
const handleOnMessage = (message) => {
    console.log(message);
    rtm.sendMessage("This is test message", message.channel, () => {
        // optionally, you can supply a callback to execute once the message has been sent
    });
}

module.exports.init = function slackClient(bot_token, logLevel) {
    rtm = new RtmClient(bot_token, { logLevel: logLevel });
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, handleOnConnected)
    rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
    return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;