<template>
  <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                    <div>
                        Редактировать тип талона: 
                    </div>
                    <input 
                        type="text" 
                        placeholder="Название типа" 
                        v-model="inputType"
                    >
                    <button 
                        @click="changeType"
                        :disabled="!inputTypeEmpty" 
                    >Редактировать тип</button>
                    <button @click="closeModal">Назад</button>
            </div>
        </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { key } from '../../store/models/QueueModel'
import { useStore } from 'vuex'

 
export default defineComponent ({
    setup(_, { emit }) {
        const store = useStore(key);
        
        const currentType = computed(() => {
            return store.getters.CURRENTTYPE
        });
        const inputType = ref(currentType.value);

        const inputTypeEmpty = computed(() => {
            return inputType.value !== '';
        });

        const closeModal = function() {
            emit('close');
        };

        const changeType = function(): void {
            if(currentType.value !== inputType.value) {
                store.commit('editCouponTypes', inputType.value);
                store.commit('resetCurrentType');
            }
            closeModal();
        };

        return {
            inputType,
            inputTypeEmpty,
            changeType,
            closeModal
        }
    }
})
</script>
