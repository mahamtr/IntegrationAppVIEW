import React,{useState,useEffect} from 'react';
import './TestDastboard.css'
import { Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from '@material-ui/core';
import Chart from '../Chart';
require('mini-linq-js');


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const TestDastboard = (props) => {
  const [highlights,setHighlights] = useState()

  useEffect(()=>{
    if(!highlights){
      fetch('http://bankapimaai.azurewebsites.net/api/TestHistory',{
        method: 'GET', 
        headers:{
          'Content-Type': 'application/json',
        }})
      .then(response => response.json())
      .then(entries => {
        const newData= getData(entries)
        setHighlights(newData)
      })
    }
  },[])

  const getData = (data) => {
      let groups = []
      const testGroups =data.groupBy(i=> i.title);
      testGroups.map(i=>{
        var newGroup ={};
        newGroup.name = i.group;
        if(i.values){
          newGroup.total = i.values.length;
          newGroup.totalSuccess = i.values.filter(i=>i.status ==="Error").length;
          newGroup.totalError = i.values.filter(i=>i.status ==="Success").length;
        }
        groups.push(newGroup)
      })
      return groups
  } 

  return ( <div className="component-Test-Dastboard">
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} lg={3}>
        {highlights && <Chart pieData={highlights}/>}
      </Grid>

      <Grid   item xs={12} md={9} lg={9}>
      <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Test Name</TableCell>
            <TableCell align="right">Total Error</TableCell>
            <TableCell align="right">Total Success</TableCell>
            <TableCell align="right">Total Tests</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {highlights && highlights.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.totalSuccess}</TableCell>
              <TableCell align="right">{row.totalError}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    </Grid>
  </div>)
}


export default TestDastboard