# Informações do projeto

## Estrutura de Arquivos e Compilação de Estilos

- **Não altere diretamente o CSS**: Todos os arquivos de estilo devem ser modificados na pasta `/styles/sass`. Ao salvar, o Sass irá gerar automaticamente os arquivos CSS na pasta `/styles/css`.

- **Comando para compilar o Scss**: execute o comando abaixo para que o CSS seja gerado (caso esteja rodando pela primeira vez, execute o comando `yarn` antes):
  ```bash
  yarn gulp
  ```

## Font sizes, unidade de Medida
Fontes foram definidas em "rem". Lista de rem equivalente em px para facilitar:
  ```bash
font-size: 0.75rem; /* 12px */ 
font-size: 0.875rem; /* 14px */
font-size: 1rem; /* 16px */
font-size: 1.125rem; /* 18px */
font-size: 1.25rem; /* 20px */
font-size: 1.375rem; /* 22px */
font-size: 1.5rem; /* 24px */
font-size: 1.75rem; /* 28px */
font-size: 1.875rem; /* 30px */
font-size: 2rem; /* 32px */  
  ```
  
## Variáveis de Estilo (vars.scss)
Esse arquivo **(styles/sass/reset/vars.scss)** contém variáveis que podem ser utilizadas nos scss. Exemplos de uso:

```bash 
.flexCol--centermobile{
  background-color: $primaryColor;
  @include mobile{
    justify-content: center;
  }
  @include desktop{
    justify-content: start;
  }
}
``` 