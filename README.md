# Webpack

Webpack es un empaquetador para Javascript y sus amigos, es un empaquetador de módulos para aplicaciones modernas en JS. Para este curso se usa webpack-4.

Webpack es una tecnología que nos ayuda a empaquetar JavaScript y los assets de cualquier tipo para convertirlos en algo que el navegador pueda interpretar.

- **Developer Experience (Desarrollo)**

  - Escribir aplicaciones de manera eficiente
  - Tener código limpio
  - Aplicar tecnologías para resolver sus problemas
  - Tener un conjunto de reglas y convenciones
  - Entonrno de desarrollo optimizado en productividad

- **User Experience (Producción)**
  - Funcione
  - Sea rápida
  - Cumpla sus necesidades
  - Se actualice
  - Responda a tus interacciones
  - Producto de calidad

## Configurando un nuevo proyecto de Javascript

Para iniciar un proyecto usamos el comando **`npm init`**. Con el definimos el nombre del proyecto, versión, descripción, entre otras configuraciones. Con ello nos crea un archivo llamado **_package.json_**. Dentro de este archivo quedarán las dependencias, que son los módulos que requiere nuestra aplicación funcione.

Se divide en 2 dependencias

- Dependencias de desarrollo
- Dependencias

Para instalar las dependencias usamos el comando

- **`npm install webpack`** El nombre de _webpack_ indica el nombre de la dependencia. Se puede instalar la que requiera. Para que el `package.json` guarde la dependencia, se debe agregar el flag **--save**. Con esto se agregará la dependencia al proyecto.

- **`npm install webpack --save`**

- **`npm install webpack --save --save-exact`** Con ello se instala la versión exacta, es decir se usa la misma versión con la cual fué descargado la primera vez.

Las dependencias normales, las podemos llamar las **dependencias core**. Las dependencias de desarrollo nos permite configurar nuestro proyecto para enviarlo a producción.

- **`npm install webpack --save-dev --save-exact`** Con este comando instalamos las dependencias de desarrollo, indicandole **--save-dev**. Como webpack es una dependencia que nos permite configurar nuestro proyecto, lo instalamos como dependencia de desarrollo.

## Creando el primer bundle con Webpack

Desde webpack-4, se necesita un CLI (Command Line Interface), para ello debemos instalar la dependencia **webpack-cli** como dependencia de desarrollo.
Así que debemos instalar `webpack` y `webpack-cli`.

- **`npm install webpack-cli --save-dev`**

Cuando colocamos _npx webpack -v_ nos dice la versión de webpack que tenemos instalado. El comando **npx** nos muestra sólo las dependencias para ese proyecto en particular.

- **`npx webpack --entry ./index.js --output ./bundle.js`** Con eso le indicamos a webpack que nos traspile el código Javascript del index al de `bundle.js`

En el archivo `index.js` es el que vamos a trabajar en el desarrollo y el `bundle.js` es el archivo que se pondrá en producción que está optimizado.

:bulb: Desde webpack-4 podemos configurar los modos, para ello hay 2:

- development
- production

El modo de versión por defecto en webpack es _production_.

Para cambiar el modo podemos colocar

- **`npx webpack --entry ./index.js --output ./bundle.js --mode development`**

## Iniciando webpack.config.js

En el archivo [`webpack.config.js`](webpack.config.js) se definen las configuraciones para utilizar en webpack. Usaremos _**common js**_ para la configuracion en webpack y exportamos el **module.export** donde estará toda nuestra configuración.

En los scripts de [`package.json`](package.json) podemos configurar el comando de webpack para que se ejecute. Los comando en package.json se ejecutan usando **npm run [comando]**

Si ejecutamos ahora _`npm run build`_ el script ejecutará el comando de webpack.

## Cargando configuraciones por defecto y personalizadas

Podemos crear varias configuraciones separadas en carpetas con su propios comandos que nos permitirán personalizar el flujo de trabajo. Se pueden mezclar la configuración desde el archivo con los comandos en la CLI.

## Múltiples puntos de entrada

`filename: '[name].js'` **[name]** corresponde a los nombres que le hemos definido al objeto de entry en la configuración de webpack. Esto nos permite generar una salida por cada archivo. Para ello se configura el archivo [webpack.config.js](multi_entry_points/webpack.config.js)

Ahora configuramos el script en el `package.json` como

- `"build:multi": "webpack --config ./multi_entry/webpack.config.js"`

## Manejo de assets con Loaders

De manera nativa no se puede hacer un **import** de un archivo _css_ en un archivo _js_. En webpack, se puede hacer eso haciendo uso de **loaders**. Los loaders nos permiten interpretar otros tipos de archivos como los css para importarlos en javascript. Para ello, debemos instalar las respectivas dependencias y usar configurar el [webpack.config.js](css-style-loader/webpack.config.js)

Para eso debemos instalar el módulo de **css-loader**

- **`npm install css-loader --save-dev`**

Para inyectar el css, debemos instalar el _**style-loader**_

- **`npm install style-loader --save-dev`**

- **css loader** Sólo sirve para interpretar el archivo css
- **style loader** Inyecta el css al final

Para usar los archivos `css` en `js`, podemos importarlos usando la siguiente sintaxis como se muestra en [css-style-loader - index.js](css-style-loader/src/js/index.js)

```js
import "../css/index.css";
document.body.innerHTML = "<p>Hola mundo desde JS con css loader</p>";
```

## Introducción al uso de Plugins

Los pluggins van a extender el uso de los loaders.

Para instalar los pluggins, usamos:

- **`npm install mini-css-extract-plugin html-webpack-plugin --save-dev`**

Para instalar una dependencia con la versión en específico usamos:

- **`npm install mini-css-extract-plugin@0.7.0`**

Ahora esto nos genera un archivo aparte de CSS, de esta manera no se mezcla el código JavaScript con el de los estilos.

- **Configuración de `html-webpack-plugin`**

Para configurar el plugin en [webpack.config.js](plugins/webpack.config.js), debemos importarlo y agregarlo en la propiedad plugins

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
```

## Servidor de desarrollo

Con webpack podemos automatizar el proceso de compilado haciendo que los cambios se vean reflejados automáticamente en el navegador cuando se haga una modificación en el código.

Para ello agregamos el nuevo comando en el `package.json`

```js
"build:dev": "webpack --config ./webpack-dev-server/webpack.config.js"
```

Para que se compile cada vez que haya un cambio agregamos el flag **--watch** o **-w**

Para ello podemos usar el comando así como se muestra anteriormente y ejecutarlo directamente en la terminal como

- **`npm run build:dev -- -w`**

Con esto, cada vez que haya un cambio, de compilan de nuevo los archivos.

Para hacer cambios en el navegador usamos **webpack-dev-server**

- **npm install -D --save-exact webpack-dev-server** El flag `-D` es igual a tener `--save-dev`

Luego de tener esto, se modifica el `package.json` utilizando la nueva dependencia asi como se muestraa continuación

- **`"build:dev": "webpack-dev-server --config ./webpack-dev-server/webpack.config.js"`**

Ahora si ejecutamos

- **`npm run build:dev`** Automáticamente nos estará escuchando los cambios en los archivos y genera los cambios en el navegador al estar usando `webpack-dev-server`.

## Hot Module Replacement

Podemos mejorar la carga en el navegador para que en lugar de cada cambio se recargue la página, sólo cargue las partes que se han modificado.

Para hacer eso, debemos importar webpack en [webpack.config.js](webpack-dev-server/webpack.config.js), usarlo en la propiedad plugins y agregar otra propiedad llamada **devServer**

```js
const webpack = require("webpack");

devServer: {
  hot: true,
  open: true,
  port: 9000
},
plugins: [...new webpack.HotModuleReplacementPlugin()];
```

Con el atributo **open: true** le indicamos a webpack que abra automáticamente el tab en el navegador y con **port: 9000** le indicamos el puerto en el cual se va a realizar el cambio.

Como el style-loader es más rápido que generar el archivo de ccs, es recomendable usar **style-loader** para desarrollo y **MiniCSSExtractPluggin** para producción, de esta manera los cambios de generan más rápido.
