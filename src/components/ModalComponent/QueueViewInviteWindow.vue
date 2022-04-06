<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                 <p>Приглашается талон: {{queueList[0].couponCode.type}}{{queueList[0].couponCode.id}}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { key } from '../../store/models/QueueModel'
import { updateQueueLocalStorage } from '../../services/updateLocalStorageState'

export default defineComponent({
  emits: ['close'],
  setup (_, { emit }) {
    const store = useStore(key)

    const queueList = computed(() => store.getters.QUEUELIST)

    setTimeout(function () {
      store.commit('removeCoupon')
      updateQueueLocalStorage(queueList.value)
      emit('close')
    }, 5000)
    return {
      queueList
    }
  }
})
</script>
