import {compose, configureStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'

import { rootReducer} from './root-reducer'

const loggerMiddleware = (store) => (next) => {
    if(!action.type) {
        return next(action)
    }
    next(action)
}

const middleWares = [logger]

const composeEnhancers = compose(applyMiddleware(...middleWares))

export const store = configureStore(rootReducer, undefined, middleWares)