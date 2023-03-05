import { createI18n } from "vue-i18n";

const i18n = createI18n({
    locale: "es",

    messages: {
        en: {
            login: {
                hello: "hello world",
            },
        },
        es: {
            login: {
                hello: "hola mundo",
            },
        },
    },
});

export default i18n;
