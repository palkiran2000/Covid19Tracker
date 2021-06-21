import '../App.css';
import React,{useEffect, useState} from 'react'; 
import {Line} from "react-chartjs-2";
import axios from 'axios';
  
const Home=()=>
{
  const [totalDeaths,setTotalDeaths]=useState(0);
  const [totalconfirmed,setTotalConfirmed]=useState(0);
  const [totalrecovered,setTotalRecovered]=useState(0);
  const [totalDeaths1,setTotalDeaths1]=useState(0);
  const [totalconfirmed1,setTotalConfirmed1]=useState(0);
  const [totalrecovered1,setTotalRecovered1]=useState(0);
  const [covidSummary,setCovidsummary]=useState({});
  const[days,setDays]=useState(7);
  const[country,setCountry]=useState('');
  const[coronaCountAr,setCoronaCountAr]=useState([]);
  const [label,setLabel]=useState([]);

  const getcovidData=async()=>{
    try{
      const res=await fetch('https://api.covid19api.com/summary');
      // console.log(res);
      const actualData=await res.json();
      console.log(actualData);
      if(res.status===200){
          setTotalConfirmed(actualData.Global.TotalConfirmed);
          setTotalRecovered(actualData.Global.TotalRecovered);
          setTotalDeaths(actualData.Global.TotalDeaths);
          setCovidsummary(actualData);
      }


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
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  

  const formatDate=(date)=>{
    const d=new Date(date);
    const month=`0${d.getMonth()+1}`.slice(-2);
    const _date=d.getDate();
    return `-${month}-${_date}`;
  }

  const countryHandler=(e)=>{
    setCountry(e.target.value);
    const d=new Date();
    const to=formatDate(d);
    const from=formatDate(d.setDate(d.getDate()-days));
    

    // console.log(from,to);

    getCorornaReportByDateRange(e.target.value,from,to)
  }
  const daysHandler=(e)=>{
    setDays(e.target.value);
  }

  const getCorornaReportByDateRange=(countrySlug,from,to)=>{
    axios.get(`https://api.covid19api.com/total/country/${countrySlug}/status/confirmed?from=2020${from}T00:00:00Z&to=2020${to}T00:00:00Z`)
    .then(response=>{
      console.log(response);
      const yAxisCoronacount=response.data.map(d=>d.Cases);
      const xaxis=response.data.map(d=>d.Date);
      const covidDetails = covidSummary.Countries.find(country=>country.Slug===countrySlug);

      setCoronaCountAr(yAxisCoronacount);
      console.log(yAxisCoronacount);
      setTotalDeaths1(covidDetails.TotalDeaths);
      setTotalRecovered1(covidDetails.TotalRecovered);
      setTotalConfirmed1(covidDetails.TotalConfirmed);
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
      <div className="coronacon">
      
      <div style={{
        display: 'flex',
        justifyContent:'center',
        padding: '10px',
        backgroundColor:'navy',
        color:'white',
      }}>
      <h1>Worldwide Corona Reports</h1>
      </div>

      <div style={{
        display: 'flex',
        justifyContent:'space-around',
        
      }}>
       <div class="card-container">
    <div class="card card-4">
      <h2 class="card__title">Confirmed Cases</h2>
      <h2 class="card__title">{totalconfirmed}</h2>
    </div>

    <div class="card card-1">
      <h2 class="card__title">Recovered Cases</h2>
      <h2 class="card__title">{totalrecovered}</h2>
    </div>

    <div class="card card-4">
      <h2 class="card__title">Total Deaths</h2>
      <h2 class="card__title">{totalDeaths}</h2>
    </div>
    </div>
      
      </div>

      <div style={{
        display: 'flex',
        justifyContent:'center',
        margin:'20px',
      }}>
      <h1 className="uppercase">{country}</h1>
      </div>

      <div style={{
        display: 'flex',
        justifyContent:'space-around',
        
      }}>
       <div class="card-container">
    <div class="card card-2">
      <h2 class="card__title">Confirmed Cases</h2>
      <h2 class="card__title">{totalconfirmed1}</h2>
    </div>

    <div class="card card-3">
      <h2 class="card__title">Recovered Cases</h2>
      <h2 class="card__title">{totalrecovered1}</h2>
    </div>

    <div class="card card-5">
      <h2 class="card__title">Total Deaths</h2>
      <h2 class="card__title">{totalDeaths1}</h2>
    </div>
    </div>
      
      </div>

      <div style={{
        display: 'flex',
        justifyContent:'center',
        margin:'50px'
      }}>
        <select style={{width:'300px',padding:'10px',margin:'20px'}}  value={country} onChange={countryHandler}>
          {
            covidSummary.Countries && covidSummary.Countries.map(country=>
          <option key={country.Slug} value={country.Slug}>{country.Country}</option>
            )
          }
        </select>
        <select style={{width:'300px',padding:'10px',margin:'20px'}}  value={days} onChange={daysHandler}>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
        </select>
      </div>

      <div style={{
        width: '600px',
        height:'600px' ,
        margin:'50px auto'
      }}>
        <Line data={data}/>
      </div>
    </div>
      </>
  )
}
  
export default Home;