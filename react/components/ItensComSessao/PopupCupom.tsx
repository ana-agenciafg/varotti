import React, { useEffect } from 'react';
//@ts-ignore
import styles from "./styles/style.css";

const PopupCupom = () => {
  useEffect(() => {
    const ifAlreadyViewed = localStorage.getItem("ModalCupomClosed");
    if (ifAlreadyViewed == null) { 
      console.log('ooooooooo');
      const popupCupom = document.querySelector("#popupcupom"); 
      if (popupCupom instanceof HTMLElement) {
        console.log('visible');
        popupCupom.classList.add("visible");
      }
    }
  }, []);

  const handlePopUpCupomClosed = () => {
    localStorage.setItem("ModalCupomClosed", "true");
    const popupCupom = document.querySelector("#popupcupom");
    if (popupCupom instanceof HTMLElement) {
      popupCupom.classList.remove("visible");
    }
  };

  const handleCopyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const code = button.getAttribute("data-value");

    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        button.textContent = "Copiado";
      });
    }
  };

  return (
    <div id="popupcupom" className={styles.popupcupom} style={{ display: "none" }}>
      {/* Fecha o popup ao clicar na sombra */}
      <div className={styles.popupcupom_sombra} onClick={handlePopUpCupomClosed}></div>
      <div className={styles.popupcupom_conteudo}>
        {/* Botão de fechar */}
        <div className={styles.popupcupom_fechar} onClick={handlePopUpCupomClosed}>
          <img src="/arquivos/close-panda.png" alt="fechar modal" />
        </div>
        <div className={styles.popupcupom_img}>
          <img src="/arquivos/promo-panda.png" alt="" />
        </div>
        <div className={styles.popupcupom_txts}>
          <h3 className={styles.popupcupom_titulo}>GANHE <span>10% OFF</span></h3>
          <h4 className={styles.popupcupom_subtitulo}>NA SUA PRIMEIRA COMPRA</h4>
          <p className={styles.popupcupom_descricao}>Utilize o código de cupom abaixo <br /> para garantir o seu desconto!</p>
          <div className={styles.popupcupom_boxcupom}>
            <span className={styles.popupcupom_span}>PRIMEIRA10</span>
            <button
              className={styles.popupcupom_copiar}
              data-value="PRIMEIRA10"
              onClick={handleCopyClick}
            >
              Copiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupCupom;
