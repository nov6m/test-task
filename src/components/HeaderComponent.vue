<template>
    <div class="container">
        <div class="navbar">
            <a href="/"><img width="50" height="50" class="logo" src="../assets/images/logo/queue.png" alt="logo"></a>
            <nav class="menu">
                <ul class="menu_list">
                    <li class="menu-link" v-for="(menuItem, index) in headerMenuList" :key="index">
                        <router-link class="nav-link active" aria-current="page" :to="menuItem.path">
                            {{menuItem.name}}
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import menuItem from '../types/menuItem'

export default defineComponent({
    setup() {
        const headerMenuList = ref<menuItem[]>([
            {
                name: 'Queue',
                path: '/'
            },
            {
                name: 'Record',
                path: 'record'
            },
            {
                name: 'Admin',
                path: 'admin'
            }
        ]);

        return { 
            headerMenuList 
        }
    }    
})
</script>