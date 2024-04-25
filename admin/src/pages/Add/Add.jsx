import React, { useState } from 'react'
import './add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ url }) => {
  
  const [image, setimage] = useState(false);
  const [data, setData] = useState({
    name: "",
    desc: "",
    price: "",
    category: "Salad",
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]:value}))
  }

  const handleOnSubmit = async (event) =>{
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("desc", data.desc);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData)
    if (response.data.success){
      setData({
        name: "",
        desc: "",
        price: "",
        category: "Salad",
      })
      setimage(false);
      toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={handleOnSubmit}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setimage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={handleOnChange} value={data.name} type="text" name="name" placeholder='Type here' />
        </div>
        <div className="add-product-desc flex-col">
          <p>Product description</p>
          <textarea onChange={handleOnChange} value={data.desc} name="desc" rows="6" placeholder='Write here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={handleOnChange} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={handleOnChange} value={data.price} type="number" name='price' placeholder='$'/>
          </div>
        </div>
        <button type='submit' className='add-button'>Add</button>
      </form>
    </div>
  )
}

export default Add