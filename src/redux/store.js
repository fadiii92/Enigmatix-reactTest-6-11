import { configureStore } from '@reduxjs/toolkit'
import ProductSliceReducer from './slices'

const store = configureStore({
    reducer: {ProductReducer : ProductSliceReducer}
})

export default store
 