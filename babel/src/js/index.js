import '../css/index.css';
import search from './search';
import render from './render';

const id = prompt('Quien es ese pokemon?');

// La respuesta devuelve una promesa
search(id)
  .then((data) => {
    render(data);
  })
  .catch(() => {
    console.log("No hubo pokemon");
  })


