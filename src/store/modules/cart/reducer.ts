import { Reducer } from "redux"
import { ActionTypes, ICartState } from "./types"
import produce from "immer"

const INITIAL_STATE: ICartState = {
    items: [],
    failedStockCheck: [],
}

export const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.addProductToCartSuccess: {
            const { product } = action.payload

            return produce(state, (draft) => {
                const productIndex = draft.items.findIndex((item) => item.product.id === product.id)

                if (productIndex >= 0) {
                    draft.items[productIndex].quantity++
                } else {
                    draft.items.push({ product, quantity: 1 })
                }
            })
        }
        case ActionTypes.addProductToCartFailure: {
            return produce(state, (draft) => {
                draft.failedStockCheck.push(action.payload.productId)
            })
        }
        default: {
            return state
        }
    }
}
