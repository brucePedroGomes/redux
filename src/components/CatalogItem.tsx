import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { addProductToCart } from "../store/modules/cart/actions"
import { IProduct } from "../store/modules/cart/types"

type Props = {
    product: IProduct
}

export const CatalogItem = ({ product }: Props) => {
    const dispatch = useDispatch()

    const handleAddProduct = useCallback(() => {
        dispatch(addProductToCart(product))
    }, [product, dispatch])

    return (
        <article key={product.id}>
            <strong>{product.title}</strong>

            <span>{product.price}</span>

            <button type="button" onClick={handleAddProduct}>
                Comprar
            </button>
        </article>
    )
}
