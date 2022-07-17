import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import '../styles/components/Success.css';

const Success = () => {
  const { state } = useContext(AppContext);
  const { paymentData } = state;
  if (paymentData.length){
    return (
      <div className="Success">
        <div className="Success-content">
          <h2>Thanks foy your purchase </h2>
          <h2>Purchase information: </h2>
          {paymentData.map(payment => (
              <h3 key={payment.id_purchase}> Id purchase: {payment.id_purchase} </h3>
          ))}
        </div>
      </div>
    );
  }
  else return(<h2>Not pruchases yet </h2>)
}

export { Success };