import renderPeople from './renderAllComments.js'
import { getListCommentsEdit } from './listComments.js';


const listElement = document.getElementById('idComments');
const addForm = document.querySelector('.add-form');
const addComment = document.querySelector('.add-comment');
const buttonNameInput = document.getElementById('nameInput');
const buttonTextInput = document.getElementById('textInput');

const getComments = () => {
	
	return fetch(
		'https://webdev-hw-api.vercel.app/api/v1/dmitry-bobrov/comments',
		{
			method: 'GET',
		}
	)
		.then(response => {
			return response.json();
		})
		.then(responseData => {
			let allComments = [];
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
			renderPeople(listElement, getListCommentsEdit);
		});
};


function postComment() {
	addForm.style.display = 'none';
	addComment.style.display = 'block';
	fetch('https://webdev-hw-api.vercel.app/api/v1/dmitry-bobrov/comments', {
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
			forceError: true,
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


export { getComments, postComment };
