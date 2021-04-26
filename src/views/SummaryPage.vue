<template>
	<div class="stage">
		<!-- #1 -->
		<div class="frame">
			<!-- Карточка с информацией об услуге -->
			<div class="summary-card container">
				<div class="summary-card__image">
					<img
						class=""
						src="https://picsum.photos/620/400?random=101"
						width="620"
						height="400"
					/>
				</div>
				<div class="summary-card__details">
					<p class="summary-card__title">SPA-программа «Северное сияние»</p>
					<dl class="desc-list">
						<dt class="desc-text desc-text--secondary">Условие</dt>
						<dd class="desc-text">
							Массаж льдом 20 минут, холодная ванна 10 минут, морозильная камера
							45 минут
						</dd>
						<dt class="desc-text desc-text--secondary">Адрес</dt>
						<dd class="desc-text">г. Минск, ул. Зимняя, д. 136/2</dd>
						<dt class="desc-text desc-text--secondary">Дата</dt>
						<dd class="desc-text">10.01.2022</dd>
						<dt class="desc-text desc-text--secondary">Время</dt>
						<dd class="desc-text">13:00</dd>
					</dl>
				</div>
			</div>

			<hr />

			<!-- Форма "Отправить в подарок" -->
			<div class="asgift-form container">
				<div class="asgift-form__toggler-box">
					<div class="asgift-form__toggler">
						<label for="asgift-form-toggler">
							<svg
								class="asgift-form__icon"
								role="img"
								aria-hidden="true"
								width="50"
								height="50"
							>
								<use xlink:href="#icon-gift"></use>
							</svg>
						</label>
						<input
							class="input--primary-color"
							type="checkbox"
							id="asgift-form-toggler"
							v-model="isGift"
						/>
						<label for="asgift-form-toggler">Отправить в подарок</label>
					</div>
					<p class="asgift-form__desc desc-text">
						Ссылка с оформленым подарком, которую вы сможете передать удобным
						для вас путем
					</p>
				</div>

				<div v-if="isGift" class="asgift-form__container">
					<div class="asgift-form__main">
						<h2 class="form-title">Данные получателя</h2>
						<div class="asgift-form__form-container">
							<div class="form__row">
								<label class="form__input form__input--no-wrap">
									Имя получателя
									<input
										class="input"
										title="Введите имя получателя"
										type="text"
								/></label>
								<label class="form__input form__input--no-wrap">
									Email получателя
									<input
										title="Введите Email получателя"
										type="email"
										class="input"
								/></label>
							</div>

							<div class="form__row">
								<label class="form__input form__input--no-wrap">
									Дата получения
									<input
										class="input"
										title="Введите дату получения"
										type="date"
										style="padding-right: 10px"
								/></label>
								<label class="form__input form__input--no-wrap">
									Время получения
									<input
										title="Введите время получения"
										type="time"
										class="input"
										style="padding-right: 10px"
								/></label>
							</div>

							<div class="form__row">
								<label class="form__input form__input--no-wrap">
									Текст поздравления
									<textarea
										class="input"
										maxlength="500"
										style="padding: 10px; height: 100px"
									></textarea>
								</label>
							</div>
						</div>
					</div>

					<aside class="asgift-form__aside">
						<svg role="img" aria-hidden="true" width="70" height="90">
							<use xlink:href="#icon-card"></use>
						</svg>
						<p class="desc-text">
							Вы можете посмотреть пример подарка который придет. Ссылка на
							подарок придет на почту, но вы сможете после оплаты сохранить
							ссылку и отправить любым удобным для вас способом.
						</p>
						<a class="button button--primary" target="_blank" href="#"
							>Посмотреть пример</a
						>
					</aside>
				</div>
			</div>
		</div>

		<!-- #2 -->
		<div class="frame">
			<!-- Форма "Данные покупателя" -->
			<div class="container buyer-form">
				<h2 class="form-title">Данные покупателя</h2>
				<div class="buyer-form__form-container">
					<div class="form__row buyer-form__form-row--phone">
						<div class="form__input form__input--no-wrap">
							Подтвердите ваш номер телефона
							<div class="phone-input-wrapper">
								<phone-mask-input
									v-model="customer.phone"
									autoDetectCountry
									showFlag
									@onValidate="onPhoneMaskValidate"
									wrapperClass="input__wrapper"
									inputClass="input"
									flagClass="input__flag"
								/>
								<button
									@click="onCodeRequestButton"
									:disabled="customer.isCodeRequestButtonDisabled"
									class="button button--primary"
								>
									{{ customer.requestButtonTitle }}
								</button>
							</div>
						</div>

						<div class="form__desc">
							<p class="desc-text">
								На ваш телефон будет выслан код подтверждения. Будет создан
								аккаунт у нас в сервисе.
							</p>
						</div>
					</div>

					<div v-if="customer.isCodeRequested" class="form__row">
						<div class="form__input form__input--no-wrap">
							Введите код подтверждения из SMS
							<div class="code-input-wrapper">
								<input
									v-model="customer.code"
									class="input"
									title="Введите код подтверждения"
									type="text"
								/>
								<button class="button button--primary">Подтвердить</button>
							</div>
						</div>
						<div class="form__desc">
							<p class="desc-text">
								На ваш номер ({{ customer.phone }}) был выслан код
								подтверждения. Введите его в это поле.
							</p>
						</div>
					</div>

					<div class="form__row">
						<label class="form__input form__input--no-wrap">
							Ваше имя
							<input
								v-model="customer.name"
								class="input"
								title="Введите ваше имя"
								type="text"
						/></label>

						<div class="form__desc">
							<p class="desc-text">
								Если вы будете оформлять как подарок то придет от этого имени.
							</p>
						</div>
					</div>

					<div class="form__row">
						<label class="form__input form__input--no-wrap">
							Ваш e-mail
							<input
								v-model="customer.email"
								title="Введите ваш e-mail"
								type="email"
								class="input"
						/></label>

						<div class="form__desc desc-text">
							На данный e-mail придет письмо с подтверждением покупки.
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- #3 -->
		<div class="frame">
			<!-- Форма "Оплата" -->
			<div class="container">
				<h2 class="form-title">Оплата</h2>
				<div class="pay-form">
					<label class="radio-input pay-form__radio-input">
						<input
							class="input--primary-color"
							type="radio"
							name="item"
							value="cash"
						/>
						<svg role="img" aria-hidden="true" width="40" height="26">
							<use xlink:href="#icon-wallet"></use>
						</svg>
						<span>На месте</span>
					</label>

					<label class="radio-input pay-form__radio-input">
						<input
							class="input--primary-color"
							type="radio"
							name="item"
							value="card"
						/>
						<svg role="img" aria-hidden="true" width="40" height="22">
							<use xlink:href="#icon-credit-card"></use>
						</svg>
						<span>Картой</span>
					</label>
				</div>
			</div>

			<hr />

			<!-- Блок "Итого" -->
			<div class="container">
				<p class="form-title">Итого к оплате: 800$</p>
				<div class="submit-form">
					<button
						class="button button--primary button--big"
						:disabled="!isTermsAccepted"
						@click="onSubmit"
					>
						Оформить
					</button>

					<div class="submit-form__toggler">
						<input
							v-model="isTermsAccepted"
							class="input--primary-color"
							type="checkbox"
							id="terms-of-service"
						/>
						<label for="terms-of-service" class="white-space: nowrap;"
							>Согласен с условиями оказания услуг
							<a href="#" target="_blank" class="submit-form__terms-icon">
								<svg role="img" aria-hidden="true" width="10" height="16">
									<use xlink:href="#icon-external-link"></use></svg></a
						></label>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const TIMER = (options) => {
	options.onTick(options.value);
	return new Promise((resolve) => {
		let interval = setInterval(() => {
			options.onTick(--options.value);
			if (options.value === 0) {
				clearInterval(interval);
				resolve();
			}
		}, 1000);
	});
};

export default {
	data() {
		return {
			customer: {
				phone: "",
				code: "",
				name: "",
				email: "",
				requestButtonTitle: "Выслать код",
				isCodeRequestButtonDisabled: true,
				isCodeRequested: false,
			},
			isGift: false,
			isTermsAccepted: false,
		};
	},
	methods: {
		onCodeRequestButton() {
			this.customer.isCodeRequested = true;
			this.customer.isCodeRequestButtonDisabled = true;
			TIMER({
				value: 30,
				onTick: (value) => {
					this.customer.requestButtonTitle = `${value} сек`;
				},
			}).then(() => {
				this.customer.requestButtonTitle = "Выслать код";
				this.customer.isCodeRequestButtonDisabled = false;
			});
		},
		onPhoneMaskValidate(e) {
			this.customer.isCodeRequestButtonDisabled = !e.isValidByLibPhoneNumberJs;
			console.log("PHONEMASK >>", e);
		},
		onSubmit() {
			this.$router.push({ name: "success" });
		},
	},
};
</script>

<style lang="scss">
.frame {
	margin-bottom: 20px;
	border: 1px solid rgba(214, 214, 214, 1);
	border-radius: 10px;
	hr {
		margin: 0;
	}
}

.summary-card {
	display: grid;

	grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
	gap: 30px;
	@media screen and (max-width: 399px) {
		gap: 15px;
	}
	&__image {
		min-width: 230px;
		img {
			display: block;
			max-width: 100%;
			max-height: 200px;

			object-fit: contain;
			object-position: left;
		}
	}
	&__title {
		font-size: 16px;
		font-weight: 500;
		line-height: 20px;
	}
}

.desc-list {
	display: grid;

	grid-template-columns: max-content auto;
	row-gap: 10px;
}

.asgift-form {
	&__toggler-box {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		& > *:not(:last-child) {
			margin-right: 20px;
		}
	}
	&__icon {
		width: 50px;
		height: 50px;
		margin-right: 20px;
	}
	&__toggler {
		display: flex;
		align-items: center;
		flex: 0 0 0;
		input {
			margin-right: 10px;
			cursor: pointer;
			transform: scale(1.3) translate(-3%, -5%);
		}
		label {
			cursor: pointer;
			white-space: nowrap;
			color: var(--purple);
			@media screen and (max-width: 399px) {
				white-space: normal;
			}
		}
	}
	&__desc {
		flex: 1 0 200px;
	}

	&__container {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -15px;
		padding-top: 30px;
		> * {
			padding: 0 15px;
		}

		&::before {
			display: block;
			width: 100%;
			height: 1px;
			margin: 0 10px;
			content: "";
			background: #f4f4f4;
		}
	}

	&__main {
		flex: 1 0 250px;
	}

	&__form-container {
		margin: 0 -10px;
	}

	&__aside {
		display: flex;
		align-items: center;
		align-self: center;
		flex: 1 0 200px;
		flex-flow: column;
		justify-content: center;
		height: 100%;
		text-align: center;
		img {
			margin: 10px;
		}
		p {
			margin-bottom: 20px;
		}
	}
}

.buyer-form {
	&__form-container {
		margin: 0 -10px;
	}

	.phone-input-wrapper,
	.code-input-wrapper {
		display: flex;

		@media screen and (max-width: 499px) {
			flex-wrap: wrap;
		}

		margin-top: 7px;
		align-items: flex-end;

		input {
			margin-right: 10px;
		}

		button {
			margin-top: 7px;
			white-space: nowrap;
		}

		.input__wrapper {
			position: relative;
		}

		.input__flag {
			position: absolute !important;
			right: 17px !important;
			top: 10px !important;
			transform: scale(0.4);
		}

		button {
			border: solid 1px transparent;
			line-height: 25px;
			margin-bottom: 1px;
		}
	}
}

.pay-form {
	margin-top: 20px;
	&__radio-input {
		height: 50px;
		color: var(--dark-text);
		font-size: 12px;
		margin-right: 10px;
		img {
			padding: 10px;
			margin-right: 5px;
		}
	}
}

.submit-form {
	display: flex;
	align-items: center;
	margin-top: 20px;
	display: flex;
	& > *:not(:last-child) {
		margin-right: 20px;
	}

	&__toggler {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		input {
			cursor: pointer;

			margin-right: 10px;
			transform: scale(1.3) translate(-3%, -5%);
		}
		label {
			cursor: pointer;
			color: var(--purple);
		}
	}

	&__terms-icon {
		padding: 0 5px 0 3px;
		opacity: 0.6;
		transition: 0.3s ease;
		&:hover {
			opacity: 1;
		}
	}
}

// Общие классы
.container {
	padding: 30px;
	@media screen and (max-width: 399px) {
		padding: 15px;
	}
}

.desc-text {
	color: var(--dark-text);
	font-size: 12px;
	line-height: 17px;
	&--secondary {
		color: var(--grey-text);
	}
}

.form-title {
	margin-bottom: 5px;
	font-size: 18px;
	font-weight: 700;
}

.input--primary-color {
	filter: hue-rotate(35deg) saturate(0.7);
}
</style>