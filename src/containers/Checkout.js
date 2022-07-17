import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { CheckBricks } from '../components/CheckBricks';
import '../styles/components/Checkout.css';

const Checkout = () => {
  const { state } = useContext(AppContext);
  const { cart } = state;
  
  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) => accumulator + (currentValue.price_brick * currentValue.bricks_to_buy);
    const sum = cart.reduce(reducer, 0);
    return sum;
  }

  return (
    <div className="Checkout">
      <div className="Checkout-content">
        {cart.length > 0 ? <h3>Bricks list:</h3> : <h3>No bricks to buy yet...</h3>}
        {cart.length > 0 && cart.map(brick => (
          <CheckBricks key={brick.id_properties} brick={brick} />
        ))}
      </div>
      {cart.length > 0 && (
        <div className="Checkout-sidebar">
          <h3>{`Precio Total: $ ${handleSumTotal()}`}</h3>
          <Link to="/checkout/payment">
            <button type="button">Continuar pedido</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export { Checkout };