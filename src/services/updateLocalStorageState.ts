import { userCoupon } from "@/types/UserCoupon"
import { KeysLocalStorage } from "@/types/KeyLocalStorage"

function updateTypeLocalStorage(value: userCoupon):void {
    localStorage.setItem(KeysLocalStorage.couponType, JSON.stringify(value));
}

function updateQueueLocalStorage(value: userCoupon): void {
    localStorage.setItem(KeysLocalStorage.queueList, JSON.stringify(value));
}

function setCityLocalStorage(city: string): void {
    localStorage.setItem(KeysLocalStorage.city, city);
}

export {updateTypeLocalStorage, updateQueueLocalStorage, setCityLocalStorage}