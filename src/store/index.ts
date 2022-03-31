import { createStore } from 'vuex'
import { state, getters, mutations } from '@/store/models/queueModel'
import { State } from '@/types/State'

export const store = createStore<State>({
  state,
  getters,
  mutations,
  strict: true
})
