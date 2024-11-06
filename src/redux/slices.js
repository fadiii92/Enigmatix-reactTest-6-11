import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name: 'ProductsSlice',
    initialState: {products: []},
    reducers: {
        setProducts: (state,action) =>{
            state.products = action.payload
        },
        deleteProduct : (state, action)=>{
            state.products = state.products.filter(item=>item.id !== action.payload)
        }
        
    }
})

export const ProductActions =  ProductSlice.actions

export default ProductSlice.reducer
