import { createI18n } from "vue-i18n";

const i18n = createI18n({
    locale: "es",

    messages: {
        es: {
            error: {
                error: "Error",
                creating_tag: "El tag ya existe",
            },
            email: "Correo electrónico",
            password: "Contraseña",
            create: {
                success_tag: "Tag creado con éxito",
                create: "Crear",
                question: "Crear pregunta",
                tag: "Crear tag",
                simple_selection: "Pregunta simple",
                multiple_selection: "Pregunta de selección múltiple",
                true_false: "Pregunta de verdadero o falso",
                type: "Tipo de pregunta",
                tag_name: "Nombre del tag",
                tag_color: "Color del tag",
            },
            navbar: {
                home: "Inicio",
                play: "Jugar",
                login: "Iniciar sesión",
                logout: "Cerrar sesión",
                register: "Registrarse",
                create: "Crear",
            },
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
                select_questions: "Selecciona preguntas",
                start: "Comenzar",
                questions: "Preguntas",
                play: "Jugar partida",
            },
        },
        en: {
            error: {
                error: "Error",
                creating_tag: "Tag already exists",
            },
            email: "Email",
            password: "Password",
            create: {
                success_tag: "Tag created successfully",
                create: "Create",
                question: "Create question",
                tag: "Create tag",
                simple_selection: "Simple selection",
                multiple_choice_selection: "Multiple choice selection",
                true_false: "True or false",
                type: "Question type",
                tag_name: "Tag name",
                tag_color: "Tag color",
            },
            navbar: {
                home: "Home",
                play: "Play",
                login: "Login",
                logout: "Logout",
                register: "Register",
                create: "Create",
            },
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
                select_questions: "Select questions",
                start: "Start",
                questions: "Questions",
                play: "Play Game",
            },
        },
    },
});

export default i18n;
