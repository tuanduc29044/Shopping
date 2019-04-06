
const INITIAL = {
    myProducts: [],
    isLoading: false,
    err: null,
    success: false,
}

export default (state = INITIAL, action) => {
    switch (action.type) {
        case 'START_ADD':
            return {
                ...state, isLoading: true, err: null, success: false,
            }
        case 'ADD_SUCCESS':
            return {
                ...state, isLoading: false, err: null, success: true, myProducts: state.myProducts.concat(action.product)
            }
        case 'ADD_ERR':
            return {
                ...state, isLoading: false, err: true, success: false,
            }
        case 'FINISH':
            return {
                ...state, err: null, success: false, isLoading: false
            }
        case 'GET_SUCCESS_DATA':
            return {
                ...state, isLoading: false, err: null, myProducts: action.myProducts
            }
        case 'UPDATE_PRODUCT':
            let myProducts = state.myProducts;
            return {
                ...state, myProducts: myProducts.map(i => {
                    if (i.key === action.product.key) {
                        i.productName = action.product.productName;
                        i.description = action.product.description;
                        i.price = action.product.price;
                        return i
                    }
                    else return i
                })
            }
        default:
            return state;
    }
}