import React, { useState, useEffect } from 'react';
import './IntegrationTest.css'
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import { IntegrationTests, runIntegrationTest } from './DataFactory';
import getTestsHistory from '../utils'
const IntegrationTest = (props) => {
  const [rows,setRows]= useState(IntegrationTests);
  const [testHistory,setTestHistory]= useState();

  useEffect(()=>{
      fetch('http://bankapimaai.azurewebsites.net/api/TestHistory',{
        method: 'GET', 
        headers:{
          'Content-Type': 'application/json',
        }})
      .then(response => response.json())
      .then(entries => {
        setTestHistory(entries)
      })
  },[rows])

  const updateTestStatus = (row) =>{
    const test = [...rows]
    test.find(i=> i === row).status= "Running";
    setRows(test);
  }
  
  const getLastStatus = (testName) =>{
    if(testHistory){
      return testHistory.find(i=>i.title === testName).status
    }

    return 'UnKnown'
  }

  const formatDate = (date) =>{
    if(date){
      const newDate = new Date(date); 
      return `${newDate.getFullYear()}/${newDate.getMonth()}/${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`
    }
    return '';
  }

  return <div className="component-Integration-Tests">
        <Grid container spacing={2}>
        <Grid  item xs={12} md={6} lg={6}>
        <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Test Name</TableCell>
            <TableCell align="center">Last Status</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" onClick={()=>{
                updateTestStatus(row);
                runIntegrationTest(row.name,setRows);
              }} align="left">
                {row.name}
              </TableCell>
            <TableCell align="center">{getLastStatus(row.name)}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
          
          </Grid>
          <Grid  item xs={12} md={6} lg={6}>
          <TableContainer component={Paper}>
      <Table stickyHeader  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Test Name</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Comments</TableCell>
            <TableCell align="right">Date and Time</TableCell>
            <TableCell align="right">Responsible</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testHistory&&testHistory.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.comments}</TableCell>
              <TableCell align="right">{formatDate(row.dateTime)}</TableCell>
              <TableCell align="right">{row.responsible}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Grid>
    </Grid>
  </div>;
}


export default IntegrationTest