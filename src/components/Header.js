import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/components/Header.css'

const Header = () => {
  const { state, clearCart } = useContext(AppContext);
  const { cart } = state;
  console.log('RENDER HEADER', cart);
  let myTimer = null;
  let minutes = null;
  let seconds = null;
  let timer = false;

  const removeCart = () => {
    clearTimeout(myTimer);
    timer = false;
    clearCart();
  }

  const timerElement = document.getElementById('timer');
  const handleTimer = () => {
    if(cart.length > 0 && document.getElementById('timer')){
      if (timer === false) timer = 1200;
      if (state.timer) timer --;
      if (timer === 0) {
        removeCart()
        return true;
      }
      minutes = parseInt(timer / 60).toString()
      seconds = (timer % 60).toString();
      minutes = minutes < 10 ? '0'+minutes : minutes;
      seconds = seconds < 10 ? '0'+seconds : seconds;
      document.getElementById('timer').innerHTML = minutes+':'+seconds
    } 
  }
  const startFunction = () => {
    if(!timerElement) {
      myTimer = setInterval(handleTimer, 1000);
    }
  }
  if(state.timer && !state.timerStarted){
    startFunction();
  }
  
  return (
    <div className="Header">
      <Link to="/">
        <h1 className="Header-title">10 Bricks</h1>
      </Link> 
      {state.timer && cart.length > 0 && <h4 id='timer'></h4>}
      <div className="Header-checkout">
        <Link to="/checkout">
          <i className="fas fa-shopping-basket" />
        </Link>
        {cart.length > 0 && <div className="Header-alert">{cart.length}</div>}
      </div>
    </div>
  );
}

export { Header };