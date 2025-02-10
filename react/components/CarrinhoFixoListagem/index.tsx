import React from "react";
//@ts-ignore
import { useOrderForm } from "vtex.order-manager/OrderForm"; 
//@ts-ignore
import styles from './style.css';
//@ts-ignore
import { OrderItems } from "vtex.order-items"

const CarrinhoFixoListagem: React.FC = () => {
    const { removeItem } = OrderItems.useOrderItems()
    const { orderForm } = useOrderForm(); 

    const items = orderForm?.items || [];
    const totalValue = orderForm?.value || 0;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price / 100);
    };

    function deleteItem(idProd) {
        removeItem({
            id: idProd,
            seller: "1",
            quantity: 1,
        })
    }

    return (
        <>
            {items.length > 0 && (
                <div className={styles.carrinho_fixo}>
                    <div className={styles.carrinho_fixo_container}>
                        <div>
                            <p className={styles.carrinho_fixo_titulo}>Produtos no carrinho</p>
                            <a href="/checkout/#/cart" className={styles.carrinho_fixo_btn}>Ver carrinho</a>
                        </div>
                        <ul className={styles.carrinho_fixo_itens}>
                            {items.slice(0, 2).map((item, index) => (
                                <li key={item.id} data-index={index}> 
                                    <a href={item.detailUrl} title={item.name}>
                                        <img 
                                            src={item.imageUrls?.at1x || "/default-image.jpg"} 
                                            alt={item.name} 
                                        />
                                    </a>
                                    <div className={styles.carrinho_fixo_itens_infos}>
                                        <a href={item.detailUrl} title={item.name} className={styles.carrinho_fixo_itens_infos_link}>
                                            <p className={styles.carrinho_fixo_itens_infos_name}>{item.name}</p>
                                        </a>
                                        <div className={styles.carrinho_fixo_itens_infos_box}>
                                            <p className={styles.carrinho_fixo_itens_infos_preco}>
                                                <b>{formatPrice(item.price)}</b> | Qt. {item.quantity}
                                            </p> 
                                            <button 
                                                onClick={() => deleteItem(item.id)} 
                                                className={styles.carrinho_fixo_itens_infos_deletar}>
                                                <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5694 4.47168H1" stroke="#C0BFBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.29785 8.61792V14.1462" stroke="#C0BFBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.2715 8.61792V14.1462" stroke="#C0BFBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.2447 4.47168V17.6015C14.2447 17.7847 14.1749 17.9605 14.0507 18.0901C13.9265 18.2197 13.7581 18.2925 13.5824 18.2925H2.98647C2.81083 18.2925 2.64238 18.2197 2.51819 18.0901C2.39399 17.9605 2.32422 17.7847 2.32422 17.6015V4.47168" stroke="#C0BFBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.5961 4.47168V3.0896C11.5961 2.72305 11.4566 2.37151 11.2082 2.11232C10.9598 1.85313 10.6229 1.70752 10.2716 1.70752H6.29813C5.94685 1.70752 5.60996 1.85313 5.36157 2.11232C5.11318 2.37151 4.97363 2.72305 4.97363 3.0896V4.47168" stroke="#C0BFBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                            </button> 
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {items.length > 2 && (
                                <li className={styles.carrinho_fixo_mais_produtos}>
                                    <span>+ {items.length - 2} produto{items.length - 2 > 1 ? "s" : ""}</span>
                                    <a href="/checkout/#/cart">Ver todos</a>
                                </li>
                            )}
                        </ul>
                        <div className={styles.carrinho_fixo_subtotal}>
                            <span>Subtotal: </span>
                            <strong>{formatPrice(totalValue)}</strong>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CarrinhoFixoListagem;
