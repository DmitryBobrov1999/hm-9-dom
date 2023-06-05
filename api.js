import renderApp from './renderAllComments.js';

import { token } from './renderAllComments.js';

import { format } from 'date-fns';

let allComments = [];

const host = 'https://webdev-hw-api.vercel.app/api/v2/dmitry-bobrov/comments';

function getComments() {
	return fetch(host, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	})
		.then(response => {
			if (response.status === 401) {
				throw new Error('Нет авторизации');
			}
			return response.json();
		})
		.then(responseData => {
			allComments = responseData.comments.map(man => {
				let trueDate = new Date(man.date);
				trueDate.setHours(trueDate.getHours() - 3);
				const createDate = format(trueDate, 'dd.MM.yy HH:mm:ss');
				return {
					name: man.author.name,
					date: createDate,
					text: man.text,
					countLike: man.likes,
					likeComment: man.isLiked,
					id: man.id,
					forceError: true,
				};
			});

			renderApp();
		});
}

function postComment() {
	const addForm = document.querySelector('.add-form');
	const addComment = document.querySelector('.add-comment');
	const buttonNameInput = document.getElementById('nameInput');
	const buttonTextInput = document.getElementById('textInput');
	addForm.style.display = 'none';
	addComment.style.display = 'block';

	const realDate = `${
		new Date().toLocaleDateString().slice(0, 6) +
		`${new Date().toLocaleDateString().slice(8)}`
	}  ${new Date().toLocaleTimeString().slice(0, -3)}`;

	return fetch(host, {
		method: 'POST',
		body: JSON.stringify({
			name: buttonNameInput.value
				.replaceAll('&', '&amp;')
				.replaceAll('<', '&lt;')
				.replaceAll('>', '&gt;')
				.replaceAll('"', '&quot;'),
			text: buttonTextInput.value
				.replaceAll('&', '&amp;')
				.replaceAll('<', '&lt;')
				.replaceAll('>', '&gt;')
				.replaceAll('"', '&quot;'),
			date: realDate,
			countLike: 0,
			likeComment: false,
			forceError: false,
			id: man.id,
		}),
		headers: {
			Authorization: token,
		},
	})
		.then(response => {
			if (response.status === 400) {
				throw new Error('Неверный запрос');
			}
			if (response.status === 500) {
				throw new Error('Ошибка сервера');
			} else {
				return response.json();
			}
		})
		.then(() => {
			return getComments();
		})
		.then(() => {
			addForm.style.display = 'flex';
			addComment.style.display = 'none';
			buttonNameInput.value = '';
			buttonTextInput.value = '';
		})
		.catch(error => {
			if (error.message === 'Неверный запрос') {
				alert('Имя и комментарий должны быть не короче 3х символов');
			} else {
				alert('Сервер сломался, попробуй позже');
			}
			addComment.style.display = 'none';
			addForm.style.display = 'flex';
		});
}

export function loginUser({ login, password }) {
	return fetch('https://wedev-api.sky.pro/api/user/login', {
		method: 'POST',
		body: JSON.stringify({
			login,
			password,
		}),
	}).then(response => {
		if (response.status === 400) {
			throw new Error('Неверный логин или пароль');
		}
		return response.json();
	});
}

export function registerUser({ login, password, name }) {
	return fetch('https://wedev-api.sky.pro/api/user', {
		method: 'POST',
		body: JSON.stringify({
			login,
			password,
			name,
		}),
	}).then(response => {
		if (response.status === 400) {
			throw new Error('Такой пользователь уже существует');
		}
		return response.json();
	});
}

export function numberOfLikes({ token, id, countLike, likeComment }) {
	return fetch(
		`https://webdev-hw-api.vercel.app/api/v2/dmitry-bobrov/comments/${id}/toggle-like`,
		{
			headers: {
				Authorization: token,
			},
			method: 'POST',
			body: {
				countLike,
				likeComment,
			},
		}
	).then(response => {
		if (response.status === 401) {
			throw new Error('Нет авторизации');
		}
		return response.json();
	});
}

export { allComments, postComment, getComments };
