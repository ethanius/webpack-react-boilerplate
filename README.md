# Webpack-React-Boilerplate

Pomocí tohohle lze velmi rychle rozjet projekt s Reactem. Použité nástroje:
* React 16.8
* Less
* Babel 7
  * do produkce se odstraňuje PropTypes
  * v devu je hot reload modul pro React
* ESLint
* Stylelint
* Browserslist
* PostCSS
  * Autoprefixer
  * CSS proměnné
* Webpack 4
  * Code splitting (otestováno s pomocí React.lazy a React.Suspension)
  * Minifikace a verzování assetů
  * hot reloading JS i CSS
  * analýza velikosti bundle
  * source mapy

## Instalace projektu

```sh
git clone git@github.com:ethanius/webpack-react-boilerplate.git projekt
cd projekt
npm install
```

## Spuštění pro vývoj

```sh
npm start
```
Následně vývojový web běží na http://localhost:8080/.

## Vytvoření produkční verze

```sh
npm run build-prod
```
V podadresáři `dist` je k nalezení sbírka assetů a index.html soubor. Je třeba to pak někam nahrát či zabalit do balíku po svém.

## Vytvoření vývojové verze (bez spuštění)

```sh
npm run build-dev
```

## Analýza

```sh
npm run analyze
```
Graf velikosti je pak vidět na http://127.0.0.1:8888/. Ukazuje to produkční bundle, protože sledovat velikost toho vývojového nedává smysl. Ten je prostě obrovský.
