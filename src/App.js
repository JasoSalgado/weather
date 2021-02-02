import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

function App() {

  // State principal
  // Ciudad = state, guardarCiudad = this.setState()
  const [ ciudad, guardarCiudad ] = useState('');
  const [ pais, guardarPais ] = useState('');
  const [ error, guardarError ] = useState(false);
  const [ resultado, guardarResultado] = useState({});

  useEffect(() => {
    
    // Prevenir ejecución
    if(ciudad === '') return;

    const consultarAPI = async () => {

      const appId = 'd8f086765fe03c2fcf83ab0ed06df571';

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    // Consultar la url
    const respuesta = await fetch(url);

    const resultado = await respuesta.json();

    console.log(resultado);

    guardarResultado(resultado);
  }
    consultarAPI();
  }, [ ciudad, pais ]);


  const datosConsulta = datos => {
    // Validar que ambos campos estén
    if(datos.ciudad === '' || datos.pais === ''){
      // un error
      guardarError(true);
      return;
    }
    // Ciudad y país existen, agregarlos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }

  


  // Cargar un componente condicionalmente
  let componente;
  if(error) {
    // Hay un error, mostrarlo
    componente = <Error mensaje='Ambos campos son obligatorios'/>
  } else if (resultado.cod === "404") {
    componente = <Error mensaje= "La ciudad no existe en nuestro regitro" />
  } else {
    // Mostrar el clima
    componente = <Clima 
                    resultado={resultado}
                  />;
  }

  return (
    <div className="App">
      <Header 
        titulo='Clima React App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario
                datosConsulta={datosConsulta}
              />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
