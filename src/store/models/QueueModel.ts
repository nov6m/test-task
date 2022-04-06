import { State } from '@/types/State'
import { typeCoupon } from '@/types/TypeCoupon'
import { userCoupon } from '@/types/UserCoupon'
import { InjectionKey } from '@vue/runtime-core'
import { Store } from 'vuex'
import { KeysLocalStorage } from '@/types/KeyLocalStorage'

const state: State = {
  typeList: {},
  queueList: [],
  time: new Date(),
  currentType: ''
}

const getters = {
  TYPELIST: (state: State) => {
    return state.typeList
  },
  QUEUELIST: (state: State) => {
    return state.queueList
  },
  TIME: (state: State) => {
    return state.time
  },
  CURRENTTYPE: (state: State) => {
    return state.currentType
  }
}

const mutations = {
  addCouponType (state: State, payload: typeCoupon): void {
    state.typeList = { ...state.typeList, ...payload }
  },
  deleteCouponType (state: State, payload: string): void {
    delete state.typeList[payload]
  },
  deleteCouponFromQueue (state: State, payload: string): void {
    state.queueList = state.queueList.filter(el => el.couponCode.type !== payload)
  },
  addCoupon (state: State, payload: userCoupon): void {
    state.queueList.push(payload)
  },
  editCouponTypes (state: State, payload: string):void { // edit
    for (const property in state.typeList) {
      if (property === state.currentType) {
        state.typeList[payload] = state.typeList[property]
        delete state.typeList[property]
      }
    }
  },
  removeCoupon (state: State):void {
    state.queueList.shift()
  },
  resetCurrentType (state: State): void {
    state.currentType = ''
  },
  getQueueFromStorage (state: State): void {
    state.queueList = Object.assign(JSON.parse(localStorage.getItem(KeysLocalStorage.queueList) || '[]'))
  },
  getTypeFromStorage (state: State): void {
    state.typeList = Object.assign(JSON.parse(localStorage.getItem(KeysLocalStorage.couponType) || '[]'))
  },
  incrementTypeId (state: State, payload: string):void {
    state.typeList[payload]++
  },
  setTime (state: State, payload: Date):void {
    state.time = payload
  },
  setCurrentType (state: State, payload: string):void {
    state.currentType = payload
  },
  clearQueue (state: State): void {
    state.queueList = []
    for (const prop in state.typeList) {
      state.typeList[prop] = 0
    }
    localStorage.removeItem(KeysLocalStorage.queueList)
  }
}
export const key: InjectionKey<Store<State>> = Symbol('storage key')

export { state, getters, mutations }
