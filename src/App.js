import React, { useState } from 'react';
import Header from './components/Header';
import styled from '@emotion/styled';
import Formulario from './components/Formulario';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';


const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ContenedorForm = styled.div`
  background-color: #FFFFFF;
  padding: 3rem;
`

function App() {
  const [resumen, guardarResumen] = useState({
    cotizacion: 0,
    datos: {
      marca: '',
      year: '',
      plan: ''
    }
  })

  const [cargar, guardarCarga] = useState(false)

  const {cotizacion, datos} = resumen

  return (
    <Contenedor>
      <Header 
        titulo="Cotizador de seguros"
      />

      <ContenedorForm>
          <Formulario 
            guardarResumen={guardarResumen}
            guardarCarga={guardarCarga}
          />
          {cargar ? <Spinner/> : null}
          <Resumen
            datos={datos}
          />
          {!cargar ? <Resultado
            cotizacion={cotizacion}
          />
          : null 
          }
      </ContenedorForm>

    </Contenedor>
  );
}

export default App;
