import '../App.css';
import React,{useEffect, useState} from 'react'; 
import {Line} from "react-chartjs-2";
import axios from 'axios';
import Statewise from './Statewise';

import vaccine from '../assets/vaccine1.jpg';
import { useHistory } from 'react-router-dom';
  
const India=()=>{
  const history = useHistory();
  const redirect = () => {
    history.push('/home')
  }

    const [totalDeaths1,setTotalDeaths1]=useState(0);
  const [totalconfirmed1,setTotalConfirmed1]=useState(0);
  const [totalrecovered1,setTotalRecovered1]=useState(0);
  const[days,setDays]=useState(0);
  const[coronaCountAr,setCoronaCountAr]=useState([]);
  const [label,setLabel]=useState([]);

    const getcovidData=async()=>{
        try{
          const res=await fetch('https://api.covid19india.org/data.json');
          // console.log(res);
          const actualData=await res.json();
          console.log(actualData.statewise[0]);
          setTotalConfirmed1(actualData.statewise[0].confirmed);
          setTotalRecovered1(actualData.statewise[0].recovered);
          setTotalDeaths1(actualData.statewise[0].deaths);
        }catch(err){
          console.log(err);
        }
      }
      useEffect(() => {
        getcovidData();
      }, []);

      const data = {
        labels: label,
        datasets: [
          {
            label: '# of Cases',
            data: coronaCountAr,
            fill: false,
            backgroundColor: '	#8A2BE2',
            borderColor: '	#D8BFD8',
          },
        ],
      };
      
      const formatDate=(date)=>{
        const d=new Date(date);
        const month=`0${d.getMonth()+1}`.slice(-2);
        const _date=d.getDate();
        return `-${month}-${_date}`;
      }
      
      const daysHandler=(e)=>{
        setDays(e.target.value);
        const d=new Date();
        const to=formatDate(d);
        const from=formatDate(d.setDate(d.getDate()-days));
    

    // console.log(from,to);

        getCorornaReportByDateRange(from,to);
      }

      const getCorornaReportByDateRange=(from,to)=>{
        axios.get(`https://api.covid19api.com/total/country/India/status/confirmed?from=2020${from}T00:00:00Z&to=2020${to}T00:00:00Z`)
        .then(response=>{
          console.log(response);
          const yAxisCoronacount=response.data.map(d=>d.Cases);
          const xaxis=response.data.map(d=>d.Date);

    
          setCoronaCountAr(yAxisCoronacount);
          console.log(yAxisCoronacount);
          setLabel(xaxis);
          console.log(xaxis);
    
        })
        .catch(
          error=>{
            console.log(error);
          }
        )
      }
  return(
      <>
      <div>
      <div style={{
        display: 'flex',
        justifyContent:'center',
        height: '100px',
        backgroundColor:'#0A043C',
        color: '#fff',
      }}>
      <h1 style={{margin:'30px'}}>COVID-19 INDIA TRACKER</h1>
      </div>

      <div style={{
        display: 'flex',
        justifyContent:'space-around',
        
      }}>
      <div class="card-container">
    <div class="card card-4">
      <h2 class="card__title">Confirmed Cases</h2>
      <h2 class="card__title">{totalconfirmed1}</h2>
    </div>

    <div class="card card-1">
      <h2 class="card__title">Recovered Cases</h2>
      <h2 class="card__title">{totalrecovered1}</h2>
    </div>

    <div class="card card-4">
      <h2 class="card__title">Total Deaths</h2>
      <h2 class="card__title">{totalDeaths1}</h2>
    </div>
    </div>
    </div>

      <div style={{display:'flex'}}>
      <div style={{
        width: '800px',
        height:'800px' ,
      }}>
          <img src={vaccine} style={{margin:'20px',width:'100%'}} alt='vaccine'></img>
          <div style={{display:'flex',justifyContent:'center',margin:'40px'}}>
            <form action="https://selfregistration.cowin.gov.in/">
              <button style={{padding:'20px',margin:'20px'}} onclick="location.href='https://google.com';">Register for Vaccine</button>
            </form>
            <button style={{padding:'20px',margin:'20px'}}
            onClick={redirect}
            >
              Get Global Data
              </button>
          </div>
          <div style={{display:'flex',justifyContent:'center'}} >
          <select style={{width:'300px',padding:'10px',margin:'20px'}} value={days} onChange={daysHandler}>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
          </select>
          </div>
        <Line data={data}/>
      </div>
      <Statewise/>
      </div>
      </div>
      </>
  )
}
  
export default India;