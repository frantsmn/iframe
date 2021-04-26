<template>
  <div>
    <div class="event-snippet" v-for="event in events" :key="event.id">
      <label class="event-snippet__label">
        <input
          class="event-snippet__radio"
          type="radio"
          name="event"
          :value="event.id"
          :disabled="event.reserved"
          v-on:change="onChange(event)"
          v-model="active"
        />
        <span class="event-snippet__time"
          >{{ event.time.start }} - {{ event.time.end }}</span
        >
        <span class="event-snippet__price">
          <span v-if="event.price.adult_note">{{
            event.price.adult_note
          }}</span>
          <span v-if="event.price.child_note">{{
            event.price.child_note
          }}</span>
        </span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: ["events", "activeEvent"],

  data() {
    return {
      active: "",
    };
  },
  mounted() {
    this.active = this.activeEvent ? this.activeEvent.id : "";
  },
  methods: {
    onChange(event) {
      this.active = event.id;
      this.$emit("change", event);
    },
  },
};
</script>