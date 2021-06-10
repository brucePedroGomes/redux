import { useSelector } from "react-redux"
import { ICartItem } from "../store/modules/cart/types"
import { IState } from "../store/modules/rootReducer"

export const Cart = () => {
    const cart = useSelector<IState, ICartItem[]>((state) => state.cart.items)

    return (
        <div>
            <h1>Cart</h1>
            {cart.map((item) => (
                <div key={item.product.id}>
                    <p >{item.product.title}</p>
                    <p>{item.quantity}</p>
                </div>
            ))}
        </div>
    )
}
