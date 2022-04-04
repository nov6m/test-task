import { userCoupon } from "@/types/userCoupon"
import { KeysLocalStorage } from "@/types/keyLocalStorage"

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