import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CheckBricks = ({ brick }) => {

    const { removeFromCart, setBrickToBuy } = useContext(AppContext);

    const handleRemove = product => () => {
        removeFromCart(product);
    };
    const handleSetBrick = (id, quantity) => {
        setBrickToBuy({'id': id, 'quantity': quantity})
      }
      return (
        <div className="Checkout-item">
            <div className="Checkout-element">
                <h4>{brick.name}</h4>
                <i className="fas fa-minus" onClick={() => handleSetBrick(brick.id_properties, -1)}></i>
                {brick.bricks_to_buy}
                <i className="fas fa-plus" onClick={() => handleSetBrick(brick.id_properties, 1)}></i>

                <span>
                $
                {brick.price_brick}
                </span>
            </div>
            <button type="button" onClick={handleRemove(brick)}>
                <i className="fas fa-trash-alt" />
            </button>
        </div>
    );
}

export { CheckBricks };