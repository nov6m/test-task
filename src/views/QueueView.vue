<template>
    <div class="container">
        <div>
            Талоны:
        </div>
        <div class="container_tile">
            <ul class="queuelist">
                <div v-if="queueList.length">
                    <li class="queuelist__item" v-for="user in queueList.slice(0,10)" :key="user">
                        {{user.couponCode.type}}{{user.couponCode.id}} - {{getTimeFormat(user.time)}}
                    </li>
                </div>
                <div v-else class="message">
                    {{message}}
                </div>
            </ul>
            <div>
                <div class="weather">
                    <div class="weather_city">
                        Погода в городе: {{infoCity}}
                    </div>
                    <div class="weather_description"> 
                        {{weatherDesc}}
                    </div>
                    <div class="weather_temp">
                        {{weatherTemp}}
                    </div>
                </div>
            </div>
        </div>
        <invite-component v-if="showModal" @close="showModal = false"/>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from "@vue/runtime-core" 
import { useStore } from 'vuex'
import { key } from '../store/models/queueModel'
import InviteComponent from '../components/ModalComponent/InviteComponent.vue'
import { getTimeFormat } from '../services/timeFormat'
import axios from 'axios'




export default defineComponent ({
    components: {
        InviteComponent
    },
    setup() {
        const store = useStore(key);
        const queueList = computed(()=>store.getters.QUEUELIST);
        const message: string = 'На данный момент талонов нет';
        const showModal =  ref(false);
        const city = ref(localStorage.getItem('city'));
        const infoCity = ref('');
        const lat = ref(0);
        const lon = ref(0);
        const weatherDesc = ref('');
        const weatherTemp = ref('');

        const getCoordinateAxios = () => {
            axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=5&appid=e5f2ed177e27ea8fd94eeba4f028e98b`).
            then(response => {
                infoCity.value = response.data[0].local_names.ru;
                lat.value = response.data[0].lat;
                lon.value = response.data[0].lon;
            }).catch(e => {
                infoCity.value = 'Погода для данного города не найдена';
                weatherTemp.value = '';
                weatherDesc.value = '';
            });
        };

        const getWeatherAxios = () => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat.value}&lon=${lon.value}&appid=e5f2ed177e27ea8fd94eeba4f028e98b`).
            then(response => {
                if (infoCity.value != 'Погода для данного города не найдена') {
                    weatherDesc.value = 'Description: '+ response.data.weather[0].description;
                    weatherTemp.value = 'Temp: '+ (response.data.main.temp - 273.15).toFixed(0) + '°C';
                }
            });
        };

        const idIntervalTime = setInterval(function(){
            if(queueList.value.length != 0) {
                if(((new Date(queueList.value[0].time).getTime())/1000).toFixed(0) == (Date.now()/1000).toFixed(0)){
                showModal.value = true;
                }
            }
        },1000);

        const idIntervalWeather = ref(0);

        onMounted(() => {
            getCoordinateAxios();
            getWeatherAxios();
            idIntervalWeather.value = setInterval(function(){
            getCoordinateAxios();
            getWeatherAxios();
        }, 1000); //по какой то причине апи постоянно первым ответом присылает температуру 300 кельвин, поэтому поставил запрашивать каждую секунду, чтобы правильные данные отобразились
        });
        onUnmounted(() => {
            clearInterval(idIntervalTime);
            clearInterval(idIntervalWeather.value);
        });

        return {
            message,
            getTimeFormat,
            queueList,
            showModal,
            infoCity,
            weatherDesc,
            weatherTemp,
            city
        }
    },
})
</script>