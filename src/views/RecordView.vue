<template>
    <div class="container">
        <div v-if="Object.keys(typeList).length">
            <div class="info_description">
                Выбрать тип талона: 
            </div>
            <div class="record_type">
                <select v-model="selected">
                    <option v-for="(type, name) in typeList" :key="type" :value="name">{{name}}</option>
                </select>
                <button @click="addUserToQueue" :disabled="typeNotSelected">Записаться в очередь</button>
            </div>
            <div>
                <p v-if="selected !== ''">Количество людей в очереди: {{queueList.length}}</p>
            </div>
        </div>
        <div v-else class="message">
            {{message}}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref} from 'vue'
import { useStore } from 'vuex'
import { key } from '../store/models/queueModel'
import userCoupon from '../types/userCoupon'
import { updateQueueLocalStorage, updateTypeLocalStorage } from '../services/updateLocalStorageState'

export default defineComponent({
    setup() {
        const store = useStore(key);
        const typeList = computed(() => store.getters.TYPELIST);
        const queueList = computed(() => store.getters.QUEUELIST);
        const newCoupon = ref<userCoupon>({couponCode: {type: '', id: -1}, time: new Date()});
        
        const selected = ref('');
        const message: string = 'На данный момент запись невозможна';

        const typeNotSelected = computed(() => {
            return selected.value == '';
        });

        function addUserToQueue():void {
            const countType = ref(typeList.value[selected.value]);
            if (!queueList.value.length) {
                newCoupon.value = {couponCode: {type: '', id: -1}, time: new Date(new Date().getTime() + 30000)};
                store.commit('setTime', newCoupon.value.time);
            } else {
                newCoupon.value = {couponCode: {type: '', id: -1}, time: new Date(store.getters.TIME.getTime() + 5*60000)};
                store.commit('setTime', newCoupon.value.time);
            }
            newCoupon.value.couponCode.type = selected.value;
            newCoupon.value.couponCode.id = countType.value;
            store.commit('incrementTypeId', selected.value);
            store.commit('addCoupon', newCoupon.value);
            updateQueueLocalStorage(queueList.value);
            updateTypeLocalStorage(typeList.value);
            console.log(selected.value);
        }

        return {
            addUserToQueue,
            selected,
            typeList,
            queueList,
            message,
            typeNotSelected
        }
    }
})
</script>