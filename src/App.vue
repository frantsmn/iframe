<template>
  <div id="app" class="widget">
    <div class="widget__container">
      <header class="widget__header">
        <div class="widget__header-left">
          <!-- <button :class="[{ invisible: activePage === startPage }, 'button button--small']" @click="goBack">Назад</button> -->
          <button
            :disabled="activePage === startPage"
            class="button button--small button--i-arrow-left"
            @click="goBack"
          >
            Назад
          </button>
        </div>

        <!-- access root props via $root -->
        <h1 class="widget__header-center">{{ $root.value }}</h1>

        <div class="widget__header-right">
          <label class="label">
            <span>Язык:</span>
            <select
              class="select select--small select--borderless"
              name="language"
            >
              <option value="ru-RU">RU</option>
              <option value="en-GB">EN</option>
            </select>
          </label>
        </div>
      </header>

      <main class="widget__main">
        <router-view />
      </main>

      <footer class="widget__footer">
        <span class="widget__footer-copy">
          Powered by
          <a
            class="widget__footer-copy"
            href="https://biggid.com"
            target="_blank"
            >Biggid</a
          >
        </span>
      </footer>
    </div>

    <SVGSprite />
  </div>
</template>

<script>
import SVGSprite from "@/components/SVGSprite.vue";

export default {
  props: ["value"],
  components: {
    SVGSprite,
  },
  data() {
    return {
      startPage: "item-grid",
      activePage: null,
    };
  },
  beforeCreate() {
    this.$store.dispatch("fetchData")
    //   .then(() => {
    //     removePreloader();
    //   })
    //   .catch((error) => {
    //     console.error(`[App] beforeCreate() > [vuex] fetchData(), `, error);
    //     removePreloader();
	//     showErrorMessage();
    //   });
  },
  // async created() {
  // const settingsJson = document.querySelector('body').dataset.settings;
  // const settings = JSON.parse(settingsJson);
  // await this.$store.dispatch('setWidgetSettings', settings);
  // },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  // watch: {
  //   "$route.name"() {
  //     this.activePage = this.$route.name;
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.widget {
  height: 100vh;
  max-height: 100vh;
  min-height: 400px;
  padding: var(--main-indent);
  box-sizing: border-box;
  // background: var(--purple-gradient);

  &__container {
    background: #fff;
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    border-radius: 2px;
    overflow: hidden;
  }

  &__header {
    padding: 10px var(--main-indent);
    border-bottom: 1px solid var(--grey-light);
    background: #fff;
    display: flex;

    align-items: center;

    // &-left {
    // }

    &-center {
      font-size: 18px;
      flex-grow: 1;
      margin: 0 var(--main-indent);
      text-align: center;
    }

    // &-right {
    // }
  }
  &__main {
    flex-grow: 1;
    overflow-y: auto;

    .stage {
      display: flex;

      flex-flow: column nowrap;
      min-height: 100%;
      padding: var(--main-indent);
      justify-content: center;
    }
  }
  &__footer {
    background: var(--grey-lighter);
    text-align: center;
    padding: 10px;
    border-top: 1px solid var(--grey-light);

    &-copy {
      font-size: var(--fs-sm);
      color: rgba(0, 0, 0, 0.35);
      text-shadow: 1px 1px rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
