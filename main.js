import { getComments } from './api.js';

import renderApp from './renderAllComments.js';

getComments().then(() => {
	renderApp();
});
