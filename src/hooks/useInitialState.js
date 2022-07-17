import { useState } from "react";
import initialState from "../initialState";
import axios from "axios";

const useInitialState = () => {

    const [state, setState] = useState(initialState);

    const create_book = async (book) => {
        const API = 'http://127.0.0.1:8000/purchases/book';
        const body = {"id_property": book.id_properties, "total_bricks": book.new_bricks_to_buy }
        const response = await axios.post(API, body);
        return response.data
    }

    const create_purchase = async (purchase) => {
        const API = 'http://127.0.0.1:8000/purchases/new';
        const body = purchase
        const response = await axios.post(API, body);
        return response.data
    }

    const update_book = async (book) => {
        const API = 'http://127.0.0.1:8000/book/update';
        const body = {"id_property": book.id_properties, "total_bricks": book.bricks_to_buy, 'id_book_purchase': book.id_book_purchase }
        const response = await axios.put(API, body);
        return response.data
    }

    const delivery_book = async (id) => {
        const API = `http://127.0.0.1:8000/book/delivery/${id}`;
        const response = await axios.put(API);
        return response.data
    }

    const setProperties = payload => {
        setState({
            ...state,
			properties: payload
        });
    }

    const addToCart = async (payload) => {
        let book = null;
        if (state.cart.length){
            let exist = false;
            let brickExist = null;
            let brick = null;
            const cartList = [];

            for(let i = 0; i < state.cart.length; i++){
                brick = state.cart[i];
                if (payload.id_properties === brick.id_properties){
                    brick.bricks_to_buy = payload.new_bricks_to_buy +  brick.bricks_to_buy;
                    exist = true;
                    brickExist = brick;
                }
                cartList.push(brick);
            }

            //payload.bricks_to_buy = payload.new_bricks_to_buy;
            if (!exist) book = await create_book(payload);
            else book = await update_book(brickExist);
            if (book.success) {
                if (!exist) {
                    payload.id_book_purchase = book.data.id_book_purchase;
                    payload.bricks_to_buy = payload.new_bricks_to_buy;
                    cartList.push(payload)
                };
                setState({
                    ...state,
                    cart: [...cartList],
                    timer: true,
                    error: false,
                    mesage_error: '',
                });
            }else {
                setState({
                    ...state,
                    error: true,
                    mesage_error: [...book.errors]
                });
            }
            
        }
        else {
            payload.bricks_to_buy = payload.new_bricks_to_buy;
            book = await create_book(payload);
            if (book.success) {
                payload.id_book_purchase = book.data.id_book_purchase;
                    setState({
                        ...state,
                        cart: [...state.cart, payload],
                        timer: true,
                        error: false,
                        mesage_error: '',
                    });
                
            }
            else {
                setState({
                    ...state,
                    error: true,
                    mesage_error: [...book.errors]
                });
            }
        }
	};

	const removeFromCart = (payload) => {
        delivery_book(payload.id_book_purchase);
		setState({
			...state,
			cart: state.cart.filter(items => items.id_properties !== payload.id_properties),
		});
	}

    const setBrickToBuy = (payload) => {
        let deleteItem = null;
        let changeItem = null;
        let items = null;
        const cartList = [];
        for (let i = 0; i < state.cart.length; i ++){
            items = state.cart[i];
            if (items.id_properties === payload.id) {
                items.bricks_to_buy = parseInt(items.bricks_to_buy) + parseInt(payload.quantity)
                changeItem = items;
            }
            if(items.bricks_to_buy > 0) cartList.push(items);
            else deleteItem = items;
        }
        setState({
			...state,
			cart: [...cartList],
		});
        if (deleteItem) delivery_book(deleteItem.id_book_purchase);
        else update_book(changeItem);
    }

    const clearCart = (success = false, payload = null) => {
        let items = null;
        for (let i = 0; i < state.cart.length; i ++){
            items = state.cart[i];
            delivery_book(items.id_book_purchase);
        }
        if (success){
            setState({
                ...state,
                cart: [],
                timer: false,
                timerStarted: false,
                error: false,
                mesage_error: '',
                successPayment: true,
                paymentData: payload,
            })
        } else {
            setState({
                ...state,
                cart: [],
                timer: false,
                timerStarted: false,
            })
        }
    }

    const setTimerStarted = () => {
        setState({
            ...state,
            timerStarted: true,
        })
    }

    const clearError = () => {
        setState({
            ...state,
            error: false,
            mesage_error: '',
        })
    }

    const setError = (payload) => {
        setState({
            ...state,
            error: true,
            mesage_error: payload,
        })
    }
    
    return { 
        state, 
        setProperties,
        addToCart,
        removeFromCart,
        setBrickToBuy,
        clearCart,
        setTimerStarted,
        clearError,
        setError,
        create_purchase
    };
}

export { useInitialState };