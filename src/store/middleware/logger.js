export const loggerMiddleware = (store) => (next) => {
    if(!action.type) {
        return next(action)
    }
    next(action)
}