import Suspender from './suspender';
import { maybeTranslateToEng, maybeTranslateToAr } from './any_to_eng';
import { getUserName, getChanNameById } from './traductor_helpers';

export default function initialize(traductor, botId) {

  const ADD_MESSAGE = process.env.ADD_MESSAGE || '';
  const SUSPEND_TIMEOUT = process.env.SUSPEND_TIMEOUT || 600000;

  const suspendedChans = Suspender.getSuspendedChans();

  traductor.on('message', function({ type, channel, text, username, user, subtype, ts }) {

    if (text === `<@${botId}>: stop` && !suspendedChans.has(channel)) {

      return Suspender.suspendChan(channel, SUSPEND_TIMEOUT);
    }
    
    if (type === 'message' && user !== 'U2NFQBCFJ' && subtype !== 'message_changed' && !suspendedChans.has(channel)) {
 
      const chanId = getChanNameById([...traductor.channels, ...traductor.groups], channel);
      const uname = getUserName(traductor.users, user);
      const timestamp = ts;

      var channel = traductor.getChannelGroupOrDMByID(message.channel);

      console.log(user + '*' + ts + '*: ' + text);
      console.log('ChanID: ' + channel);

      maybeTranslateToEng(text)
       .then(replyToUser(uname, chanId))
        .catch((err) => console.log(err));
      
      return maybeTranslateToAr(text)
       .then(replyToUser(uname, chanId))
        .catch((err) => console.log(err));
    }
  });

  function replyToUser(username, { name, is_group, is_channel }) {
    return (text) => {
      text = `@${username} said: ${text}`;
      console.log(text);

      return new Promise((resolve, reject) => {

        if (is_group) {
          traductor.postMessageToGroup(name, text, {'as_user': true}, resolve);
        } else if (is_channel) {
          traductor.postMessageToChannel(name, text, {'as_user': true}, resolve);
        } else {
          reject('Neither Channel, nor Group!');
        }
        
      });
    };
  }
}
