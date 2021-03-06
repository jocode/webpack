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

## 2. Trabajando con loaders y plugins

### Soporte de Javascript moderno

Javascript es un lenguaje moderno en evolución, siempre agregando nuevas funciones. El problema es que al ser interpretado en el navegador, no tenemos control sobre que versión de Javascript soportan y por lo tanto que funciones.

Para poder usar Javascript moderno y tener una buena Developer Experience sin afectar la User Experience, existe **Babel**. :bulb: Babel transpila nuestro código moderno de Javascript a una una versión que todos los navegadores pueden entender.

Babel será un nuevo **loader** que agregaremos al [`webpack.config.js`](babel/webpack.config.js) en la propiedad **rules**

Para configurar babel, creamos un archivo llamado `.babelrc` para escribir las configuraciones de nuestro proyecto.

Antes de esto, debemos decargar las dependencias necesarias para usar babel. Para usar babel no es necesario usar webpack, dson dos cosas diferentes.

- **`npm install --save-dev @babel/core babel-loader @babel/preset-env`**

Desde la versión 7 de babel con `@` se instalan todas las subdependencias de la misma.

**babel-loader** va a interpretar los archivos javascript y se los pasará a la dependencia **@babel/core** que es quien traspila el código. La configuración la lee del archivo [`.babelrc`](babel/.babelrc) que se usa con la dependencia **@babel/preset-env**

## Trabajando con Javascript moderno

En ES6 están disponibles las siguientes funcionalidades:

- async - await
- Arrow functions
- Template literals **``** para combiar texto normal con variables.

Para usar la **_función asíncrona_** se requiere un plugin extra en babel.
Para ello se debe instalar otras dependencias.

- **`npm install --save-dev @babel/plugin-transform-runtime`**
- **`npm install --save @babel/runtime`** Se recomienda instalar como dependencia core del sistema, por eso se quita el flag _-dev_.

Luego de eso, se debe agregar el plugin en [`.babelrc`](babel/.babelrc)

```js
plugins": [
  "@babel/plugin-transform-runtime"
],
```

Ese plugin va a tomar el core del runtime y va a dar soporte para los generadores de async-await.

- Se ha implementado babel
- Se han mostrado las diferencias en el código con babel y sin babel
- Se ha puesto características que algunos navegadores no interpretan

## Soporte de JSX (React)

**JSX** es un lenguaje de templates para React que permite definir componentes con un código muy similar al HTML.

:bulb: No existe navegador que entienda JSX porque no es un estándar, es algo especifico de React. Afortunadamente Babel puede transpilar el código JSX de nuestros archivos JS a código que el navegador.

`"presets": ["@babel/preset-env"]` da soporte a JS moderno pero no da soporte a react

Instalamos la dependencia

- **`npm install --save-dev @babel/preset-react`**

Como se va a usar **React** debemos instalar las depencias para esta biblioteca. Las dependencias las instalamos como core del proyecto (de produccipon)

- **`npm install --save react react-dom`**

Para usar react en webpack, debemos agregarle a la configuración al **HtmlWebpackPlugin** en [`webpack.config.js`](react/webpack.config.js) que tome el template por defecto con

```js
template: path.resolve(__dirname, "index.html");
```

## Trabajando con React

Desde la versión 4 de webpack, no se requiere de loader para cargar archivos json en componentes de react.

## Soporte imágenes, fuentes y vídeos

Para soportar la importación de archivos binarios en nuestro código Javascript cómo lo son: fuentes, imágenes y videos, podemos usar **url-loader**.

`url-loader` transforma archivos a un cadena de texto base64 para que carguen dentro de nuestros archivos Javascript y así ahorrarnos un request al servidor por cada archivo transformado.

Debemos tomar en cuenta que sólo nos conviene convertir archivos pequeños, ya que archivos muy grandes podrían hacer nuestro archivo bundle muy pesado. Es por esto que la opción **limit** del `url-loader`sirve para asignar el peso máximo que un archivo puede tener para ser transformado en base64.

No olvides instalar **file-loader** junto con **url-loader** ya que cuando se sobrepasa el limite establecido en la opción limit y el archivo no pueda ser transformado a base64, **url-loader** hará uso del **file-loader** para insertar un nombre y ruta de archivo en el lugar correspondiente.

Instalamos el url-loader

- **`npm install --save-dev url-loader`**
- **`npm install --save-dev file-loader`**

Agregamos la nueva tarea en el `package.json` y en el [`webpack.config.js`](url-loader/webpack.config.js) damos soporte a ese tipo de archivos en la propiedad rules de _modulos_

Si la imagen o el contenido es pequeño, es recomendable usar el loader para que haga esta tarea. De lo contrario, si es muy grande es mejor que la use como referencia.

> El elemento importado lo convierte en base-64

## Estilos con preprocesadores

Es una práctica común usar preprocesadores de CSS como: Sass, Less, Stylus y hasta PostCSS. Webpack permite integrar estos preprocesadores en su configuración a través de loaders, sólo ten cuidado con las **peerDependencies** que son dependencias que el loader espera estén instaladas previamente, como el caso de **stylus** para **stylus-loader**.

Instalamos las dependencias para estos loaders.

- **`npm install sass-loader stylus-loader less-loader postcss-loader --save-dev`**

Los loaders no van a ser suficientes para stylus, sass y less.

Las **perDependencies** indican que debes tener instalado previamente en el computador. Así que debemos instalarlas como:

- **`npm install stylus less node-sass --save-dev`**

Ahora se debe configurar los módulos en el [`webpack.config.js`](url-loader/webpack.config.js)

Los archivos de post son `.css`. Para ello debemos configurar para que primero cargue `postcss-loader` y luego ahí utilice `css-loader`. Luego se crea el archivo de configuración de [`postcss.config.js`](prepro/postcss.config.js) y se debe instalar la dependencia de **postcss-nested** que es la que se usará en este archivo de configuración.

- **`npm install --save-dev postcss-nested`**

## Conceptos Avanzados

### Evitar código duplicado

**Code splitting**

Es útil dividir nuestro código en diversos archivos y a veces enteros proyectos, pero no queremos cargar nuestra aplicación de más multiplicando el peso de alguna dependencia al utilizarla en diferentes partes de la aplicación, para eso utilizamos el módulo de optimización con _splitChunks_ en webpack.

**SplitChunksPlugin**

:bulb: _**Cada import es un Chunk**_

- `name: 'commons'` Es el código que se repite en todas las páginas
- `minSize; 0` Es el tamaño mínimo para poder ingresarlos al commons
- `chunks` A quien quiero que aplique (con `all` se aplica a todos ellos).

Éstas configuraciones las agregamos al [webpack.config.js](prevent-duplication/webpack.config.js)

_Para más información visitar [SplitChunksPlugin | Webpack](https://webpack.js.org/plugins/split-chunks-plugin/)_

Ahora se debe generar el problemade duplicación.

### Añadiendo un Dynamic Link Library

Mientras más librerías agregamos más lento se empiezan a volver nuestros builds, arruinando así la **Developer Experience**. Por suerte podemos crear una (o varias) Dynamic Link Library para acortar estos tiempos.

Una **Dynamic Link Library (DLL)** es un conjunto de librerías comunes que no cambian frecuentemente por lo que se hace un build por adelantado de las mismas para no re-empaquetar cada vez que hacemos build de nuestra aplicación.

Beneficiando tanto la **Developer Experience** como la **User Experience** ya que el caché del navegador va a mantener una copia que solo va a cambiar cuando nosotros agreguemos o quitemos alguna dependencia, ahorrando así valiosos requests al servidor.

> Con Dynamic Link Library podremos escoger la librerías repetidas para que lo compile sólo una vez.

Esto se hace para configuración de producción

Primero se configura el [webpack.dll.config.js](dll/webpack.dll.config.js) y luego el [webpack.config.js](dll/webpack.config.js), donde en el último se llama al archivo que genera el primero en formato json

```js
new webpack.DllReferencePlugin({
  manifest: require("./modules-manifest.json")
});
```

## Dynamic imports

Los módulos se cargan de manera dinámica y se carga sólo cuando el usuario lo requiera.

Para soportar los dynamic imports, debemos agregarle otro plugin a babel.

- **`npm install --save-dev @babel/plugin-syntax-dynamic-import`**

Instalamos la dependencia de desarrollo y la agregamos a la configuración de babel en [.babelrc](dynamic-imports/.babelrc)

Las configuración se realiza en (webpack.config.js)[dynamic-imports/webpack.config.js]

```js
publicPath: 'dist/',
chunkFilename: 'js/[id].[chunkhash].js'
```

Y en el archivo [`package.json`](package.json) se crean las tareas:

```js
"build:dynamic:dll": "webpack --config ./dynamic-imports/webpack.dll.config.js",
"build:dynamic": "webpack --config ./dynamic-imports/webpack.config.js"
```

## Practicando

En esta etapa se toman los conocimientos de webpack:

- Bases
- Avanzado
- Optimización
- Desarrollo
- Producción

Para la configuración de los proyectos

### Platzi Badges

Para este proyecto se creará las configuraciones por defecto en webpack. Se eliminan algunas dependencias para configurar lo mejor posible el proyecto.

El proceso consta de 2 partes

- Configurar el entorno local de desarrollo (Optimizado para nuestra productividad)
- Configurar el entorno producción (Enfocado a que la aplicación sea rápida)

El de producción es el dll y el de producción cuando se actualizan los módulos de desarrollo.

`webpack.dev.config.js`

### Configuración de desarrollo para Platzi Badges (React.js)

Dependencias instaladas en clase:

- `@babel/runtime` _Se requiere para las funciones asíncronas_

- `webpack`
- `webpack-cli`
- `webpack-dev-server` _Para el servidor de desarrollo_
- `css-loader` _Para cargar el css_
- `style-loader` _Inyectar el css en el html de manera dinámica_
- `file-loader` _Para carga de archivos_
- `babel-loader` _Para entender código moderno de JS_
- `@babel/core`
- `@babel/preset-env` _Configuración para ES6_
- `@babel/preset-react`
- `@babel/plugin-syntax-dynamic-import`
- `@babel/plugin-transform-runtime`
- `html–webpack-plugin`
- `@babel/plugin-proposal-class-properties`

Las dependencias a instalar son:

- **`npm install --save -S @babel/runtime`**

- **`npm install -D -E webpack webpack-cli webpack-dev-server css-loader style-loader file-loader babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/plugin-syntax-dynamic-import @babel/plugin-transform-runtime`**

- **`npm install -D -S html–webpack-plugin`**

- **`npm install -D -S @babel/plugin-proposal-class-properties`**

**`-S`** es una abreviación de –save que sirve para guardarlo en dependencias del proyecto.

**`-E`** es una abreviación de `–save-extact` que sirve para guardar exactamente la versión que quieres, y que cuando alguien más descargue tu proyecto, tenga la misma versión que tú.

Se quita del `webpack.dev.config.js` MiniCssExtractPlugin para evitar extraer el CSS para vez que vaya a guardar algo

El **file-loader** genera un enlace a diferencia del **url-loader** que genera un string en base64

> El DLL es sólo para producción

**npm-run-all** te permite correr varias tareas entonces lo volví a instalar. En `package.json` puse en devDependecies.

```js
"npm-run-all": "4.1.5"
```

Se ejecuta con `npm install`
Ya instalada, agregé una tarea que corriera varios comandos:
escribiendo `npm run dev` estoy corriendo tanto `build:dev`como server

- **`"dev": "npm-run-all -p build:dev server"`**

### Configuración básica de producción para Platzi Badges (React.js)

La configuración para producción se utiliza para optimizar y que el cliente descargue código con menos peso y más optimizado.

Instalamos las dependencias

- **`npm install -S -D mini-css-extract-plugin url-loader`**

Luego que se haga la configuración respectiva en el archivo `webpack.dll.config.js` y en el `webpack.config.js` y se creen las tareas en el `package.json` procedemos a ejecutar las tareas:

- **`npm run build:dll`**
- **`npm run build`**

### Configuración óptima de producción para Platzi Badges (React.js)

El módulo del dll debe quedar enlazado con el módulo que exporta html, porque no está leyendo en dll. Para solucionar esto, debemos instalar la dependencia _add-asset-html-webpack-plugin_

- **`npm install -S -D add-asset-html-webpack-plugin`**

Luego de instalarlo, se configura el `webpack.config.js`

```js
// Se utiliza el modulo
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

plugins: [
    ..., // Se configura el modulo
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, 'dist/js/*.dll.js'),
      outputPath: 'js',
      publicPath: 'http://localhost:3001/js'
    })
  ]
```

Importante a tener en cuenta.

1. Qué archivo quiero importar
2. Dónde lo quiero poner
3. Desde dónde lo quiero leer

Al colocarse el hash en el nombre del archivo, podemos evitar que el caché del navegador se quede con el archivo antigüo.

Como queremos agregar todos los **dll** usamos un patron para que importe todos los archivos que terminen con `*.dll.js`

> La configuración ideal depende de las necesidades y del proyecto.

## Versionando, limpiando y comprimiendo archivos

En esta sesión se van a ver estrategias para limpiar caché, una de ellas es agregar hash a los archivos.

La siguiente biblioteca **clean-webpack-plugin** nos permitirá limpiar los archivos, porque por cada build, se generará un archivo y se va llenando la carpeta de contenido innecesario.

- **`npm install -S -D clean-webpack-plugin`**

Los `**/app.*` dos asteriscos significan en cualquier carpeta, el `app` que contenga el nombre y el `.*` todo lo que siga después de `app`

**Plugins para optimizar la compresión de archivos css y js**

- `optimize-css-assets-webpack-plugin`
- `terser-webpack-plugin`

El _terser_ optimiza y minifca el js mientras que el _optimize-css-assets_ optimiza y minimiza el css

- **`npm install -S -D optimize-css-assets-webpack-plugin terser-webpack-plugin`**

Estos dos tienen buenos algoritmos para la compresión de archivos. Por defecto webpack usa _**outlify**_
