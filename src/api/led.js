import httpRequest from '@/utils/httpRequest'
import {ServerConstant} from '@/constants/commonConstant'

export function getOnlineData() {
    return httpRequest.request({
        url: `/${ServerConstant.REPORT}/led/onlineStaffData`,
        method: 'get'
    })
}
