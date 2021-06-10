import { useEffect, useState } from "react"

import { api } from "../services/api"

import { IProduct } from "../store/modules/cart/types"
import { CatalogItem } from "./CatalogItem"

export const Catalog = () => {
    const [catalog, setCatalog] = useState<IProduct[]>([])

    useEffect(() => {
        api.get("products").then((r) => setCatalog(r.data))
    }, [])

    return (
        <div>
            <h1> Catalog </h1>
            {catalog.map((product) => (
                <CatalogItem key={product.id} product={product} />
            ))}
        </div>
    )
}
