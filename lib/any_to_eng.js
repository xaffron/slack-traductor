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

function maybeTranslateTo(text, toLang1) {

  return ({ pred, lang}) => {

    return new Promise((resolve, reject) => {

      if (pred === false) {

        Translator.requestAPICall(() => {

          Translator.translate({ fromLang: lang, toLang: toLang1 }, text)
            .then(resolve)
            .catch(reject);
        });
      } else {
        reject(text);
      }
    });
  };
}

export function maybeTranslateToEng(text) {

  return new Promise((resolve, reject) => {

    Translator.requestAPICall(() => {

//      Translator.isLang(LANG, text)
//        .then(maybeTranslate(text))
//        .then(resolve)
//        .catch(reject);
      Translator.isLang(LANG, text)
        .then(maybeTranslateTo(text, 'pt'))
        .then(resolve)
        .catch(reject);
    });
  });
}
export function maybeTranslateToAr(text) {

  return new Promise((resolve, reject) => {

    Translator.requestAPICall(() => {

      Translator.isLang(LANG, text)
        .then(maybeTranslateTo(text, 'ar'))
        .then(resolve)
        .catch(reject);
    });
  });
}

