'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);
const bot_port = process.env.SLACK_BOT_PORT || 3000;
const bot_token = process.env.SLACK_BOT_TOKEN || 'xoxb-201789800167-c0iu7WgiDxMwSHIxnoeIWJg1';
const bot_logLevel = 'verbose';

const rtm = slackClient.init(bot_token, bot_logLevel);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(bot_port));


server.on('listening', function () {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode`);
})

