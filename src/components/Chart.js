import React,{useEffect,useState} from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from '@material-ui/core';
import Title from './Title';




const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;                    

 const  Chart = ({pieData}) => {
  const [data,setData] = useState([])
  
  useEffect(()=>{
    if(pieData){
      const pieGroup = pieData.map(i=> ({'name':i.name,'value':i.total}))
      setData(pieGroup)
    }
},[])

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.35;
 const x  = cx + radius * Math.cos(-midAngle * RADIAN);
 const y = cy  + radius * Math.sin(-midAngle * RADIAN);

 return (
   <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
     {`${(percent * 100).toFixed(0)}%`}
   </text>
 );
};


  return (
    <Grid container spacing={3}>
        
      <Grid item xs={12} md={12} lg={12}>
    <PieChart width={1500} height={300} >
      <Pie
      data={data} 
      cx={120} 
      cy={150}
      labelLine={false}
      label={renderCustomizedLabel}
      outerRadius={100} 
      fill="#8884d8"
    >
      {
        data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
      }
    </Pie>
   
  </PieChart>
  </Grid>
        <Grid item xs={12} md={12} lg={12}>
              {
              data.map((entry, index) => <div style={{display:'flex','margin':'5px'}}>
                <span  style={{'background':`${COLORS[index]}`,'height':'20px','width': '20px', 'borderRadius': '50%'}} />
                <div>: {entry.name}</div>
                </div>)
            }
        </Grid>
  </Grid>
  );
}

export default Chart