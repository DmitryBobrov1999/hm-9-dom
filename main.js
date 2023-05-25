import { getComments, postComment } from "./api.js";

const buttonElement = document.getElementById('add-form-button');

const listElement = document.getElementById('idComments');

const buttonNameInput = document.getElementById('nameInput');

const buttonTextInput = document.getElementById('textInput');

const buttonsLike = document.querySelectorAll('.like-button');

const likesCounter = document.querySelectorAll('.likes-counter');

const commentsLi = document.querySelectorAll('.comment');

const addForm = document.querySelector('.add-form');

const addComment = document.querySelector('.add-comment');

const isLikeLoading = document.querySelector('.-loading-like');


getComments();


buttonNameInput.addEventListener('keyup', enterFunction);
function enterFunction(event) {
	if (event.key === 'Enter') {
		buttonElement.click();
	}
}

addComment.style.display = 'none';

buttonElement.addEventListener('click', () => {
	buttonNameInput.addEventListener(
		'input',
		() => (buttonElement.disabled = false)
	);
	buttonTextInput.addEventListener(
		'input',
		() => (buttonElement.disabled = false)
	);
	buttonNameInput.classList.remove('error');
	buttonTextInput.classList.remove('error');
	if (buttonNameInput.value === '' && buttonTextInput.value === '') {
		buttonNameInput.classList.add('error');
		buttonTextInput.classList.add('error');
		buttonElement.disabled = true;
		return;
	}
	if (buttonNameInput.value === '') {
		buttonNameInput.classList.add('error');
		buttonElement.disabled = true;
		return;
	}
	if (buttonTextInput.value === '') {
		buttonTextInput.classList.add('error');
		buttonElement.disabled = true;
		return;
	}

	postComment();
	
});
