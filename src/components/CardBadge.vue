<template>
    <span
        :class="'badge ' + bageClasses"
    >{{badge.text}}</span>
</template>

<script>
const classesMap = {
  discount: "badge--gold badge--gloss",
  promo: "badge--red",
  new: "badge--green"
};

export default {
  props: ["badge"],
  computed: {
    bageClasses: function() {
        return classesMap[this.badge.type];
    },
  }
};
</script>

