import { ComputedRef } from "vue";
import userCoupon from "@/types/userCoupon"

function updateTypeLocalStorage(value: ComputedRef<userCoupon>):void {
    localStorage.setItem('couponType', JSON.stringify(value));
}

function updateQueueLocalStorage(value: ComputedRef<userCoupon>): void {
    localStorage.setItem('queueList', JSON.stringify(value));
}

function setCityLocalStorage(city: string): void {
    localStorage.setItem('city', JSON.stringify(city));
}

export {updateTypeLocalStorage, updateQueueLocalStorage, setCityLocalStorage}