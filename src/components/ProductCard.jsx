import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ProductActions } from '../redux/slices'

function ProductCard({ id, title, price, description, category, image, rating }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const deleteHandler = (id) => {
        dispatch(ProductActions.deleteProduct(id))
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img className="w-full h-48 object-cover" src={image} alt={title} />

            <div className="px-6 py-4">
                <p className="text-xs text-gray-500">{category}</p>

                <div className="font-bold text-xl mb-2">{title}</div>

                <p className="text-gray-700 text-base font-semibold">${price}</p>

                <p className="text-gray-600 text-sm mt-2">{description}</p>
            </div>

            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-teal-500 text-white text-xs font-bold rounded-full px-3 py-1">
                    ⭐ {JSON.stringify(rating)}
                </span>
            </div>

            <button
                onClick={() => { navigate(`/edit/${id}`, { state: { id, title, price, description, category, image } }) }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md "
            >
                Edit
            </button>

            <button
                onClick={() => deleteHandler(id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
                Delete
            </button>

        </div>
    )
}

export default ProductCard
