## Visão Geral do Portfólio 
Este portfólio foi desenvolvido utilizando as seguintes tecnologias principais: 

*Frontend:
**React, TypeScript, Tailwind CSS

*Roteamento:
**React Router DOM
*Banco de Dados/Autenticação:
**Supabase
*Build Tool:
**Vite 

<br><br>
## Funcionalidades Principais
* * **Página Inicial (Home):
* ** * Efeito de texto "máquina de escrever" na seção principal.
* * Vídeo de fundo na seção hero. 
* Exibição dos projetos recentes buscados do Supabase em um carrossel interativo (navegação por botões e arrastar). 
* Seções dedicadas a listar Habilidades Técnicas e Habilidades Comportamentais. 

<br><br>
* **Página de Cases:
** * Busca e exibição de todos os casos cadastrados no Supabase. 
* Funcionalidade de filtro por categoria para organizar a visualização dos casos. 
* Navegação para a página de detalhes de cada projeto. 

<br><br>
* **Páginas Adicionais:
** * Páginas "Sobre", "Serviços" e "Contato" para apresentar informações relevantes. 

<br><br>
* **Área Administrativa:
** * Área restrita para administração de conteúdo, protegida por autenticação (PrivateRoute). 
* Funcionalidades para adicionar e editar casos (AddCase, EditCase). 

<br><br>
* **Componentes Reutilizáveis:
** * Componentes de navegação (Navbar) e rodapé (Footer) presentes em todo o site. 
* Componentes específicos para a área administrativa (Admin, Login, PrivateRoute). 

<br><br>
## Estrutura do Projeto 
* Utilização de componentes React para modularização. 
* Organização das páginas em `src/pages` e componentes em `src/components`. 
* Integração com Supabase para persistência de dados dos casos. 
* Configurações de deploy para Vercel (`vercel.json`, `_redirects`).

