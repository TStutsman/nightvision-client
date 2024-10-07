import './styles/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { createNewGame } from './actions/newGame';

createNewGame()
.then(() => createApp(App).mount('#app'));
