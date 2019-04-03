import {
    ERROR, CANCEL_ERROR, GET_SUCCESS_NAME_PRODUCTS,
    GET_SUCCESS_NEW_PRODUCTS, GET_SUCCESS_REFER_PRODUCTS,
    GET_SUCCESS_STORE_PRODUCTS, GET_SUCCESS_DEFAULT_PRODUCTS,
    FINISHALL, START_GET_DATA, SEARCH_PRODUCT_NAME, ADD_TO_PRODUCT
} from '../actions/types';

const INITIAL = {
    defaultProducts: [],
    storeProducts: [],
    nameProducts: [],
    newProducts: [],
    searchProduct: [],
    referProducts: [],
    isLoading: false,
    err: false,
}

export default (state = INITIAL, action) => {
    switch (action.type) {
        case ERROR:
            return {
                ...state, isLoading: false, err: true
            }
        case CANCEL_ERROR:
            return {
                ...state, err: false
            }

        case GET_SUCCESS_STORE_PRODUCTS:
            return {
                ...state, storeProducts: action.storeProducts, err: false,
            }

        case GET_SUCCESS_NAME_PRODUCTS:
            return {
                ...state, nameProducts: action.nameProducts
            }

        case GET_SUCCESS_NEW_PRODUCTS:
            return {
                ...state, newProducts: action.newProducts
            }

        case GET_SUCCESS_REFER_PRODUCTS:
            return {
                ...state, referProducts: action.referProducts
            }
        case GET_SUCCESS_DEFAULT_PRODUCTS:
            return {
                ...state, defaultProducts: action.defaultProducts
            }
        case FINISHALL:
            return {
                ...state, isLoading: false
            }
        case START_GET_DATA: {
            return {
                ...state, isLoading: true
            }
        }
        case SEARCH_PRODUCT_NAME: {
            return {
                ...state, searchProduct: action.searchProduct
            }
        }
        case ADD_TO_PRODUCT: {
            let defaultProducts = state.defaultProducts
            let newProducts = state.newProducts
            let searchProduct = state.searchProduct;
            let storeProducts = state.storeProducts
            return {
                ...state, defaultProducts: defaultProducts.concat(action.newProduct),
                newProducts: [action.newProduct].concat(newProducts),
                searchProduct: searchProduct.concat([action.newProduct]),
                storeProducts: storeProducts.map((e) => {
                    if (e.uid === action.newProduct.uid) {
                        e.products.concat([action.newProduct])
                        return e

                    }
                    else return e
                })
            }
        }
        default:
            return state;
    }

};