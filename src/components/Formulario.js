import React, { useState } from 'react';
import styled from '@emotion/styled';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../healper';

const Campo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`;
const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    --webkit-appearance: none;
`

const Input = styled.input`
    margin: 0 1rem;
`

const Button = styled.button`
    width: 100%;
    background-color: #0083BF;
    color: #FFF;
    font-size: 16px;
    font-weight: bold;
    padding: 1rem;
    margin-top: 2rem;
    text-transform: uppercase;
    border: none;
    transform: background-color .3s ease;
    &:hover{
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    text-align: center;
    width: 100%;
    padding: 1rem;
    margin-bottom: 2rem;
` 

const Formulario = ({guardarResumen, guardarCarga}) => {
    const [datos, guardarDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })
    const [error, guardarError] = useState(false)
    
    const {marca, year, plan} = datos

    //obtener informacion del formulario
    const obtenerInformacion = e=>{
        guardarDatos({
            ...datos, 
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = e =>{
        e.preventDefault()
        if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            guardarError(true)
            return
        }

        
        guardarError(false)
        
        //base de 2000
        let resultado = 2000;

        //OBTENIENDO LA DIFERENCIA DE AÑOS
        const diferencia = obtenerDiferenciaYear(year); 
    
        //PORPOR cada año hay que restar 3%
        resultado-= ((diferencia * 3) * resultado) / 100;
        
        //Americano 15%
        //Asiatio 5%
        //Europeo 30%
        resultado = calcularMarca(marca) * resultado;
        
        //plan basico 20
        //plan completo 50 
        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan * resultado);

        guardarCarga(true)

        setTimeout(()=>{
            guardarCarga(false)
            guardarResumen({
                cotizacion: resultado,
                datos
            })
        }, 3000)

        
    }

    return ( 
        <form
            onSubmit={cotizarSeguro}
        >
            {error ? <Error>Todos los campos son obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">--- Seleccionar ---</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Marca</Label>
                <Select
                     name="year"
                     value={year}
                     onChange={obtenerInformacion}
                >
                    <option value="">--- Seleccionar ---</option>
                    <option value="2021">2021</option>
                        <option value="2020">2020</option>  
                        <option value="2019">2019</option>  
                        <option value="2018">2018</option>  
                        <option value="2017">2017</option>  
                        <option value="2016">2016</option>  
                        <option value="2015">2015</option>  
                        <option value="2014">2014</option>  
                        <option value="2013">2013</option>  
                        <option value="2012">2012</option>  
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <Input 
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === 'basico'}
                    onChange={obtenerInformacion}
                />Basico
                <Input 
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === 'completo'}
                    onChange={obtenerInformacion}
                />Completo
            </Campo>
            <Button type="submit">Cotizar</Button>
        </form>
     );
}
 
export default Formulario;