<template>
  <div class="stage">
    <form class="form">
      <header class="form__header">
        <p class="form__title">
          Расслабляющий релакс-массаж вулканическими камнями
        </p>
      </header>
      <div class="form__body">
        <!-- Модификация -->
        <div class="form__row">
          <div class="form__input">
            Вариант услуги
            <!-- <v-select
              :components="{OpenIndicator, Deselect}"
              :options="modificationsList"
              :value="selectedModification"
              :searchable="false"
              @input="selectModification"
              label="usageCondition"
              placeholder="Выберите вариант услуги"
              title="Выберите вариант оказываемой услуги"
              class="custom-select"
            /> -->
            <v-select
              :searchable="false"
              label="usageCondition"
              placeholder="Выберите вариант услуги"
              title="Выберите вариант оказываемой услуги"
              class="custom-select"
            />
          </div>
        </div>

        <!-- Место -->
        <div class="form__row">
          <div class="form__input">
            Место
            <!-- <v-select
              :components="{OpenIndicator, Deselect}"
              :options="addressesList"
              :value="selectedAddress"
              :searchable="false"
              @input="selectAddress"
              label="address"
              placeholder="Выберите место"
              title="Выберите место оказания услуги"
              class="custom-select"
            /> -->
            <v-select
              :searchable="false"
              label="address"
              placeholder="Выберите место"
              title="Выберите место оказания услуги"
              class="custom-select"
            />
          </div>
        </div>

        <!-- Сотрудники + Дата и время -->
        <div class="form__row">
          <div class="form__input">
            Сотрудник
            <!-- <v-select
              :components="{OpenIndicator, Deselect}"
              :options="personalList"
              :value="selectedPersonal"
              :searchable="false"
              @input="selectPersonal"
              label="name"
              placeholder="Выберите сотрудника"
              class="custom-select"
            >
              <template #selected-option="{ avatar, name }">
                <div class="vs__option">
                  <span class="persona-image">
                    <img v-if="avatar" :src="image" :alt="name" />
                  </span>
                  <span>{{ name }}</span>
                </div>
              </template>

              <template #option="{ avatar, name }">
                <div class="vs__option">
                  <span class="persona-image">
                    <img v-if="avatar" :src="avatar" :alt="name" />
                  </span>
                  <span>{{ name }}</span>
                </div>
              </template>
            </v-select> -->

            <v-select
              :searchable="false"
              label="name"
              placeholder="Выберите сотрудника"
              class="custom-select"
            >
              <template #selected-option="{ avatar, name }">
                <div class="vs__option">
                  <span class="persona-image">
                    <img v-if="avatar" :src="image" :alt="name" />
                  </span>
                  <span>{{ name }}</span>
                </div>
              </template>

              <template #option="{ avatar, name }">
                <div class="vs__option">
                  <span class="persona-image">
                    <img v-if="avatar" :src="avatar" :alt="name" />
                  </span>
                  <span>{{ name }}</span>
                </div>
              </template>
            </v-select>
          </div>
          <div class="form__input" @click="onEventPick">
            Дата и время
            <!-- <v-select
              @input="onEventPick"
              :components="{/*OpenIndicator, Deselect*/}"
              :options="$store.state.dateOptions"
              :searchable="false"
              placeholder="Выберите дату и время"
              title="Выберите дату и время сеанса"
              class="custom-select"
            ></v-select> -->

            <v-select
              @input="onEventPick"
              :components="{
                /*OpenIndicator, Deselect*/
              }"
              :searchable="false"
              :placeholder="datetimePlaceholder"
              title="Выберите дату и время сеанса"
              class="custom-select"
            ></v-select>
          </div>
        </div>

        <!-- Взрослых + Детей -->
        <div class="form__row">
          <label class="form__input form__input--no-wrap">
            Взрослых (19+)
            <input
              class="input"
              type="number"
              name="adults"
              min="1"
              max="1"
              title="Укажите количество взрослых человек"
              v-model="adultAmount"
            />
            <div class="form__input-swing-controls">
              <button @click.prevent="minusAdult" class="form__input-button">
                −
              </button>
              <button @click.prevent="plusAdult" class="form__input-button">
                +
              </button>
            </div>
          </label>

          <label class="form__input form__input--no-wrap">
            Детей (4+)
            <input
              class="input"
              type="number"
              name="kids"
              min="0"
              max="0"
              title="Укажите количество детей"
              v-model="childAmount"
              :disabled="
                this.$store.state.booking.pickedEvent &&
                !this.$store.state.booking.pickedEvent.price.child
              "
            />
            <div class="form__input-swing-controls">
              <button
                @click.prevent="minusChild"
                class="form__input-button"
                :disabled="
                  this.$store.state.booking.pickedEvent &&
                  !this.$store.state.booking.pickedEvent.price.child
                "
              >
                −
              </button>
              <button
                @click.prevent="plusChild"
                class="form__input-button"
                :disabled="
                  this.$store.state.booking.pickedEvent &&
                  !this.$store.state.booking.pickedEvent.price.child
                "
              >
                +
              </button>
            </div>
          </label>
        </div>
      </div>
      <footer class="form__footer">
        <div class="form__footer-left">
          <button
            v-on:click.prevent="submitForm"
            class="form__submit button button--big button--primary"
            type="button"
          >
            Забронировать
          </button>
        </div>
        <div
          v-if="this.$store.state.booking.pickedEvent"
          class="form__footer-right footer-sum"
        >
          <p class="footer-sum__line">
            <span>
              Взрослый
              {{ this.$store.state.booking.pickedEvent.price.adult }} руб. x
              {{ adultAmount }}:</span
            >
            <span>{{ adultSum }} руб.</span>
          </p>
          <p
            class="footer-sum__line"
            v-if="this.$store.state.booking.pickedEvent.price.child"
          >
            <span>
              Детей {{ this.$store.state.booking.pickedEvent.price.child }} руб.
              x {{ childAmount || 0 }}:</span
            >
            <span>{{ childSum || 0 }} руб.</span>
          </p>
          <p class="footer-sum__line footer-sum__total">
            <span> Итого:</span> <span>{{ totalSum }} руб.</span>
          </p>
        </div>
      </footer>
    </form>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";

// const OpenIndicator = {
//   render: (createElement) =>
//     createElement("div", { class: { "open-indicator": true } }),
// };

// const Deselect = {
//   render: (createElement) =>
//     createElement("div", { class: { "deselect-button": true } }),
// };

import moment from "moment";
moment.locale("ru");

export default {
  // computed: {
  // ...mapGetters({
  //   selectedService: "selectedService",
  //   modificationsList: "modificationsList",
  //   selectedModification: "selectedModification",
  //   addressesList: "addressesList",
  //   selectedAddress: "selectedAddress",
  //   personalList: "personalList",
  //   selectedPersonal: "selectedPersonal",
  // }),
  // },
  data() {
    return {
      adultAmount: 1,
      childAmount: 0,
    };
  },
  computed: {
    datetimePlaceholder() {
      if (this.$store.state.booking.pickedEvent) {
        return (
          moment(
            this.$store.state.booking.pickedEvent.time.timestamp_start
          ).format("D MMMM YYYY, HH:mm") +
          " - " +
          moment(
            this.$store.state.booking.pickedEvent.time.timestamp_end
          ).format("HH:mm")
        );
      }
      return "Выберите дату и время";
    },
    adultSum() {
      if (this.$store.state.booking.pickedEvent) {
        return (
          this.adultAmount * this.$store.state.booking.pickedEvent.price.adult
        );
      }
      return 0;
    },
    childSum() {
      if (
        this.$store.state.booking.pickedEvent &&
        this.$store.state.booking.pickedEvent.price.child
      ) {
        return (
          this.childAmount * this.$store.state.booking.pickedEvent.price.child
        );
      }
      return 0;
    },
    totalSum() {
      return this.adultSum + this.childSum;
    },
  },
  mounted: async function () {
    // const { serviceId } = this.$route.params;
    // await this.$store.dispatch('selectService', serviceId);
    // await this.$store.dispatch('fetchServiceСomponents');
  },
  methods: {
    // submitForm: function () {
    //   this.$store.dispatch("sumbitCompilationForm");
    // },
    // selectModification: function (modification) {
    //   this.$store.dispatch("selectModification", modification);
    // },
    // selectAddress: function (address) {
    //   this.$store.dispatch("selectAddress", address);
    // },
    // selectPersonal: function (personal) {
    //   this.$store.dispatch("selectPersonal", personal);
    // },
    submitForm() {
      this.$router.push({
        path: "/summary",
      });
    },
    onEventPick: function (result) {
      // if (result.code) {
      //   this.$router.push({
      //     name: "calendar",
      //     params: { id: this.selectedService.id }
      //   });
      // }

      this.$router.push({
        path: "./calendar",
        name: "calendar",
        params: { serviceId: /*this.selectedService.id*/ 42 },
      });
    },
    minusAdult() {
      this.adultAmount = this.adultAmount > 0 ? this.adultAmount - 1 : 0;
    },
    plusAdult() {
      this.adultAmount++;
    },
    minusChild() {
      this.childAmount = this.childAmount > 0 ? this.childAmount - 1 : 0;
    },
    plusChild() {
      this.childAmount++;
    },
  },
};
</script>

<style lang="scss">
//
// v-select
.custom-select {
  .vs__dropdown-toggle {
    min-height: 40px;
    color: var(--dark-text);
    border: 1px var(--grey-light) solid;
    border-radius: 3px;

    .vs__selected {
      min-height: 30px;
    }

    .vs__selected ~ input[type="search"] {
      position: absolute;
    }
  }

  .vs__dropdown-option {
    display: flex;
    align-items: center;
    min-height: 45px;
    padding: 5px 15px;
    white-space: normal;
  }

  .vs__dropdown-option--highlight {
    color: #000;
    background: var(--purple-light);
  }

  .vs__actions {
    margin-right: 5px;

    .deselect-button,
    .open-indicator {
      width: 10px;
      height: 9px;
      background-repeat: no-repeat;
      background-position: center;
    }

    .deselect-button {
      margin-right: 5px;
      background-image: url("data:image/svg+xml,%3Csvg width='9' height='9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 1.3L7.7 0 4.5 3.2 1.3 0 0 1.3l3.2 3.2L0 7.7 1.3 9l3.2-3.2L7.7 9 9 7.7 5.8 4.5 9 1.3z' fill='%23343434'/%3E%3C/svg%3E");
    }
    .open-indicator {
      background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M.3.3a1 1 0 000 1.4l4 4a1 1 0 001.4 0l4-4c.4-.4.4-1 0-1.4a1 1 0 00-1.4 0L5 3.6 1.7.3A1 1 0 00.3.3z' fill='%23343434'/%3E%3C/svg%3E");
    }
  }

  .vs__dropdown-menu {
    border-color: var(--grey-light);
  }

  .vs__option {
    display: flex;
    align-items: center;
    height: 28px;

    .persona-image {
      display: block;
      overflow: hidden;
      width: 25px;
      height: 25px;
      margin-right: 10px;
      border-radius: 50%;
      background-color: #f2f2f2;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='%23999'%3E%3Cpath d='M437 331a255 255 0 00-97.3-61 148 148 0 10-167.4 0A255 255 0 0075 331 254.3 254.3 0 000 512h40c0-119.1 96.9-216 216-216s216 96.9 216 216h40c0-68.4-26.6-132.7-75-181zm-181-75a108.1 108.1 0 010-216 108.1 108.1 0 010 216z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 16px;

      img {
        width: 25px;
        height: 25px;

        object-fit: cover;
      }
    }
  }
}
</style>