import React, { useState } from 'react';
import data from './data.json'
import Loader from './loader.js';
import logo from '../images/platzi.png'

import '../sass/sass.scss';
import '../less/less.less';
import '../stylus/stylus.styl';

console.log(data);
function App() {
  const [loaderList, setLoaderList] = useState([]);

  function handleClick() {
    setLoaderList(data.loaders);
  }

  return (
    <div>
      <p className="sass">Esto es con Sass</p>
      <p className="less">Esto es con less</p>
      <p className="stylus">Esto es con stylus</p>
      <p className="post-css">Esto es postCSS</p>
      Que linda aplicación hecha con React.js
      <p>
        <img src={logo} alt="" width={40} />
      </p>
      <ul>
        {loaderList.map(item => <Loader {...item} key={item.id} />)}
      </ul>
      <button onClick={handleClick}>Mostrar lo aprendido</button>
    </div>
  );
}

export default App;