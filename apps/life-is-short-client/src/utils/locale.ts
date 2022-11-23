import { ru, enUS } from "date-fns/locale";

export const enum LangKey {
    RU = "ru",
    EN = "en",
}

type LangMap = {
    [key in LangKey]: {
        dateFnsLocale: Locale;
    };
};

let langMap: LangMap = {
    [LangKey.RU]: {
        dateFnsLocale: ru,
    },
    [LangKey.EN]: {
        dateFnsLocale: enUS,
    },
};

let currentLang: LangKey = LangKey.RU;

export function getLang(): LangKey {
    return currentLang;
}

export function setLang(lang: LangKey) {
    currentLang = lang;
}

export function getLocale(): Locale {
    return langMap[currentLang].dateFnsLocale;
}
