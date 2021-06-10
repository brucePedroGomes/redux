import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProductToCartRequest } from "../store/modules/cart/actions"
import { IProduct } from "../store/modules/cart/types"
import { IState } from "../store/modules/rootReducer"

type Props = {
    product: IProduct
}

export const CatalogItem = ({ product }: Props) => {
    const dispatch = useDispatch()

    const handleAddProduct = useCallback(() => {
        dispatch(addProductToCartRequest(product))
    }, [product, dispatch])

    const hasFailedStockCheck = useSelector<IState, boolean>((state) =>
        state.cart.failedStockCheck.includes(product.id)
    )

    return (
        <article key={product.id}>
            <strong>{product.title}</strong>

            <span>{product.price}</span>

            <button type="button" onClick={handleAddProduct}>
                Comprar
            </button>

            {hasFailedStockCheck && <span style={{ color: "red" }}>Sem estoque</span>}
        </article>
    )
}
