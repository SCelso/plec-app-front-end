import { createApp } from "vue";
import App from "./App.vue";
// TODO: Define routing system
// import router from "./router";
import PrimeVue from "primevue/config";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "sweetalert2/src/sweetalert2.scss";

// PRIME COMPONENTS
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import ProgressSpinner from "primevue/progressspinner";

import "primevue/resources/themes/lara-light-purple/theme.css";

const app = createApp(App);
// GLOBAL PROPERTIES
app.provide("apiUrl", "http://localhost:3000/api/");

// app.use(router);

app.use(PrimeVue, { ripple: true });

/*
    Componentes de PrimeVue globales
    app.component(componentName)
*/

app.component("InputText", InputText);
app.component("Button", Button);
app.component("Checkbox", Checkbox);
app.component("ProgressSpinner", ProgressSpinner);

app.mount("#app");
