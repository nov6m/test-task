<template>   
    <div>
        <header>
            <slot name="header"></slot>
        </header>
        <main>
            <div>
                <slot></slot>
            </div>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>


<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { key } from '../store/models/queueModel'
import { useStore } from 'vuex'
import typeCoupon from '../types/typeCoupon'
import userCoupon from '../types/userCoupon'
import CouponCode from '../types/CouponCode'

export default defineComponent({
    setup() {
        const store = useStore(key);
        
        const generateData = function(): void {
            if (localStorage.getItem('couponType') == null || localStorage.getItem('couponType') == '{}') {
                const couponTypeGenerate: typeCoupon = {
                    'AB': 1,
                    'E': 1,
                    'D': 1
                };
                localStorage.setItem('couponType', JSON.stringify(couponTypeGenerate));
            }
            if (localStorage.getItem('queueList') == null || localStorage.getItem('queueList') == '[]') {
                const queueListGenerate: userCoupon[] = [
                    {
                        couponCode: { type: 'AB', id: 0 } as CouponCode, time: new Date(new Date().getTime() + 30000)
                    },
                    {
                        couponCode: { type: 'E', id: 0 } as CouponCode, time: new Date(new Date().getTime() + 5*60000+30000)
                    },
                    {
                        couponCode: { type: 'D', id: 0 } as CouponCode, time: new Date(new Date().getTime() + 10*60000+30000)
                    }
                ];
                const lastTime: Date = queueListGenerate[queueListGenerate.length-1].time;
                store.commit('setTime', lastTime);
                localStorage.setItem('queueList', JSON.stringify(queueListGenerate));
            }
        };

        onMounted(() => {
            if (localStorage.getItem('couponType') == null || localStorage.getItem('couponType') == '[]' || 
                localStorage.getItem('queueList') == null || localStorage.getItem('queueList') == '[]') {
                generateData();
            }
            store.commit('getQueueFromStorage');
            store.commit('getTypeFromStorage');
        });
    }
})
</script>
