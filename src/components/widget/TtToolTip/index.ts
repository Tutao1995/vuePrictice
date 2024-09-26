export * from './src/tooltip'
import { withInstall } from '../utils'
import Tooltip from './src/tooltip.vue'
export const TtTooltip = withInstall(Tooltip)

export default TtTooltip