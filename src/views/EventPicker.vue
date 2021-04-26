<template>
  <div class="event-picker">
    <div class="event-picker__header">
      <p class="event-picker__title">
        Расслабляющий релакс-массаж вулканическими камнями
      </p>
      <p>
        90 минут массажа, 15 минут душ, 10 минут чаепитие, скидочный купон 5% на
        следующее посещение
      </p>
    </div>

    <div class="event-picker__main">
      <div class="event-picker__date">
        <p class="event-picker__title">Дата</p>

        <v-date-picker
          locale="ru"
          v-model="activeDate"
          :attributes="this.$store.getters['dates/attributes']"
          :available-dates="this.$store.getters['dates/availableDates']"
          :min-page="this.$store.getters['dates/minCalendarPage']"
          :max-page="this.$store.getters['dates/maxCalendarPage']"
          is-inline
          @input="onActiveDateChange"
        ></v-date-picker>
      </div>

      <div class="event-picker__time">
        <p class="event-picker__title">Время</p>

        <div class="event-picker__event-snippets">
          <EventList
            :events="events"
            :activeEvent="pickedEvent"
            @change="onActiveEventChange"
          ></EventList>
        </div>
      </div>
    </div>

    <div class="event-picker__footer">
      <button class="button button--primary" :disabled="!pickedEvent" @click="goBack">Продолжить</button
      >&nbsp;&nbsp;
      <button class="button" @click="goBack">Отмена</button>
    </div>
  </div>
</template>

<script>
import EventList from "../components/EventList";

export default {
  components: {
    EventList,
  },
  data() {
    return {
      events: null,
    };
  },
  beforeMount() {
    const { serviceId } = this.$route.params;
    // const actualDate = new Date();
    const actualDate = new Date(1617784149000); // Допустим на момент отрисовки компонента у нас 7 апреля 2021
    this.$store
      // Запрос дат...
      // После выполнения результат запроса будет храниться в => this.$store.state.dates.dates
      .dispatch("dates/fetchDates", {
        serviceId,
        // timestamp: Date.now(),
        timestamp: 1617784149000, // Допустим на момент отрисовки компонента у нас 7 апреля 2021
        day: actualDate.getDate(),
        month: actualDate.getMonth(),
        year: actualDate.getFullYear(),
      });
  },
  computed: {
    // Геттер/сеттер выбранного дня в календаре
    activeDate: {
      get() {
        return (
          // Возвращаем выбранный ранее день
          this.$store.state.booking.pickedDate ||
          // или ближайший доступный день c доступными событиями
          this.$store.getters["dates/nearestAvailableEventDate"] ||
          // или не выбираем в календаре ничего
          null
        );
      },
      set(pickedDate) {
        this.$store.commit("booking/applyDate", pickedDate);
      },
    },
    // Геттер/сеттер выбранного события
    pickedEvent: {
      get() {
        return this.$store.state.booking.pickedEvent;
      },
      set(pickedEvent) {
        this.$store.commit("booking/applyEvent", pickedEvent);
      },
    },
  },
  methods: {
    // При смене выбранной даты в календаре
    onActiveDateChange(date) {
      // получить события выбранного дня
      this.events = this.$store.getters["dates/eventsByDate"](date);
    },
    // При выборе события
    onActiveEventChange(event) {
      // сохранить выбранное событие во vuex (сработает через сеттер)
      this.pickedEvent = event;
    },

    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
.event-picker {
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  transition: opacity 0.15s ease;

  &__title {
    font-weight: 700;
    padding-bottom: 10px;
  }

  &__header {
    flex-basis: 10%;
    padding: 10px var(--main-indent);
    border-bottom: 1px solid var(--grey-light);
    p {
      margin: 0.5rem 0;
    }
  }

  &__main {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 20px 0 var(--main-indent) 0;
  }

  &__date,
  &__time {
    display: flex;
    align-items: center;
    flex-flow: column;
    flex-basis: 50%;
    flex-grow: 1;
  }

  &__date {
    .vc-container {
      padding: 0 var(--main-indent);
      margin-top: -10px;
      font-family: Roboto, sans-serif !important;

      --highlight-height: 26px !important;
    }
    .vc-bg-yellow-600 {
      background: var(--gold) !important;
      border-radius: 3px !important;
    }

    .vc-day-content {
      border-radius: 3px !important;
    }

    .vc-highlights + .vc-day-content {
      background: none !important;
    }

    .vc-header {
      margin-top: 0;
      margin-bottom: 10px;
    }

    .vc-title {
      font-weight: 400;
    }
  }

  // &__time {
  // }

  &__event-snippets {
    padding: 0 20px;
    width: 100%;
  }

  &__footer {
    flex-basis: 10%;
    padding: 10px var(--main-indent);
    border-top: 1px solid var(--grey-light);
  }
}
</style>
