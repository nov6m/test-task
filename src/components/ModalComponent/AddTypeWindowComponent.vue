<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-add">
                    <input type="text" v-model="newType">
                    <div class="modal-add_control">
                        <button :disabled="newTypeEmpty" @click="addType">Добавить</button>
                        <button @click="closeModal">Назад</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">//тут нужен фокус при открытии модалки 
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '../../store/models/queueModel'
import { updateTypeLocalStorage } from '../../services/updateLocalStorageState'

export default defineComponent({
    setup(props, { emit }) {
        const store = useStore(key);
        const newType = ref('');

        const typeList = computed(() => {
            return store.getters.TYPELIST;
        });
        const newTypeEmpty = computed(() => {
            return newType.value == '';
        });

        const closeModal = function() {
            emit('close');
        }

        const addType = function(): void {
            store.commit('addCouponType', {[newType.value]: 0});
            updateTypeLocalStorage(typeList.value);
            closeModal();
        }

        return {
            newType,
            newTypeEmpty,
            addType,
            closeModal
        }
    }
})
</script>