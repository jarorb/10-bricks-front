import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate} from 'react-router-dom';

import '../styles/components/Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const { state, create_purchase, clearCart, setError } = useContext(AppContext);
  const { cart } = state;
  let acepted = false;
  let sawTerms = false;
  let error = '';
  const data = [];
  const handleTerms = () => {
    acepted = !acepted;
  }
  const handleClick = async () => {
    let brick = null;
    let success = true;
    let purchase = null;
    if (sawTerms && acepted){
      for (let i = 0; i < cart.length; i++){
        brick = cart[i];
        const payload = {
            "id_properties": brick.id_properties,
            "id_user": 1,
            "id_authorization": 2,
            "id_book_purchase": brick.id_book_purchase,
            "total": brick.price_brick * brick.bricks_to_buy,
            "total_bricks": brick.bricks_to_buy,
        }
        purchase = await create_purchase(payload);
        if (!purchase.success) {
          error = purchase.errors[0];
          success = false;
        }else data.push(purchase.data);
      }
      if (success) {
        clearCart(true, data)
        navigate('/checkout/success')
      }
      else setError(error)
    }
  }
  
  
  const handleSeeTerms = () => {
    sawTerms = true;
    const accept_terms = document.getElementById('accept_terms');
    accept_terms.disabled = false
  }
  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Purchase resume:</h3>
        {cart.map((brick) => (
          <div className="Payment-item" key={brick.id_properties}>
            <div className="Payment-element">
              <h4>{brick.name}</h4><span>{'# Bricks: ' + brick.bricks_to_buy + ''}</span>
              <span>
                <h4>${' '}{brick.price_brick * brick.bricks_to_buy}</h4>    
              </span>
            </div>
          </div>
        ))}
        
        <div>
          <div>
            <a href="/checkout/terms" target="_blank" onClick={handleSeeTerms}>See our terms and conditions </a>
          </div>
          <label htmlFor="accept_terms"> Acept Terms and Conditions</label>
          <input type="checkbox" id="accept_terms"onChange={handleTerms} disabled></input>
        </div>
        <div className="Payment-button">
          <button type="button" onClick={handleClick}>Continue</button>
        </div>
      </div>
      <div />
    </div>
  );
}

export { Payment };