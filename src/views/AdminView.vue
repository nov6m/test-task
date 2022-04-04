<template>
    <div class="container">
        <div v-if="Object.keys(typeList).length">
            <div class="info_description">
                Список имеющихся талонов: 
            </div>
            <ul class="typelist">
                <li 
                    v-for="(count, name) in typeList" 
                    :key="name"
                    class="type_item" 
                >
                    <div class="type_item_info">
                        {{name}}-{{count}}
                    </div>
                    <div class="type_item_control">
                        <button @click="editType(name)">Редактировать талон</button>
                        <button @click="deleteType(name)">Удалить талон</button>
                    </div>
                </li>
            </ul>
        </div>
        <div 
            v-else 
            class="message"
        >
            {{message}}
        </div>
        <div class="control_add_delete">
            <button @click="showModal.add = true">Добавить тип талона</button>
            <button @click="store.commit('clearQueue')">Очистить очередь</button>
        </div>
        <div class="weather_control">
            <div>
                Получать погоду из города:
            </div>
            <input 
                type="text" 
                placeholder="Например Orenburg..." 
                v-model="inputCity"
            > 
            <button 
                @click="setCityLocalStorage(inputCity)"
                :disabled="inputCityEmpty" 
            >Сохранить</button>
        </div>
        <AdminViewAddTypeWindow 
            v-if="showModal.add" 
            @close="showModal.add = false"
        />
        <AdminViewEditTypeWindow 
            v-if="showModal.edit" 
            @close="showModal.edit = false"
        />
    </div>
</template>


<script lang="ts">
import { computed, defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store/models/queueModel'
import { updateTypeLocalStorage, setCityLocalStorage, updateQueueLocalStorage } from '../services/updateLocalStorageState'
import AdminViewAddTypeWindow from '../components/ModalComponent/AdminViewAddTypeWindow.vue'
import AdminViewEditTypeWindow from '../components/ModalComponent/AdminViewEditTypeWindow.vue'
import { ShowModal } from '../types/ShowModal'


export default defineComponent({
    components: {
        AdminViewAddTypeWindow,
        AdminViewEditTypeWindow
    },
    setup() {
        const store = useStore(key);
        const showModal = reactive<ShowModal>({
            add: false,
            edit: false
        });
        const message: string = 'Талоны отсутствуют';
        const inputCity = ref('');

        const typeList = computed(() => store.getters.TYPELIST);
        const queueList = computed(() => store.getters.QUEUELIST);

        const inputCityEmpty = computed(() => {
            return inputCity.value == '';
        });

        const editType = function(type: string): void {
            showModal.edit = true;
            store.commit('setCurrentType',type);
        };

        const deleteType = function(type: string): void {
            store.commit('deleteCouponType',type);
            store.commit('deleteCouponFromQueue',type);
            updateTypeLocalStorage(typeList.value);
            updateQueueLocalStorage(queueList.value);
        };  


        return {
            showModal,
            store,
            typeList,
            message,
            inputCity,
            editType,
            deleteType,
            inputCityEmpty,
            setCityLocalStorage
        }
    }
})
</script>