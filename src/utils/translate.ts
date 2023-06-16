import locales from "../locales/main.json";

export type Locale = keyof typeof locales;
export type LocaleKeys = keyof (typeof locales)[Locale];
export const DEFAULT_LOCALE = "en-US";
export const SUPPORTED_LOCALES = Object.keys(locales);

export function getSupportedLocale(queryLocale: string | null) {
  if (!queryLocale) {
    return DEFAULT_LOCALE;
  }

  const supportedLocale = SUPPORTED_LOCALES.find((locale) => locale === queryLocale);
  if (!supportedLocale) {
    return DEFAULT_LOCALE;
  }

  return supportedLocale as Locale;
}

export function t(key: LocaleKeys, locale: Locale = DEFAULT_LOCALE) {
  const localeData = locales[locale];

  const translation = localeData[key];
  if (!translation) {
    return key;
  }

  return translation;
}
