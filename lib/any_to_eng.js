import Translator from './translator';

const LANG = process.env.TRANSLATE_TO;

Translator.updateAccess();

function maybeTranslate(text) {

  return ({ pred, lang }) => {

    return new Promise((resolve, reject) => {

      if (pred === false) {

        Translator.requestAPICall(() => {

          Translator.translate({ fromLang: lang, toLang: LANG }, text)
            .then(resolve)
            .catch(reject);
        });
      } else {
        reject(text);
      }
    });
  };
}

export default function maybeTranslateToEng(text) {

  return new Promise((resolve, reject) => {

    Translator.requestAPICall(() => {

      Translator.isLang(LANG, text)
        .then(maybeTranslateToEng(text))
        .then(resolve)
        .catch(reject);
    });
  });
}

function isLang(langCode, text) {

  return new Promise((resolve, reject) => {

    request.get(
      {
        url: 'http://api.microsofttranslator.com/V2/Ajax.svc/Detect?text=' + encodeURIComponent(text),
        auth: { bearer: ACCESS_TOKEN }
      },
      (err, res, body) => err ? reject(err) : resolve(body))
  })
  .then(trimMicrosoft)
  .then((code) => ({
    pred: code === langCode,
    lang: code
  }));
}
