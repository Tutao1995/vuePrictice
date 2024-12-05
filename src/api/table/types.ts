export interface getTableListParams {
    pageIndex: number
    pageSize: number
}
export interface getTableListApi {
    getTableList: (params: getTableListParams) => Promise<any>
}
