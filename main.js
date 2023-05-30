import { getComments, postComment, allComments } from './api.js';

import renderApp from './renderAllComments.js';

const buttonElement = document.getElementById('add-form-button');

const buttonNameInput = document.getElementById('nameInput');

const buttonTextInput = document.getElementById('textInput');

const addComment = document.querySelector('.add-comment');

// const listElement = document.getElementById('idComments');

getComments().then(() => {
	renderApp();
});
