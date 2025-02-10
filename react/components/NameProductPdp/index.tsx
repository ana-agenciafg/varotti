import React, { useState, useEffect } from "react";
//@ts-ignore
import { useProduct } from "vtex.product-context";
//@ts-ignore
import styles from "./style.css";

export const NameProductPdp = () => {
    const productContext = useProduct();
    const product = productContext?.product;
    const selectedItem = productContext?.selectedItem; 
    const [productName, setProductName] = useState("");
    
    useEffect(() => {
        if (product && selectedItem) { 
            const skuSpecifications = selectedItem?.variations || [];

            const skuSpec1 = skuSpecifications?.[0]?.values || "";
            const skuSpec2 = skuSpecifications?.[1]?.values || "";
 
            const newProductName = `${product.productName}${skuSpec1 ? ` - ${skuSpec1}` : ""}${skuSpec2 ? `, ${skuSpec2}` : ""}`;

            setProductName(newProductName);
        }
    }, [product, selectedItem]); 

    if (!product) {
        return null;
    }

    return <h1 className={styles.product_name_pdp}>{productName}</h1>;
};

export default NameProductPdp;
