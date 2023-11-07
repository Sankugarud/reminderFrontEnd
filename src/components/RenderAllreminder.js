import React, { useEffect, useState } from 'react';
import './medicineremnder.css'

const RenderAllreminder = ({ alldata }) => {
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    if (alldata) {
      console.log(alldata)

      const date = new Date();
      const filteredData = alldata.filter((item) => {
        if (item.selectedDays.length === 0) {
          const timeParts = item.time.split(':');
  
          const givenDate = new Date(item.date);
          console.log(item.date);
          console.log(givenDate);
          let newTime;
  
          if (item.date !== "") {
            console.log("B: Valid Date");
            const year = givenDate.getFullYear();
            const month = givenDate.getMonth();
            const datee = givenDate.getDate();
            console.log(`year: ${year}, month: ${month}, datee: ${datee}, timeParts[0]: ${timeParts[0]}, timeParts[1]: ${timeParts[1]}`);
          
            const formattedMonth = month < 9 ? `0${month + 1}` : `${month + 1}`;
            const formattedDate = datee < 10 ? `0${datee}` : `${datee}`;


            newTime = new Date(`${year}-${formattedMonth}-${formattedDate}T${timeParts[0]}:${timeParts[1]}`);
          } else {
            console.log("A: Empty Date");
            newTime = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              parseInt(timeParts[0]),
              parseInt(timeParts[1])
            );
          }
  
        console.log(newTime);
          return newTime >= date;
        }
        return true;
      });
      setFilterData(filteredData);
    }
  }, [alldata]);
  
  

  useEffect(() => {
    console.log(filterData); 
  }, [filterData]);
  return (
    <div className='container'>
      {filterData.map((item, index) => (
        <div key={index} className="box">
          <p> <span className="name"> Name: </span>{item.text}</p>
          <p> <span className="timeDate"> Time: </span>{item.time}</p>
          
           
          {item.selectedDays && item.selectedDays.length > 0 && (
            <div className='select_days'>
                <span className='name'>Selected days:</span>
                <div className="days">
                  {item.selectedDays.map((days, dayIndex) => (
                    <div key={dayIndex} className="single_days">
                      <p>{days}</p>
                    </div>
                 ))}
                </div>
            </div>
            )}
          </div>
        
      ))}
    </div>
  );
};

export default RenderAllreminder;
