import React, { useContext } from 'react'
import './exploreMenu.css'
import { menu_list } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {

    const { searchItem } = useContext(StoreContext);

  return (
    <div className=' explore-menu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p  className=' explore-menu-text'>Choose from a divere menu featuring a delectable array of dishes. Our goal is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <div className=' explore-menu-list'>
            {
                menu_list.map((item, index) => {    
                    return (
                        <div onClick={() => setCategory(prev => prev===item.menu_name ? "All": item.menu_name)} key={index} className=' explore-menu-list-item'>
                            <img className={category===item.menu_name ? "active":""} src={item.menu_image}/>
                            <p>{item.menu_name}</p>
                        </div>
                    )  
                })
            }
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu