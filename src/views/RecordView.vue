<template>
    <div class="container">
        <div v-if="Object.keys(typeList).length">
            <div class="info_description">
                Выбрать тип талона:
            </div>
            <div class="record_type">
                <select v-model="selectedType">
                    <option
                        v-for="(type, name) in typeList"
                        :key="type"
                        :value="name"
                    >{{name}}</option>
                </select>
                <button
                    @click="addUserToQueue"
                    :disabled="typeNotSelected"
                >Записаться в очередь</button>
            </div>
            <div>
                <p v-if="selectedType !== ''">Количество людей в очереди: {{queueList.length}}</p>
            </div>
        </div>
        <div v-else class="message">
            {{message}}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store/models/QueueModel'
import { userCoupon } from '../types/UserCoupon'
import { updateQueueLocalStorage, updateTypeLocalStorage } from '../services/updateLocalStorageState'
import { add } from 'date-fns'

export default defineComponent({
  setup () {
    const store = useStore(key)
    const typeList = computed(() => store.getters.TYPELIST)
    const queueList = computed(() => store.getters.QUEUELIST)
    const newCoupon = ref<userCoupon>({ couponCode: { type: '', id: -1 }, time: new Date() })
    const timeNextUserInSecond: object = {
      seconds: 30
    }
    const timeNextUserInMinute: object = {
      minutes: 5
    }

    const selectedType = ref('')
    const message = 'На данный момент запись невозможна'

    const typeNotSelected = computed(() => {
      return selectedType.value === ''
    })

    function addUserToQueue ():void {
      const countType = typeList.value[selectedType.value]
      if (!queueList.value.length) {
        newCoupon.value = { couponCode: { type: '', id: -1 }, time: add(new Date(), timeNextUserInSecond) }
        store.commit('setTime', newCoupon.value.time)
      } else {
        newCoupon.value = { couponCode: { type: '', id: -1 }, time: add(store.getters.TIME, timeNextUserInMinute) }
        store.commit('setTime', newCoupon.value.time)
      }
      newCoupon.value.couponCode.type = selectedType.value
      newCoupon.value.couponCode.id = countType
      store.commit('incrementTypeId', selectedType.value)
      store.commit('addCoupon', newCoupon.value)
      updateQueueLocalStorage(queueList.value)
      updateTypeLocalStorage(typeList.value)
    }

    return {
      addUserToQueue,
      selectedType,
      typeList,
      queueList,
      message,
      typeNotSelected
    }
  }
})
</script>
