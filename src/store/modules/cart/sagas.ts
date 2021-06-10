import { AxiosResponse } from "axios"
import { all, call, put, select, takeLatest } from "redux-saga/effects"
import { api } from "../../../services/api"
import { IState } from "../rootReducer"
import { addProductToCartRequest, addProductToCartSuccess, addProductToCartFailure } from "./actions"
import { ActionTypes } from "./types"

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>

function* checkProductStock(action: CheckProductStockRequest) {
    
    const { product } = action.payload

    const currentQuantity: number = yield select((state: IState) => {
        return state.cart.items.find((item) => item.product.id === product.id)?.quantity ?? 0
    })

    const {
        data: availableStockResponse,
    }: AxiosResponse<{
        id: number
        quantity: number
    }> = yield call(api.get, `stock/${product.id}`)

    if (availableStockResponse.quantity > currentQuantity) {
        yield put(addProductToCartSuccess(product))
    } else {
        yield put(addProductToCartFailure(product.id))
    }
}

export default all([takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)])
