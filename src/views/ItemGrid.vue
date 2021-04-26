<template>
  <div class="stage">
    <div class="item-grid">
      <Card
        v-for="service in this.$store.state.items.items"
        :key="service.id"
        :card="service"
      />
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Card from '@/components/Card'

export default {
  components: {
    Card
  },
  // computed: {
    // ...mapGetters({
      // servicesList: 'servicesList',
    // }),
  // },
  // mounted () {
    // this.$store.dispatch('fetchServices');
  // },
  // methods: {
    // async openBookForm (card) {
      // this.$router.push({ 
        // name: "book-form", 
        // params: { serviceId: card.id } 
      // });
    // },
  // },
};
</script>

<style lang="scss" scoped>
.item-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .card {
    margin: calc(var(--main-indent) / 2) calc(var(--main-indent) / 2)
      calc((var(--main-indent) / 2) + 10px);
  }
}
</style>
