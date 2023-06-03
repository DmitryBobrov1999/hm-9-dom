import { getComments } from './api.js';

import renderApp from './renderAllComments.js';

// localStorage.clear();
getComments().then(() => {
	renderApp();
});
