<template>
  <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                    <div>
                        Редактировать тип талона: 
                    </div>
                    <input type="text" placeholder="Название типа" v-model="inputType">
                    <button :disabled="!inputEmpty" @click="changeType">Редактировать тип</button>
                    <button @click="closeModal">Назад</button>
            </div>
        </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { key } from '../../store/models/queueModel'
import { useStore } from 'vuex'

 
export default defineComponent ({
    setup(props, { emit }) {
        const store = useStore(key);

        const typeList = computed(() => {
            return store.getters.TYPELIST;
        });
        const currentType = computed(() => {
            return store.getters.CURRENTTYPE
        });
        const inputType = ref(currentType.value);

        const inputEmpty = computed(() => {
            return inputType.value != '';
        });

        const closeModal = function() {
            emit('close');
        };

        const changeType = function(): void {
            store.commit('editCouponTypes', inputType.value);
            store.commit('resetCurrentType');
            closeModal();
        };

        return {
            inputType,
            inputEmpty,
            changeType,
            closeModal
        }
    }
})
</script>
