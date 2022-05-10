import Mock from 'mockjs'
import table from './table/index'


Mock.mock('/table/getList', 'post', table.getList)
Mock.mock('/table/update', 'post', table.update)
Mock.mock('/table/delete', 'post', table.delete)
export default Mock

