<template>
	<div class="container">
		<div>
			<div class="inputs">
				<label>
					Компания
					<input v-model="company" type="text" placeholder="company" />
				</label>
				<label>
					Ширина
					<input
						v-model="width"
						type="number"
						min="320"
						max="800"
						placeholder="width"
					/>
				</label>
				<label>
					Высота
					<input
						v-model="height"
						type="number"
						min="400"
						max="800"
						placeholder="height"
					/>
				</label>
				<label>
					id контейнера для встраиваемого iframe
					<input v-model="elementId" type="text" placeholder="height" />
				</label>
				<label>
					Встраивание простым iframe
					<textarea v-model="rawIframe" cols="30" rows="5" readonly></textarea>
				</label>

				<label>
					Встраивание при помощи JS
					<textarea v-model="rawJs" cols="30" rows="20" readonly></textarea>
				</label>
			</div>
		</div>

		<div ref="iframe_container">
			<iframe
				:src="src"
				frameborder="0"
				:width="width"
				:height="height"
			></iframe>
		</div>
	</div>
</template>

<script>
export default {
	name: "HelloWorld",
	data() {
		return {
			company: "aezakmi",
			width: 400,
			height: 500,
			src: "http://verstka-front.biggid.com/widget/dist",
			elementId: "app",
			rawIframe: "",
			rawJs: "",
		};
	},
	watch: {
		$data: {
			handler: function (newData) {
				if (newData.company.length) {
					this.src = `http://verstka-front.biggid.com/widget/dist/?company=${newData.company}`;
				} else {
					this.src = `http://verstka-front.biggid.com/widget/dist`;
				}
				this.$nextTick(() => {
					this.setRawIframe();
					this.setRawJs();
				});
			},
			deep: true,
		},
	},
	mounted() {
		this.setRawIframe();
		this.setRawJs();
	},
	methods: {
		setRawIframe() {
			this.rawIframe = this.$refs.iframe_container.innerHTML;
		},
		setRawJs() {
			this.rawJs = `
        (function () {
          var container = document.getElementById("${this.elementId}");
          var iframe = document.createElement("iframe");
          if (typeof container != "undefined" && container != null) {
            iframe.setAttribute(
              "src",
              "${this.src}"
            );
            iframe.setAttribute("frameborder", 0);
            iframe.width = "${this.width}";
            iframe.height = "${this.height}";
            iframe.frameborder = "0";
            container.append(iframe);
          }
        })();`;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container {
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
}

.container > * {
	padding: 10px;
}

.inputs {
	width: 400px;
	display: flex;
	flex-flow: column;
	text-align: left;
}

label {
	display: flex;
	flex-flow: column;
	padding: 10px;
}

h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
