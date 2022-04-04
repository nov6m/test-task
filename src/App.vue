<template>
  <div>
    <TheHeader/>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import TheHeader from './components/TheHeader.vue'
import { key } from './store/models/queueModel'
import { useStore } from 'vuex'
import { typeCoupon } from './types/typeCoupon'
import { userCoupon } from './types/userCoupon'
import { CouponCode } from './types/CouponCode'
import { add } from 'date-fns'
import { KeysLocalStorage } from './types/keyLocalStorage'

export default defineComponent({
  components: {
    TheHeader
  },
  setup() {
        const store = useStore(key);
        const timeToFirstUser: object = {
            seconds: 30
        };
        const timeToSecondUser: object = {
            minutes: 5,
            seconds: 30
        };
        const timeToThirdUser: object = {
            minutes: 10,
            seconds: 30
        };
        
        const generateData = function(): void {
            if (localStorage.getItem(KeysLocalStorage.couponType) === null || localStorage.getItem(KeysLocalStorage.couponType) === '{}') {
                const couponTypeGenerate: typeCoupon = {
                    'AB': 1,
                    'E': 1,
                    'D': 1
                };
                localStorage.setItem(KeysLocalStorage.couponType, JSON.stringify(couponTypeGenerate));
            }
            if (localStorage.getItem(KeysLocalStorage.queueList) === null || localStorage.getItem(KeysLocalStorage.queueList) === '[]') {
                const queueListGenerate: userCoupon[] = [
                    {
                        couponCode: { type: 'AB', id: 0 } as CouponCode, time: add(new Date(), timeToFirstUser)
                    },
                    {
                        couponCode: { type: 'E', id: 0 } as CouponCode, time: add(new Date(), timeToSecondUser)
                    },
                    {
                        couponCode: { type: 'D', id: 0 } as CouponCode, time: add(new Date(), timeToThirdUser)
                    }
                ];
                const lastTime: Date = queueListGenerate[queueListGenerate.length-1].time;
                store.commit('setTime', lastTime);
                localStorage.setItem(KeysLocalStorage.queueList, JSON.stringify(queueListGenerate));
            }
        };

        onMounted(() => {
            if (localStorage.getItem(KeysLocalStorage.couponType) === null || localStorage.getItem(KeysLocalStorage.couponType) === '[]' || 
                localStorage.getItem(KeysLocalStorage.queueList) === null || localStorage.getItem(KeysLocalStorage.queueList) === '[]') {
                generateData();
            }
            store.commit('getQueueFromStorage');
            store.commit('getTypeFromStorage');
        });
    }
})
</script>
