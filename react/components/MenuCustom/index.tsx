import React, { useState, useEffect } from "react";
// @ts-ignore
import styles from "./style.css";

type SubmenuLink = {
  text: string;
  url: string; 
  highlight?: boolean;
};

type MenuLink = {
  text: string;
  url: string; 
  submenuLinks?: SubmenuLink[];
  highlight?: boolean;
};

interface Props {
  menuLinks: MenuLink[];
}

export const MenuCustom = ({ menuLinks }: Props) => { 
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmenuToggle = (indexPath: string) => {
    setOpenSubmenus((prevOpenSubmenus) =>
      prevOpenSubmenus.includes(indexPath)
        ? prevOpenSubmenus.filter((path) => path !== indexPath)
        : [...prevOpenSubmenus, indexPath]
    );
  };

  const renderSubmenu = (
    submenuLinks: SubmenuLink[] | undefined, 
    parentIndexPath: string = "",
    parentUrl: string = "",
    parentName: string = ""
  ) => {
    if (!submenuLinks) return null;

    return (
      <ul className={`${styles.submenuWrapper} level-2`} data-itens={submenuLinks.length}>
        <li className={styles.submenuItem}>
          <a href={parentUrl} className={styles.vertudo}>
            Ver tudo em {parentName}
          </a>
        </li>
        {submenuLinks.map((submenuLink, subIndex) => {
          const currentPath = `${parentIndexPath}-${subIndex}`;

          return (
            <li key={currentPath} className={styles.submenuItem}>
              <a
                href={submenuLink.url}
                className={`${styles.menuLink} ${submenuLink.highlight ? "highlight" : ""}`}
              >
                {submenuLink.text}
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav className={styles.menuContainer} role="navigation" aria-label="Main Menu" style={{ display: "none" }}>
      <ul className={styles.wrapper}>
        {menuLinks.map((link, index) => {
          const indexPath = `${index}`;

          return (
            <li
              key={indexPath}
              className={`${styles.menuItem} level-1 ${link.submenuLinks ? "has-submenu" : "hasnot-submenu"}`}
              aria-haspopup={link.submenuLinks ? "true" : undefined}
              aria-expanded={openSubmenus.includes(indexPath) ? "true" : "false"}
            >
              {isMobile ? (
                <p
                  className={`${styles.menuLink} level-1 ${link.submenuLinks ? "has-submenu" : "hasnot-submenu"}`}
                  onClick={(e) => {
                    if (link.submenuLinks) {
                      e.preventDefault();
                      handleSubmenuToggle(indexPath);
                    } else {
                      window.location.href = link.url;
                    }
                  }}
                  aria-controls={`submenu-${indexPath}`}
                  aria-expanded={openSubmenus.includes(indexPath) ? "true" : "false"}
                >
                  {link.text}
                </p>
              ) : (
                <a
                  href={link.url}
                  className={`${styles.menuLink} ${link.highlight ? "highlight" : ""} level-1`}
                >
                  {link.text}
                </a>
              )}  
              {link.submenuLinks && link.submenuLinks.length > 0 &&(
                <div
                  id={`submenu-${indexPath}`}
                  className={`${styles.submenuContainer} ${link.submenuLinks.length < 10 ? "short-menu":"mega-menu"}`}
                  role="region"
                  aria-label={`${link.text} submenu`}
                  style={{
                    display: openSubmenus.includes(indexPath) ? "flex" : "none",
                  }}
                >
                  {renderSubmenu(link.submenuLinks, indexPath, link.url, link.text)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

MenuCustom.schema = {
  title: "Menu Customizado",
  description: "Um menu customizado com links dinâmicos",
  type: "object",
  properties: {
    menuLinks: {
      type: "array",
      title: "Links do Menu",
      items: {
        type: "object",
        properties: {
          __editorItemTitle: {
            type: "string",
            title: "Título no Editor",
          },
          text: {
            type: "string",
            title: "Texto do Link",
            default: "Link",
          },
          url: {
            type: "string",
            title: "URL do Link",
            default: "#",
          },
          highlight: {
            type: "boolean",
            title: "Item em destaque?",
            default: false,
          }, 
          submenuLinks: {
            type: "array",
            title: "Itens do Submenu",
            items: {
              type: "object",
              properties: {
                __editorItemTitle: {
                  type: "string",
                  title: "Título no Editor",
                },
                text: {
                  type: "string",
                  title: "Título da coluna",
                  default: "Submenu Link",
                },
                url: {
                  type: "string",
                  title: "URL do Link",
                  default: "#",
                }, 
              },
            },
          },
        },
      },
      minItems: 1,
      addItemText: "Adicionar novo link",
      deleteItemText: "Remover link",
    },
  },
};
