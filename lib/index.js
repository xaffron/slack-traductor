import SlackBot from 'slackbots';
import initialize from './message_handler';
import langCodes from './lang_codes';

if (!langCodes.has(process.env.TRANSLATE_TO)) {

  throw Error('Invalid lang code');
}

// persistent storage:
// 1 key for every user code storing their handles and swgoh-timezone
// 1 key for every day of the week marking flash events

var kv = require('beepboop-persist')({
  project_id: process.env.BEEPBOOP_PROJECT_ID,
  token: process.env.BEEPBOOP_TOKEN
})

const traductor = new SlackBot({
  token: process.env.BOT_TOKEN,
  name: process.env.BOT_NAME
});

traductor.on('start', () => {

  traductor.getUser(process.env.BOT_NAME)
    .then(({ id }) => initialize(traductor, id))
    .catch((err) => console.error(err));
});
