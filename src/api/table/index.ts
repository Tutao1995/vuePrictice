import http from '@/service/http'
import { getTableListApi } from './types'

const tableApi: getTableListApi = {
    getTableList(params) {
        return http.post('/table/getList', params)
    },
}
export default tableApi