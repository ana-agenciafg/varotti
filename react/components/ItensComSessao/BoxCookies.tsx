import React, { useEffect } from 'react';
//@ts-ignore
import styles from "./styles/style.css";

const BoxCookies = () => {
  useEffect(() => {
    const ifAlreadyViewed = localStorage.getItem("alertCookiesAccepted");
    if (ifAlreadyViewed == null) {
      const boxCookies = document.querySelector("#box_cookies");
      if (boxCookies instanceof HTMLElement) {
        boxCookies.classList.add("visible");
      }
    }
  }, []);

  const handleCookiesClick = () => {
    localStorage.setItem("alertCookiesAccepted", "true");
    const boxCookies = document.querySelector("#box_cookies");
    if (boxCookies instanceof HTMLElement) {
      boxCookies.classList.remove("visible");
    }
  };

  return (
    <div id="box_cookies" className={styles.box_cookies} style={{ display: "none" }}>
      <p className={styles.box_cookies_txt}>Usamos cookies para oferecer uma melhor experiência de navegação, analisar o tráfego do site, personalizar o conteúdo e para redirecionamento da página, com base no nosso legítimo interesse. Para saber mais sobre os dados coletados pelos cookies acesse nossa <a href="/politica-de-privacidade" title="Política de Privacidade"> Política de Privacidade</a>. Ao continuar sua visita ao site, você concorda com o uso dos cookies.</p>
      <button className={styles.box_cookies_btn} onClick={handleCookiesClick}>CIENTE</button>
    </div>
  );
};

export default BoxCookies;
