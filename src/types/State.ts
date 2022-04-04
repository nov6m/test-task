import { userCoupon } from '@/types/UserCoupon'
import { typeCoupon } from '@/types/TypeCoupon'

export interface State {
    typeList: typeCoupon,
    queueList: userCoupon[],
    time: Date,
    currentType: string
}
