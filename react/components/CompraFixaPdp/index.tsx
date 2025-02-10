import React, { useState, useEffect, ReactNode } from 'react';
//@ts-ignore
import { useProduct } from "vtex.product-context";
//@ts-ignore
import styles from './style.css';

interface CompraFixaPdpProps {
    children: ReactNode;
}

export const CompraFixaPdp: React.FC<CompraFixaPdpProps> = ({ children }) => {
    const [showFixedBar, setShowFixedBar] = useState(false);
    const product = useProduct()?.product;
 
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };
 
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) { 
                setShowFixedBar(true); 
            } else {
                setShowFixedBar(false); 
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const listPrice = product?.items?.[0]?.sellers?.[0]?.commertialOffer.ListPrice;
    const spotPrice = product?.items?.[0]?.sellers?.[0]?.commertialOffer.spotPrice;

    const discountPercentage = listPrice && spotPrice
        ? Math.round(((1 - spotPrice / listPrice) * 100))
        : null;

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const hasRenderRouteStore = document.querySelector(".render-route-store-search-department") || document.querySelector(".render-route-store-product");
        
        if (hasRenderRouteStore) {
            document.body.classList.add("bar-active");
        } else {
            document.body.classList.remove("bar-active");
        } 
    }, []);
    return (
        <>
            {showFixedBar && (
                <div className={styles.compra_fixa_pdp}>
                    <div className={styles.compra_fixa_pdp_container}>
                        <img
                            src={product?.items?.[0]?.images?.[0]?.imageUrl}
                            alt={product?.productName}
                            className={styles.compra_fixa_pdp_img}
                        />
                        <div className="">
                            <h3 className={styles.compra_fixa_pdp_nome_produto}>{product?.productName}</h3>
                            <div className={styles.compra_fixa_pdp_precos}>
                                <s className={styles.compra_fixa_pdp_preco_antigo}>
                                    {listPrice ? formatPrice(listPrice) : ''}
                                </s>
                                <span className={styles.compra_fixa_pdp_preco}>
                                    <b>{spotPrice ? formatPrice(spotPrice) : ''}</b> no Pix
                                </span> 
                                {discountPercentage != 0 && (
                                    <div className={styles.compra_fixa_pdp_preco_off}>
                                        {discountPercentage}% OFF 
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="">
                            {children}
                            <p className={styles.compra_fixa_pdp_voltar_ao_topo} onClick={handleScrollToTop}>
                                Voltar ao topo
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CompraFixaPdp;
