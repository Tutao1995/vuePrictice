export * from './src/popper'
import { withInstall } from '../utils/index'
import Popper from './src/popper.vue'

export const TtPopper = withInstall(Popper)

export default TtPopper