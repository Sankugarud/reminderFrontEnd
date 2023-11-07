import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RenderAllreminder from './RenderAllreminder';
import './medicineremnder.css'


const MedicineReminder = () => {
    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [number, setNumber] = useState("");
    const [alldata, setdAllData] = useState([]);

    const handleSetDay = (day) => {
        if (selectedDays.includes(day)) {
          setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
          setSelectedDays([...selectedDays, day]);
        }
      };

    const handleAdd = async () => {
      if(number && text && time){
        const reminderData = {
          number,
          text,
          date,
          time,
          selectedDays,
      }
      setDate('');
      setTime('');
      setText('');
      setNumber('');
      setSelectedDays([]);
     
      try {
          const response = await axios.post(`https://reminderbackend-17oh.onrender.com/medicinereminder`, reminderData, {
              headers:{
                  'Content-Type': 'application/json',
              }
          })
          setdAllData(response.data.data)
      } catch (error) {
          console.log(error)
      }
    
      }else{
        alert("Time or text or number cant be empty")
      }

      alert("Your Reminder is set")
    }
    useEffect(() => {
      console.log("Updated selectedDays:", selectedDays);
    }, [selectedDays]);

  return (
    <div className='medicine_reminder'>
      <div className="heading">
        <h1>Medicine Reminder </h1>
      </div>
      <div className="mobilenumber">
        <input type="number" className='number'  placeholder='Enter correct mobile number' name="number" value={number} onChange={(e)=>setNumber(e.target.value)} />
      </div>
      <div className="text">
        <input type="text" className='medicine_name' placeholder='Enter medicine'  value={text} onChange={(e)=>setText(e.target.value)}/>
        <input type="date" className='date' value={date} onChange={(e)=>setDate(e.target.value)}/>
        <input type="time" className='time'  value={time} onChange={(e)=>setTime(e.target.value)}/>
      </div>
      <div className="dates">
        <div>
              <input type="checkbox" onChange={() => handleSetDay('monday')} name="monday" className='checkbox' id="monday" />
              <label htmlFor="monday">monday</label>
        </div>
        <div>
              <input type="checkbox" onChange={() => handleSetDay('tuesday')} name="tuesday" className='checkbox' id="tuesday" />
              <label htmlFor="tuesday">tuesday</label>
              </div>
              <div>
              <input type="checkbox" onChange={() => handleSetDay('wednesday')} name="wednesday" className='checkbox' id="wednesday" />
              <label htmlFor="wednesday">wednesday</label>
              </div>
              <div>
              <input type="checkbox" onChange={() => handleSetDay('thursday')} name="thursday" className='checkbox' id="thursday" />
              <label htmlFor="thursday">thursday</label>
              </div>
              <div>
              <input type="checkbox" onChange={() => handleSetDay('friday')} name="friday" className='checkbox' id="friday" />
              <label htmlFor="friday">friday</label>
              </div>
              <div>
              <input type="checkbox" onChange={() => handleSetDay('saturday')} name="saturday" className='checkbox' id="saturday" />
              <label htmlFor="saturday">saturday</label>
              </div>
              <div>
              <input type="checkbox" onChange={() => handleSetDay('sunday')} name="sunday" className='checkbox' id="sunday" />
              <label htmlFor="sunday">sunday</label>
              </div>
              

          </div>
        


        <button className='addBtn' onClick={handleAdd}>Add</button>


        <div className="renderdata">
            <RenderAllreminder alldata={alldata}/>
        </div>
    </div>
  )
}

export default MedicineReminder