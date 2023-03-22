import { createI18n } from "vue-i18n";

const i18n = createI18n({
    locale: "es",

    messages: {
        es: {
            email: "Correo electrónico",
            password: "Contraseña",
            login: {
                dont_have_account: "¿Aún no tienes una cuenta?",
                create_account: "¡Crear cuenta!",
                forgot_password: "¿Olvidaste tu contraseña?",
                login: "Iniciar sesión",
            },
            play: {
                search_professor: "Buscar profesor",
                search_tags: "Buscar etiquetas",
                next: "Siguiente",
                tags: "Etiquetas",
                professors: "Profesores",
            },
        },
        en: {
            email: "Email",
            password: "Password",
            login: {
                dont_have_account: "Don't you have an account?",
                create_account: "Create one!",
                forgot_password: "Forgot password?",
                login: "Sign in",
            },
            play: {
                search_professor: "Search professor",
                search_tags: "Search tags",
                next: "Next",
                tags: "Tags",
                professors: "Professors",
            },
        },
    },
});

export default i18n;
