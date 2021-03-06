import { logger } from '../logger'

export default function dispatcherInit(ivm, dispatch) {
  releasables.push(dispatch)
  return {
    dispatch(name, ...args) {
      logger.debug("dispatching", name)

      return dispatch.apply(null, [name, ...args])
        .then(() => {
          logger.debug("successfully dispatched function", name)
        })
        .catch((err) => {
          logger.error("error dispatching bridge function", name, err)
        })
    }
  }
}