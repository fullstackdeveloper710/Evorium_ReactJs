import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { English, Français, Español } from "./Languages";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        ...English,
      },
    },
    es: {
      translation: {
        ...Español,
      },
    },
    fr: {
      translation: {
        ...Français,
      },
    },
    // Add more languages and translations as needed
  },
  lng: "en", // default language
  fallbackLng: "en", // fallback language if a translation is missing
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
