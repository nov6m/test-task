import { userCoupon } from "./userCoupon"
import { typeCoupon } from "./typeCoupon"

export interface State {
    typeList: typeCoupon,
    queueList: userCoupon[],
    time: Date,
    currentType: string
}