import { allComments, getComments, postComment } from './api.js';

import { getListCommentsEdit } from './getComments.js';

import { renderLoginComponent } from './components/login-component.js';

const commentsLi = document.querySelectorAll('.comment');

const buttonTextInput = document.getElementById('textInput');

let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';
token = null;


const renderApp = () => {
	const appEl = document.getElementById('app');
	if (!token) {
		renderLoginComponent({
			appEl,
			setToken: newToken => {
				token = newToken;
			},
			getComments,
		});

		return;
	}


	const commentsHTML = allComments

		.map((man, index) => getListCommentsEdit(man, index))
		.join('');

		

	const appHTML = `<div class="container">
			<ul id="idComments" class="comments">${commentsHTML}</ul>
			<div class="add-comment">Комментарий добавляется...</div>

			<div class="add-form">
				<input
					id="nameInput"
					type="text"
					class="add-form-name"
					value=""
					placeholder="Введите ваше имя"
					disabled
				/>
				<textarea
					id="textInput"
					type="textarea"
					class="add-form-text"
					placeholder="Введите ваш комментарий"
					
					rows="4"
				></textarea>
				<div class="add-form-row">
					<button id="add-form-button" class="add-form-button">Написать</button>
				</div>
			</div>
		</div>`;

	appEl.innerHTML = appHTML;

	const addComment = document.querySelector('.add-comment');

	addComment.style.display = 'none';

	const buttonNameInput = document.getElementById('nameInput');

	const buttonTextInput = document.getElementById('textInput');

	const buttonElement = document.getElementById('add-form-button');

	buttonNameInput.addEventListener('keyup', event => {
		if (event.key === 'Enter') {
			buttonElement.click();
		}
	});

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

	initEventListeners();
	commentAnswer();
};

const initEventListeners = () => {
	const buttonsLike = document.querySelectorAll('.like-button');
	for (const buttonLike of buttonsLike) {
		const index = buttonLike.dataset.index;

		buttonLike.addEventListener('click', event => {
			event.stopPropagation();
			function delay(interval = 300) {
				return new Promise(resolve => {
					setTimeout(() => {
						resolve();
					}, interval);
				});
			}
			allComments[index].isLikeLoading = true;
			delay(1000).then(() => {
				allComments[index].countLike = allComments[index].likeComment
					? allComments[index].countLike - 1
					: allComments[index].countLike + 1;
				allComments[index].likeComment = !allComments[index].likeComment;
				allComments[index].isLikeLoading = false;
				renderApp();
			});
			renderApp();
		});
	}
};

const commentAnswer = () => {
	for (const commentLi of commentsLi) {
		const index = commentLi.dataset.index;
		commentLi.addEventListener('click', () => {
			buttonTextInput.value = `${allComments[index].text}${'\n'}${
				allComments[index].name
			},`;
			renderApp();
		});
	}
};

export default renderApp;
export { getListCommentsEdit };
export { token };
