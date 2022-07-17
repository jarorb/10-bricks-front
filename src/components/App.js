import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './Layout'
import { Home } from '../containers/Home';
import { Checkout } from '../containers/Checkout';
import { Payment } from '../containers/Payment';
import { Success } from '../containers/Success';
import { NotFound } from '../containers/NotFound';
import { AppContext } from '../context/AppContext';
import { useInitialState } from '../hooks/useInitialState';
import { TermsAndConditions } from './TermsAndConditions';


const App = () => {
    const initialState = useInitialState();
    return(
        <AppContext.Provider value={initialState}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route exact path="/" element={<Home />}/>
                        <Route exact path="/checkout" element={<Checkout />} />
                        <Route exact path="/checkout/payment" element={<Payment />} />
                        <Route exact path="/checkout/success" element={<Success />} />
                        <Route exact path="/checkout/terms" element={<TermsAndConditions />} />
                        <Route path="*" element={< NotFound/>}/>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export { App };