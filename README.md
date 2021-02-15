<p  align="center">
<a href="https://www.themoviedb.org/">
		<img  src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Tmdb-312x276-logo.png"  alt="Logo TMDB"  title="Logo TMDB" />
	</a>
</p>

<h4 align="center"> 🚩 TMDB ReactJs 🚩 </h4>

#

[![GitHub license](https://img.shields.io/github/license/matheusmhq/tmdb-react-js?style=plastic)](https://github.com/matheusmhq/tmdb-react-js/blob/main/LICENSE)

Um WebApp totalmente responsivo feito com [React](https://pt-br.reactjs.org/) consumindo a api pública do [TMDB](https://www.themoviedb.org/).

# Live

[TMDB ReactJs - Live ◀️](https://tmdb-movies.netlify.app/)

## Bibliotecas

As principais bibliotecas usadas nesse projeto:

| Bibliotecas             | Descrição   |
| :-------------:|--------------|
| [React](http://facebook.github.io/react/index.html) | Uma biblioteca JavaScript para criar interfaces de usuário. |
| [Bootstrap](https://react-bootstrap.github.io/) | A biblioteca de front-end mais popular reconstruída para React. |
| [Router Dom](https://reactrouter.com/) | O React Router Dom é uma lib completa para controle de rotas. |
| [Axios](https://github.com/axios/axios) | Cliente HTTP baseado em promessa para o navegador e node.js. |
| [Moment](https://momentjs.com/) | Uma biblioteca de datas JavaScript para analisar, validar, manipular e formatar datas. |
| [Loading Skeleton](https://www.npmjs.com/package/react-loading-skeleton) | Crie lindos esqueletos de carregamento animados que se adaptam automaticamente ao seu aplicativo. |
| [Select](https://react-select.com) | Um select flexível e bonito para ReactJS com multiselect, autocomplete, assíncrono e suporte criável. |
| [Circular Progressbar](https://momentjs.com/) | Um componente da barra de progresso circular, desenvolvido com SVG e amplamente personalizável. |

# Funcionalidades

- [Página Descubra (discover)](https://tmdb-movies.netlify.app/) - Lista **_filmes_** ou **_séries_** baseado nos filtro selecionados (Ano e Ordernar por).

- [Página Filmes/Séries (movie/tvs)](https://tmdb-movies.netlify.app/movies) - Lista **_filmes_** ou **_séries_** baseado no tipo selecionado (Populares ou Mais votados).

- [Página Pesquisa (search)](https://tmdb-movies.netlify.app/search/matrix) - Lista **_filmes_** ou **_séries_** baseado no texto digitado.

- [Página Detalhes (details)](https://tmdb-movies.netlify.app/details/movie/603) - Exibe informações detalhadas como **_data de lançamento_**, **_gêneros_**, **_tempo de duração_**, **_trailer_** etc... sobre o filme ou série escolhida, mostrando também informações sobre o **_elenco_** e **_recomendações_**.

- OBS: Todas as páginas que contém listagem estão **_páginadas_**.

# Iniciando

- Clonar esse repositório

  ```
  git clone https://github.com/matheusmhq/tmdb-react-js.git

  cd tmdb-react-js
  ```

- Instale as dependências

  ```
  yarn install ou npm install
  ```

- Pegue uma API KEY em [TMDB](https://www.themoviedb.org). Faça login usando sua conta e navegue até [TMDB Configurações da conta](https://www.themoviedb.org/settings/api). Copie a API KEY (v3 auth) e crie o seguinte arquivo **_.env.local_** na pasta raiz do projeto

- Cole isso no seu arquivo **_.env.local_** e salve

  ```
  REACT_APP_API_KEY=COLE_SUA_API_KEY_AQUI
  ```

- Agora é só rodar **yarn start** ou **npm start**

- Bons estudos pra você! 😀😀😀
