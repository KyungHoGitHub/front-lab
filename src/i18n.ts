import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import ko from  './locals/ko/trans.json'
import en from  './locals/en/trans.json'

const resources = {
    ko:{translation: ko},
    en:{translation: en}
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'ko', // 기본 언어
    fallbackLng: 'ko', // 언어가 없을 경우 대체
    interpolation: {
        escapeValue: false, // React는 XSS 방지가 기본 제공됨
    },
})
export default i18n;