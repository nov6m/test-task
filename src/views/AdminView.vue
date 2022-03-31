<template>
    <div class="container">
        <div v-if="Object.keys(typeList).length">
            <div class="info_description">
                Список имеющихся талонов: 
            </div>
            <ul class="typelist">
                <li class="type_item" v-for="(count, name) in typeList" :key="name">
                    <div class="type_item_info">
                        {{name}}-{{count}}
                    </div>
                    <div class="type_item_control">
                        <button @click="editType(name)">Редактировать талон</button>
                        <button @click="deleteType(name)" >Удалить талон</button>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else class="message">
            {{message}}
        </div>
        <div class="control_add_delete">
            <button @click="showModalAdd = true">Добавить тип талона</button>
            <button @click="store.commit('clearQueue')">Очистить очередь</button>
        </div>
        <div class="weather_control">
            <div>
                Получать погоду из города:
            </div>
            <input type="text" placeholder="Например Orenburg..." v-model="inputCity"> <!--апи получает данные с английскими названиями городов-->
            <button :disabled="inputCityEmpty" @click="setCityLocalStorage(inputCity)">Сохранить</button>
        </div>
        <add-type-window-component v-if="showModalAdd" @close="showModalAdd = false"/>
        <edit-window-component v-if="showModalEdit" @close="showModalEdit = false"/>
    </div>
</template>


<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store/models/queueModel'
import { updateTypeLocalStorage, setCityLocalStorage } from '../services/updateLocalStorageState'
import AddTypeWindowComponent from '../components/ModalComponent/AddTypeWindowComponent.vue'
import EditWindowComponent from '../components/ModalComponent/EditWindowComponent.vue'


export default defineComponent({
    components: {
        AddTypeWindowComponent,
        EditWindowComponent
    },
    setup() {
        const store = useStore(key);
        const showModalAdd = ref(false);
        const showModalEdit = ref(false);
        const message = ref('Талоны отсутствуют');
        const inputCity = ref('');

        const typeList = computed(() => store.getters.TYPELIST);

        const inputCityEmpty = computed(() => {
            return inputCity.value == '';
        });

        const editType = function(type: string): void {
            showModalEdit.value = true;
            store.commit('setCurrentType',type);
        };

        const deleteType = function(type: string): void {
            store.commit('deleteCouponType',type);
            updateTypeLocalStorage(typeList.value);
        };  


        return {
            store,
            typeList,
            message,
            showModalAdd,
            showModalEdit,
            inputCity,
            editType,
            deleteType,
            inputCityEmpty,
            setCityLocalStorage
        }
    }
})
</script>