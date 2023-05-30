import renderApp from './renderAllComments.js';

const addForm = document.querySelector('.add-form');

const addComment = document.querySelector('.add-comment');

const buttonNameInput = document.getElementById('nameInput');

const buttonTextInput = document.getElementById('textInput');

let allComments = [];

const host = 'https://webdev-hw-api.vercel.app/api/v2/dmitry-bobrov/comments';

let token =
	'Bearer b4c4bocwcodg5g6c5g5g6g5g5k5o5s5w606g3803cg3c03d43cw3c03c43k37o3co3b83cw3co3bc';

const getComments = () => {
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
				return {
					name: man.author.name,
					date: `${
						new Date(man.date).toLocaleDateString().slice(0, 6) +
						`${new Date(man.date).toLocaleDateString().slice(8)}`
					}  ${new Date(man.date).toLocaleTimeString().slice(0, -3)}`,
					text: man.text,
					countLike: man.likes,
					likeComment: false,
					forceError: true,
				};
			});
			renderApp();
		});
};

function postComment() {
	addForm.style.display = 'none';
	addComment.style.display = 'block';
	fetch(host, {
		method: 'POST',
		headers: {
			Authorization: token,
		},
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
		}),
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

const realDate = `${
	new Date().toLocaleDateString().slice(0, 6) +
	`${new Date().toLocaleDateString().slice(8)}`
}  ${new Date().toLocaleTimeString().slice(0, -3)}`;

export { getComments };
export { postComment };
export { allComments };
export { token}
