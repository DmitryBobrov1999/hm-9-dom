

const commentsLi = document.querySelectorAll('.comment');

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
				renderPeople(element, getListComments);
			});
			renderPeople(element, getListComments);
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
			renderPeople(element, getListComments);
		});
	}
};

const renderPeople = (element, getListComments) => {
	
	const commentsHTML = allComments

		.map((man, index) => getListComments(man, index))
		.join('');

	element.innerHTML = commentsHTML;

	initEventListeners();
	commentAnswer();
};

export default renderPeople;
