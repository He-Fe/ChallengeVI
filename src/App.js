import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
//aca empieza la logica
  const baseUrl = 'http://localhost:3001/vehiculos'

  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false)
  const [showTable, setShowtable] = useState(true)
  const [showbuttom, setShowButtom] = useState(false)
  const [showbuttomAgregar, setShowButtomAgregar] = useState(true)
  const [showbuttomEdit, setShowButtomEdit] = useState(false)
  const [idcarros, setIdCarros] = useState ("")
  const [nombre, setNombre] = useState("")
  const [year, setYear] = useState("")
  const [valor, setValor] = useState("")
  const [cantidad, setCantidad] = useState("")

  const onChangeNombre = (e) => {setNombre(e.target.value)}
  const onChangeYear = (e) => {setYear(e.target.value)}
  const onChangeValor = (e) => {setValor(e.target.value)}
  const onChangeCantidad = (e) => {setCantidad(e.target.value)}


  

  const getData = async()=>{
   try {
    const {data: response}= await axios.get(baseUrl)
    setData(response)
   } catch (error) {
    console.log(error)
   }
  };

  const agregar =()=>{
    setShowtable(false)
    setShowForm(true)
    setShowButtom(true)
    setShowButtomAgregar(false)
  }

  const guardar = ()=>{
    if(nombre === "" || year === "" || valor === "" || cantidad === ""){
      alert("Debes completar todos los campos")
    }else{
      axios.post('http://localhost:3001/agregar-vehiculo',{
        nombre: nombre,
        year: year,
        valor: valor,
        cantidad: cantidad
      }).then(()=>{
        setNombre()
        setYear()
        setValor()
        setCantidad()
        setShowForm(false)
        setShowtable(true)
        setShowButtom(false)
        setShowButtomAgregar(true)
        getData()
      })
    }
  };

  const edit = ((obj) => {
    setShowForm(true)
    setShowtable(false)
    setShowButtomEdit(true)
    setShowButtomAgregar(false)
    setIdCarros(obj.idcarros)
    setNombre(obj.nombre)
    setYear(obj.year)
    setValor(obj.valor)
    setCantidad(obj.cantidad)
  });

  const update = (() => {
    if (nombre === '' || year === '' || valor === "" || cantidad === "") {
      alert('Asegurate de completar todos los campos')
    } else {
      axios.put(`http://localhost:3001/actualizar-vehiculo/${idcarros}`, {
        nombre: nombre,
        year: year,
        valor: valor,
        cantidad: cantidad
      }).then(() => {
        setNombre('')
        setYear('')
        setValor('')
        setCantidad('')
        setShowtable(true)
        setShowForm(false)
        setShowButtomAgregar(true)
        setShowButtom(false)
        setShowButtomEdit(false)
        getData()
      })
    }
  });

  const cancel = (() => {
    setShowForm(false)
    setShowtable(true)
    setShowButtomAgregar(true)
    setShowButtomEdit(false)
    setShowButtom(false)
    setNombre('')
    setYear('')
    setValor('')
    setCantidad('')
    
  })
  
  useEffect(()=>{
    getData()
  },[]);
   
  

// aca termina la logica

  return (
    <div className="App">
      <h1>Venta de Autos</h1>

      { showForm &&
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Nombre" variant="outlined" onChange={onChangeNombre} value={nombre}/>
      <TextField id="outlined-basic" label="Year" variant="outlined" onChange={onChangeYear} value={year} />
      <TextField id="outlined-basic" label="Valor" variant="outlined" onChange={onChangeValor} value={valor}/>
      <TextField id="outlined-basic" label="Cantidad" variant="outlined" onChange={onChangeCantidad} value={cantidad}/>
    </Box>
     }
    { showTable &&
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">valor</TableCell>
            <TableCell align="right">Cantidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {
          data.map((row)=>(
            <TableRow
              key={row.idcarros}
              onClick={() =>{edit(row)}}
            >
              <TableCell component="th" scope="row">
                {row.idcarros}
              </TableCell>
              <TableCell align="right">{row.nombre}</TableCell>
              <TableCell align="right">{row.year}</TableCell>
              <TableCell align="right">{row.valor}</TableCell>
              <TableCell align="right">{row.cantidad}</TableCell>
            </TableRow>
          ))
         }
        </TableBody>
      </Table>
    </TableContainer>
} 

    { showbuttomAgregar &&
    <Button variant="contained" onClick={()=>{agregar()}}>Agregar</Button>
    }
    { showbuttom &&
    <Box>   
    <Button variant="contained" color="success" onClick={()=>{guardar()}}>Guardar</Button>
    <Button variant="contained" color="error" onClick={()=>{cancel()}}>Cancelar</Button>
    </Box>   
    } 
    { showbuttomEdit &&
    <Box> 
    <Button variant="contained" color="warning" onClick={()=>{update()}}>Editar</Button>
    <Button variant="contained" color="error" onClick={()=>{cancel()}}>Cancelar</Button>
    </Box>
     }
    </div>
  );
}

export default App;