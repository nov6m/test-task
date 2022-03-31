<template>
  <main-container>
    <template v-slot:header>
      <Header/>
    </template>
    <main>
      <router-view/>
    </main>
  </main-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainContainer from './components/MainContainer.vue'
import Header from './components/HeaderComponent.vue'

export default defineComponent({
  components: {
    MainContainer,
    Header
  },
})
</script>
