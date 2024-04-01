import React, { useContext } from 'react';
import './foodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { searchItem } = useContext(StoreContext);
    const { food_list } = useContext(StoreContext);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes</h2>
            <div className='food-display-list'>
                {food_list.map((item, index) => {
                    if (category === 'All' || category === item.category) {
                        if (!searchItem || item.name.toLowerCase().includes(searchItem.toLowerCase())) {
                            return (
                                <FoodItem
                                    key={index}
                                    id={item._id}
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    image={item.image}
                                />
                            );
                        }
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;