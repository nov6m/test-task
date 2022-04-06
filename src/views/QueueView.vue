<template>
    <div class="container">
        <div>
            Талоны:
        </div>
        <div class="container_tile">
            <ul class="queuelist">
                <div v-if="queueList.length">
                    <li
                        v-for="user in queueList.slice(0,10)"
                        :key="user"
                        class="queuelist__item"
                    >
                        {{user.couponCode.type}}{{user.couponCode.id}} - {{getTimeFormat(user.time)}}
                    </li>
                </div>
                <div
                    v-else
                    class="message"
                >
                    {{message}}
                </div>
            </ul>
            <div>
                <div class="weather">
                    <div class="weather_city">
                        Погода в городе: {{weather.infoCity}}
                    </div>
                    <div class="weather_description">
                        {{weather.description}}
                    </div>
                    <div class="weather_temp">
                        {{weather.temperatureCelsium}}
                    </div>
                </div>
            </div>
        </div>
        <QueueViewInviteWindow
            v-if="showModal"
            @close="showModal = false"
        />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { key } from '../store/models/QueueModel'
import QueueViewInviteWindow from '../components/ModalComponent/QueueViewInviteWindow.vue'
import { getTimeFormat } from '../services/timeFormat'
import { format } from 'date-fns'
import WeatherApi from '../services/getWeather'
import { Weather } from '../types/Weater'
import { KeysLocalStorage } from '@/types/KeyLocalStorage'

export default defineComponent({
  components: {
    QueueViewInviteWindow
  },
  setup () {
    const store = useStore(key)
    const queueList = computed(() => store.getters.QUEUELIST)
    const message = 'На данный момент талонов нет'
    const showModal = ref(false)

    const weather = reactive<Weather>({
      city: localStorage.getItem(KeysLocalStorage.city),
      lat: 0,
      lon: 0,
      infoCity: 'Погода для данного города не найдена',
      temperatureCelsium: '',
      description: ''
    })
    const kelvinInCelsius = 272.1

    const idIntervalTime = setInterval(function () {
      if (queueList.value.length !== 0) {
        if (format(new Date(queueList.value[0].time), 'HH:mm:ss') === format(new Date(), 'HH:mm:ss')) {
          showModal.value = true
        }
      }
    }, 1000)

    const idIntervalWeather = ref(0)

    onMounted(async () => {
      if (weather.city !== null) {
        const locationInfo = await WeatherApi.getLocationInfo(weather.city)
        weather.infoCity = locationInfo.data[0].local_names.ru
        weather.lat = locationInfo.data[0].lat
        weather.lon = locationInfo.data[0].lon

        const weatherInfo = await WeatherApi.getWeather(weather.lat, weather.lon)
        weather.description = 'Description: ' + weatherInfo.data.weather[0].description
        weather.temperatureCelsium = 'Temp: ' + (weatherInfo.data.main.temp - kelvinInCelsius).toFixed(0) + '°C'

        idIntervalWeather.value = setInterval(async function () {
          const weatherInfo = await WeatherApi.getWeather(weather.lat, weather.lon)
          weather.description = 'Description: ' + weatherInfo.data.weather[0].description
          weather.temperatureCelsium = 'Temp: ' + (weatherInfo.data.main.temp - kelvinInCelsius).toFixed(0) + '°C'
        }, 20000)
      }
    })

    onUnmounted(() => {
      clearInterval(idIntervalTime)
      clearInterval(idIntervalWeather.value)
    })

    return {
      message,
      getTimeFormat,
      queueList,
      showModal,
      weather
    }
  }
})
</script>
