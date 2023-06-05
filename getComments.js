

const getListCommentsEdit = (man, index) => {
	return `<li  class="comment" data-index = '${index}'>

			        <div class="comment-header">
			          <div>${man.name}</div>
			          <div>${man.date}</div>
			        </div>
			        <div  class="comment-body">

			            <div style = 'word-wrap: break-word' class="comment-text">

			              ${man.text}
			            </div>
			          </div>
			          <div class="comment-footer">
			            <div class="likes" >
			              <span   class="likes-counter">${man.countLike}</span>
										<button data-index = '${index}' data-id = '${man.id}'   class="like-button  ${
		man.likeComment ? '-active-like ' : ''
	} ${man.isLikeLoading ? '-loading-like' : ''}" ></button>
			            </div>
			          </div>
			      </li>`;
};

export { getListCommentsEdit };
