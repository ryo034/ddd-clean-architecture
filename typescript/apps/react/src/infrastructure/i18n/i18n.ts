import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import translationActionEn from "@/infrastructure/i18n/locales/en/action.json"
import translationPageEn from "@/infrastructure/i18n/locales/en/page.json"
import translationValidationEn from "@/infrastructure/i18n/locales/en/validation.json"
import translationWordEn from "@/infrastructure/i18n/locales/en/word.json"
import translationActionJa from "@/infrastructure/i18n/locales/ja/action.json"
import translationPageJa from "@/infrastructure/i18n/locales/ja/page.json"
import translationValidationJa from "@/infrastructure/i18n/locales/ja/validation.json"
import translationWordJa from "@/infrastructure/i18n/locales/ja/word.json"

const resources = {
  en: {
    translation: {
      ...translationWordEn,
      ...translationValidationEn,
      ...translationPageEn,
      ...translationActionEn
    }
  },
  ja: {
    translation: {
      ...translationWordJa,
      ...translationValidationJa,
      ...translationPageJa,
      ...translationActionJa
    }
  }
}

const DEFAULT_LANGUAGE = "ja"

export function initI18n() {
  i18n.use(initReactI18next).init({
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    debug: false,
    interpolation: {
      escapeValue: false
    },
    resources
  })
}

export const i18nRootKeys = {
  word: "word",
  action: "action",
  form: "form",
  page: "page"
}

export const i18nKeys = {
  word: {
    setting: `${i18nRootKeys.word}.setting`,
    resetting: `${i18nRootKeys.word}.resetting`,
    password: `${i18nRootKeys.word}.password`,
    email: `${i18nRootKeys.word}.email`,
    phoneNumber: `${i18nRootKeys.word}.phoneNumber`,
    phoneNumberNoHyphen: `${i18nRootKeys.word}.phoneNumberNoHyphen`,
    authCode: `${i18nRootKeys.word}.authCode`,
    sixDigitNumber: `${i18nRootKeys.word}.sixDigitNumber`,
    lendingManagement: `${i18nRootKeys.word}.lendingManagement`,
    materialManagement: `${i18nRootKeys.word}.materialManagement`,
    members: `${i18nRootKeys.word}.members`,
    employees: `${i18nRootKeys.word}.employees`,
    reference: `${i18nRootKeys.word}.reference`
  },
  action: {
    submit: `${i18nRootKeys.action}.submit`,
    back: `${i18nRootKeys.action}.back`,
    cancel: `${i18nRootKeys.action}.cancel`,
    login: `${i18nRootKeys.action}.login`,
    logout: `${i18nRootKeys.action}.logout`,
    inputField: `${i18nRootKeys.action}.inputField`,
    doAction: `${i18nRootKeys.action}.doAction`
  },
  form: {
    required: `${i18nRootKeys.form}.required`,
    regex: `${i18nRootKeys.form}.regex`,
    max: `${i18nRootKeys.form}.max`,
    min: `${i18nRootKeys.form}.min`,
    passwordRegex: `${i18nRootKeys.form}.passwordRegex`
  },
  page: {
    login: {
      forgotPassword: `${i18nRootKeys.page}.login.forgotPassword`,
      notHaveAnAccountYet: `${i18nRootKeys.page}.login.notHaveAnAccountYet`,
      createNewAccount: `${i18nRootKeys.page}.login.createNewAccount`
    },
    mfaAuthenticateCode: {
      verifyYourCode: `${i18nRootKeys.page}.mfaAuthenticateCode.verifyYourCode`,
      completedSentMessage: `${i18nRootKeys.page}.mfaAuthenticateCode.completedSentMessage`
    }
  }
}
