import { allComments, getComments } from './api.js';

import { getListCommentsEdit } from './getComments.js';

import { token } from './api.js';

const listElement = document.getElementById('idComments');

const commentsLi = document.querySelectorAll('.comment');

const buttonNameInput = document.getElementById('nameInput');

const buttonTextInput = document.getElementById('textInput');

const renderApp = () => {
	const appEl = document.getElementById('app');
	if (!token) {
		const appHTML = `<div class="container">
			
			<div class="add-form add-form-login">
				<h3>Форма входа</h3>
				<input
					id="loginInput"
					type="text"
					class="add-form-name add-form-nameLogin"
					placeholder="Введите логин"
				/>
				<textarea
					id="loginInput"
					type="password"
					class="add-form-text add-form-textLogin"
					placeholder="Введите пароль"
				></textarea>
				<div class="add-form-row">
					<button id="login-button" class="add-form-button">Войти</button>
					<button id="login-button" class="add-form-button-signUp">Зарегистрироваться</button>
				</div>
				
			</div>
		</div>`;

		appEl.innerHTML = appHTML;

		document.getElementById('login-button').addEventListener('click', () => {
			token =
				'Bearer b4c4bocwcodg5g6c5g5g6g5g5k5o5s5w606g3803cg3c03d43cw3c03c43k37o3co3b83cw3co3bc';
			getComments();
		});

		return;
	}

	const commentsHTML = allComments

		.map((man, index) => getListCommentsEdit(man, index))
		.join('');

	const appHTML = `<div class="container">
										<ul id="idComments" class="comments"></ul>
										${commentsHTML}
										<div class="add-comment">Комментарий добавляется...</div>

										<div class="add-form">
										<input
										id="nameInput"
										type="text"
										class="add-form-name"
										placeholder="Введите ваше имя"
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
