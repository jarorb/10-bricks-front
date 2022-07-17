import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Property = ({ property }) => {

  const { state, addToCart, setError } = useContext(AppContext);
  const handleClick = property => {
    if(property['new_bricks_to_buy']) addToCart(property);
    else setError('Put a valid number');
	}
  let lastValidValue = '';
  const handleOnChange = (e) => {
    const isValid = e.target.validity.valid;
    if (isValid) {
      property['new_bricks_to_buy'] = parseInt(e.target.value);
      lastValidValue = parseInt(e.target.value);
    }
    else document.getElementById('brick-quantity').value = lastValidValue;
  }
  
  return (
    <div className="Property-item">
      <img src={property.image} alt={property.name} />
      <div className="Property-item-info">
        <h2>
          {property.name} {`(${property.type.toUpperCase()})`}
          <span>${' '}{property.price_brick}</span>
        </h2>
        <div className="Property-item-info-available">
          <h3>Available:</h3><h3 className='Property-item-info-available-h3'>{` ${property.available_bricks} `}</h3><h3>/ {property.total_bricks}</h3>
        </div>
        <h3>Risk Level: {property.risk_level}</h3>
        <label htmlFor="brick-quantity" required=""># Bricks </label>
        <input id="brick-quantity" name="brick-quantity" type="text" placeholder="288" pattern="[0-9]{0,13}" 
                onChange={handleOnChange}></input>
        <button type="button" onClick={() => handleClick(property)}>Comprar</button>
        <p>Status: {property.proyect_status} | Delevery stimated date: {property.delivery_estimated_date}</p>
        {state.error && <span>{state.mesage_error}</span>}
        
      </div>
    </div>
  );
}

export default React.memo(Property);