import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { postItem, retireveProducts, updateItem } from '../redux/productActions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const productSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z
    .number()
    .min(0, { message: "Price must be a positive number" })
    .max(10000, { message: "Price can't be more than 10,000" }),
  description: z.string().min(1, { message: "Description is required" }),
  category: z.enum(["men's clothing", "women's clothing", "jewelery", "electronics"], {
    errorMap: () => ({ message: "Category is required" }),
  }),
  image: z.string().url({ message: "Image URL must be a valid URL" }),
});

function ProductForm() {

  const navigate = useNavigate()
  const { pathname, state } = useLocation()
  const itemId = useParams()
  const [postError, setPostError] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retireveProducts())
  }, [dispatch])

  const products = useSelector(state => state.ProductReducer.products)

  const categories = Array.from(new Set(products.map(item => item.category)));


  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      title: state?.title || "",
      price: state?.price || "",
      description: state?.description || "",
      category: state?.category  || "",
      image: state?.image || ""


    },
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data) => {
    if(pathname.includes('edit'))
    {
      try{
        await updateItem(state.id, data)
        navigate('/')
        return
      }
      catch(error){
        setPostError('Could not post product')
        console.log(error)
        return
      }
    }
    try {
      await postItem({ id: Math.random(), ...data })
      navigate('/')
    }
    catch (err) {
      setPostError('Could not Post Item')
      console.log(err)
    }
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-lg mx-auto">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">Title</label>
        <input
          id="title"
          {...register('title')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium">Price</label>
        <input
          id="price"
          type="number"
          step="1"
          {...register('price', { valueAsNumber: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">Description</label>
        <textarea
          id="description"
          {...register('description')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium">Category</label>
        <select
          id="category"
          {...register('category')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >

          
          <option value="">Select Category</option>
          {categories.map((item=>(
            <option value={item}>{item}</option>

          )))}
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium">Image URL</label>
        <input
          id="image"
          type="url"
          {...register('image')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
      </div>

      <div>
        <button type="submit" disabled={isSubmitting} className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
      </div>
      {postError !== '' && <p className="text-red-500 text-sm">{postError}</p>}

    </form>
  );
}

export default ProductForm;
