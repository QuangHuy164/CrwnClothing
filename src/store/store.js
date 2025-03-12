import {compose, configureStore, applyMiddleware} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/es/storage'
import thunk  from 'redux-thunk'
import logger from 'redux-logger'

import { rootReducer} from './root-reducer'




const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_ENV === 'development' && logger, thunk].filter(Boolean)

const composeEnhancers = compose(applyMiddleware(...middleWares))

export const store = configureStore(persistReducer, undefined, composeEnhancers)

export const persistor = persistStore(store)