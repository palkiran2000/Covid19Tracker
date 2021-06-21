import React,{useEffect, useState} from 'react'; 
import './statewise.css';
  
const Statewise=()=>
{

    const[data,setData]=useState([]);
 

    const getcovidData=async()=>{
        try{
          const res=await fetch('https://api.covid19india.org/data.json');
          // console.log(res);
          const actualData=await res.json();
          console.log(actualData.statewise);
          setData(actualData.statewise);
          
        }catch(err){
          console.log(err);
        }
      }
      useEffect(() => {
        getcovidData();
      }, []);

     
    return(
      <><div className="flexstart">
        <h2>Statewise Tracker</h2>
              <div className="table-wrapper">
                  <table className="fl-table">
                      <thead>
                          <tr>
                              <th>State</th>
                              <th>Confirmed</th>
                              <th>Recovered</th>
                              <th>Deaths</th>
                              <th>Active</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                              data.map((currEle,ind)=>{
                                  return(
                                    <tr key={ind}>
                                    <th>{currEle.state}</th>
                                    <th>{currEle.confirmed}</th>
                                    <th>{currEle.recovered}</th>
                                    <th>{currEle.deaths}</th>
                                    <th>{currEle.active}</th>
                                </tr>

                                  )
                              })
                          }
                      </tbody>
                  </table>

              </div>
              </div>
      </>
  )
}
  
export default Statewise;