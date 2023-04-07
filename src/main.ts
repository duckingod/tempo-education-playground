import { createApp } from 'vue'
import App from './App.vue'
import draggable from 'vuedraggable'

const app = createApp(App);
app.component('draggable', draggable);
app.mount('#app')
