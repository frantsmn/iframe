<template>
  <div class="card">
    <router-link class="card__image-wrap" :to="`book/${card.id}`">
      <img
        v-if="card.img"
        class="card__image"
        :src="card.img"
        loading="lazy"
        width="620"
        height="400"
        :alt="card.title"
      />
    </router-link>
    <div class="card__info-wrap">
      <p class="card__title">
        <a class="card__title-link" :href="card.url" target="_blank">{{
          card.title
        }}</a>
      </p>

      <p class="card__price">{{ /*cardPriceString*/ card.price }}</p>

      <div v-if="card.badges && card.badges.length" class="card__badge-wrap">
        <CardBadge
          v-for="(badge, index) of card.badges"
          :key="index"
          :badge="badge"
        />
      </div>

      <div class="card__rating rating">
        <div class="rating__wrap">
          <div
            class="rating__stars"
            :style="'width: ' + card.rating.value + '%'"
          ></div>
        </div>
        <a class="rating__link" :href="card.url + '#reviews'" target="_blank">{{
          card.rating.text
        }}</a>
      </div>

      <div class="card__button-wrap">
        <router-link
          :to="`book/${card.id}`"
          class="button button--small button--primary"
        >
          Забронировать
        </router-link>

        <button class="button button--small button--i-gift">Подарить</button>
      </div>
    </div>
  </div>
</template>

<script>
import CardBadge from "@/components/CardBadge";

export default {
  components: {
    CardBadge,
  },
  props: ["card"],
  // computed: {
  // cardPriceString() {
  //   if (this.card.price.from === this.card.price.to) {
  //     return `${this.card.price.from} ${this.card.price.currency}`;
  //   } else {
  //     return `${this.card.price.from} - ${this.card.price.to} ${this.card.price.currency}`;
  //   }
  // }
  // },
};
</script>
