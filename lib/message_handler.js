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

        console.log(type);
        console.log(channel);
        console.log(text);
        console.log(username);
        console.log(user);
        console.log(subtype);
        console.log(ts);
                

      if (text==='deleteme') {
        var pResult = traductor.updateMessage('HYQvbV8VSoI9eM6wF3YmJNbQ', chanId, ts, 'deleteyou');
        console.log(pResult);

        var text1 = text;
      console.log('text1:' + text1);
      maybeTranslateToEng(text1)
       .then(replyToUser(uname, chanId, '_(responder em inglês, por favor)_'))
        .catch((err) => console.log(err));
      
      console.log('text:' + text);
      return maybeTranslateToAr(text)
       .then(replyToUser(uname, chanId, '_(الرجاء الرد باللغة الإنجليزية)_'))
        .catch((err) => console.log(err));

      }
    }
  });

  function replyToUser(username, { name, is_group, is_channel }, addMsg) {
    return (text) => {
      console.log(`TEXT: ${text}`);
      text = `@${username} said: ${text}\n${addMsg}`;

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
