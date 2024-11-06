import axios from "axios"
import { ProductActions } from "./slices"


//custom thunk for retrieving items
export const retireveProducts =()=>{
    return async(dispatch) => {
        await axios.get('https://fakestoreapi.com/products')
        .then(resp => dispatch(ProductActions.setProducts(resp.data)))
        .catch(err=>{throw new Error("Error occured while retireving items")})
    }
}

export const postItem =async (item)=>{
    try{
        await axios.post('https://fakestoreapi.com/products', item)
        console.log('product added')
    }
    catch(err){
        throw new Error("Error occured while posting item")
    }
}

export const updateItem = async(id, item)=>{
    try{
        await axios.patch(`https://fakestoreapi.com/products/${id}`, item)
        console.log("Updaetd")
    }
    catch(err){
        throw new Error("Error occured while updating item")

    }
}