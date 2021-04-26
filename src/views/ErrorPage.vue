<template>
	<div class="stage">
		<div style="text-align: center">
			<svg role="img" aria-hidden="true" width="60" height="60">
				<use xlink:href="#icon-error"></use>
			</svg>
			<h2>Упс! Произошла ошибка</h2>
			<p>Мы не смогли установить связь с сервером</p>
			<p>Такой страницы не существует</p>
			<p>Непредвиденная проблема с оформлением брони</p>
			<button @click="$router.back()" class="button button--i-arrow-left">
				Вернуться к предыдущему шагу
			</button>
		</div>
	</div>
</template>