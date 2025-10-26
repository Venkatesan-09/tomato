import React, { useContext } from 'react'
import './Fooddisplay.css'
import { StoreContext } from '../../context/Storecontext'
import Fooditem from '../fooditem/Fooditem'

const Fooddisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext)

  // Filter food items based on category
  const filteredFoodList = foodList.filter(item => 
    category === 'All' || category === item.category
  )

  return (
    <div className='fooddisplay' id='fooddisplay'>
      <div className="fooddisplay-header">
        <h2>Top dishes near you</h2>
        {category !== 'All' && (
          <p className="fooddisplay-category-badge">{category} Category</p>
        )}
      </div>
      
      {filteredFoodList.length > 0 ? (
        <div className="fooddisplay-list">
          {filteredFoodList.map((item, index) => (
            <Fooditem 
              key={item._id || index} 
              id={item._id} 
              name={item.name} 
              description={item.description} 
              price={item.price} 
              image={item.image}
            />
          ))}
        </div>
      ) : (
        <div className="fooddisplay-empty">
          <p>No dishes found in {category} category.</p>
          <p>Please try another category or check back later!</p>
        </div>
      )}
      
      <div className="fooddisplay-count">
        Showing {filteredFoodList.length} dish{filteredFoodList.length !== 1 ? 'es' : ''}
        {category !== 'All' && ` in ${category}`}
      </div>
    </div>
  )
}

export default Fooddisplay