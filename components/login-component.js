import { loginUser, registerUser } from '../api.js';

import _ from 'lodash';

export function renderLoginComponent({
	appEl,
	setToken,
	setUser,
	getComments,
}) {
	let isLoginMode = true;

	const renderForm = () => {
		const appHTML = `<div class="container">
			
			<div class="add-form">
				<h3>Форма ${isLoginMode ? 'входа' : 'регистрации'}</h3>
				${
					isLoginMode
						? ''
						: `<input
					id="name-input"
					type="text"
					class="add-form-name add-form-nameLogin"
					placeholder="Введите имя"
				/>`
				}
				<input
					id="login-input"
					type="text"
					class="add-form-name add-form-nameLogin"
					placeholder="Введите логин"
				/>
				<textarea
					id="password-input"
					type="password"
					class="add-form-text add-form-textLogin"
					placeholder="Введите пароль"
				></textarea>
				<div class="add-form-rowLogin">
					<button id="login-button" class="add-form-button">${
						isLoginMode ? 'Войти' : 'Зарегистрироваться'
					}</button>
					<button id="toggle-button" class="add-form-button-signUp">${
						isLoginMode ? 'Зарегистрироваться' : 'Войти'
					}</button>
				</div>
				
			</div>
		</div>`;

		appEl.innerHTML = appHTML;

		document.getElementById('login-button').addEventListener('click', () => {
			if (isLoginMode) {
				const login = document.getElementById('login-input').value;
				const password = document.getElementById('password-input').value;

				if (!login) {
					alert('Введите логин');
					return;
				}
				if (!password) {
					alert('Введите пароль');
					return;
				}

				loginUser({
					login: login,
					password: password,
				})
					.then(user => {
						setToken(`Bearer ${user.user.token}`);
						localStorage.setItem('setToken', `Bearer ${user.user.token}`);
						localStorage.setItem('setUser', user.user.name);
						getComments();
					})
					.catch(error => {
						alert(error.message);
					});
			} else {
				const login = document.getElementById('login-input').value;
				const name = document.getElementById('name-input').value;
				const password = document.getElementById('password-input').value;
				if (!name) {
					alert('Введите имя');
					return;
				}
				if (!login) {
					alert('Введите логин');
					return;
				}
				if (!password) {
					alert('Введите пароль');
					return;
				}

				registerUser({
					login: login,
					password: password,
					name: _.capitalize(name),
				})
					.then(user => {
						setToken(`Bearer ${user.user.token}`);
						localStorage.setItem('setToken', `Bearer ${user.user.token}`);
						localStorage.setItem('setUser', user.user.name);
						getComments();
					})
					.catch(error => {
						alert(error.message);
					});
			}
		});

		document.getElementById('toggle-button').addEventListener('click', () => {
			isLoginMode = !isLoginMode;
			renderForm();
		});
	};
	renderForm();
}
