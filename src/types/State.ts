import userCoupon from "./userCoupon"
import typeCoupon from "./typeCoupon"

export type State = {
    typeList: typeCoupon,
    queueList: userCoupon[],
    time: Date,
    currentType: string
}