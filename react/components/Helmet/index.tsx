import React from "react";
import { Helmet } from "vtex.render-runtime";

export const headCustom = () => {
    return (
        <Helmet>
            <meta name="google-site-verification" content="E1CrAjuHaEuf9u0ZR4VlHdJFK1FWXywjGAx6mzJGPBo" />
            <link rel="shortcut icon" href="/arquivos/varotti-favicon.ico?v=636821426257000000" />
            <script>
                {`
                    document.addEventListener('DOMContentLoaded', function() {
                        let footerButton = document.querySelector('.vtex-flex-layout-0-x-flexColChild--footer-fixo-mobile');
                        let menuIcon = document.querySelector('.vtex-store-drawer-0-x-openIconContainer--menu-header');

                        if (footerButton && menuIcon) {
                            footerButton.addEventListener('click', function() {
                                menuIcon.click();
                            });
                        } 
                    }); 
                `}
            </script>
        </Helmet>
    );
};
