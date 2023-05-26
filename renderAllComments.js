import { allComments } from './api.js';

import { getListCommentsEdit } from './getComments.js';

const listElement = document.getElementById('idComments');

const commentsLi = document.querySelectorAll('.comment');

const renderPeople = () => {
	const commentsHTML = allComments

		.map((man, index) => getListCommentsEdit(man, index))
		.join('');

	listElement.innerHTML = commentsHTML;

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
				renderPeople();
			});
			renderPeople();
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
			renderPeople();
		});
	}
};

export default renderPeople;
export { getListCommentsEdit };
