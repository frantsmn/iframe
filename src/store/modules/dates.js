export default {
    namespaced: true,
    state: {
        dates: []
    },
    getters: {
        // Отфильтрованные объекты дней с доступными к бронированию событиями
        datesWithAvailableEvents: state => {
            // Фильтруем даты по принципу...
            return state.dates.filter((date) => {
                if (
                    // Если есть хоть одно событие
                    date.events.some((event) => {
                        return (
                            // Которое еще не зарезервировано
                            event.reserved === false &&
                            // и которое еще не прошло
                            // event.time.timestamp_start > Number(Date.now())
                            event.time.timestamp_start > Number(1617784149000) // Допустим на момент отрисовки компонента у нас 7 апреля 2021
                        );
                    })
                )
                    // то добавляем его в возвращаемый масив
                    return true;
            });
        },
        // Объект дня с ближайшими доступными к бронированию событиями
        nearestAvailableEventDate: (state, getters) => {
            if (getters.datesWithAvailableEvents[0] && getters.datesWithAvailableEvents[0].date)
                return new Date(getters.datesWithAvailableEvents[0].date);
            else return false;
        },
        // Доступные к выбору даты (для календаря)
        availableDates: (state, getters) => {
            return getters.datesWithAvailableEvents.map((date) => new Date(date.date));
        },
        // Даты с доступными к бронированию событиями (для календаря)
        attributes: state => {
            return [
                {
                    dot: "indigo",
                    dates: state.dates.map((date) => {
                        if (date.events.find((event) => !event.reserved))
                            return new Date(date.date);
                    }),
                },
            ];
        },
        // Минимальная страница для календаря
        minCalendarPage: state => {
            if (state.dates.length) {
                return {
                    month: new Date(state.dates[0].date).getMonth() + 1,
                    year: new Date(state.dates[0].date).getFullYear(),
                }
            } else return null;
        },
        // Максимальная страница для календаря
        maxCalendarPage: state => {
            if (state.dates.length) {
                return {
                    month:
                        new Date(state.dates[state.dates.length - 1].date).getMonth() + 1,
                    year: new Date(state.dates[state.dates.length - 1].date).getFullYear(),
                }
            } else return null;
        },
        // Получение событий определенного дня
        eventsByDate: state => activeDate => {
            const date = state.dates.find(
                (el) => +new Date(activeDate) === +new Date(el.date)
            );
            return date ? date.events : [];
        }
    },
    mutations: {
        applyDates(state, dates) {
            state.dates = dates;
            console.log('[vuex] Dates applied', state.dates);
        }
    },
    actions: {
        fetchDates({ commit, state }, { serviceId, timestamp, day, month, year }) {

            // Build URL
            const url = new URL(location.origin + "/data/widget/dates.json");
            url.searchParams.append('serviceId', serviceId);
            url.searchParams.append('timestamp', timestamp);
            url.searchParams.append('day', day);
            url.searchParams.append('month', month);
            url.searchParams.append('year', year);

            // Request
            return new Promise((resolve, reject) => {
                fetch(url)
                    .then(response => response.json())
                    .then(dates => {
                        console.log('[vuex] Dates loaded', dates);
                        commit('applyDates', dates);
                        resolve();
                    })
                    .catch(error => {
                        console.error('[vuex] action > "fetchDates", ', error);
                        reject(error);
                    })
            });
        }
    }
}
