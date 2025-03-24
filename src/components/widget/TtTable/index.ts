export * from './src/index'
import { withInstall } from '../utils'
import index from './src/index.vue'
export const TtTable = withInstall(index)

export default TtTable
