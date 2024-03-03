import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from './navbar';


export default function Competition() {

  const [university, setuniversity] = useState({})
  const [competition, setcompetition] = useState([]);
  const [adminCode, setAdminCode] = useState('');
  const [event, setevent] = useState({});
  const params = useParams();

  const addEvent = () => {
    const gmy = document.getElementById('admincodec');
    gmy.style.display = 'flex'
}

  const checkAdminCode = async () => {      
    const admincode = document.getElementById('admincodec').value;
    console.log(admincode);
    try {
        let response = await fetch("http://localhost:3001/api/university/getadminCode", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                adminCode: adminCode
              }),
        });
        let json = await response.json();
        // let status = await response.status;
        console.log(json);
        if (json.msg === "Admin code is correct") {
            // navigate(`/${json.universityId}/createEvent`)
            window.location.href = `/${json.universityId}/createEvent/${event._id}/createCompetition`
        }else{
            alert('Invalid Admin Code')
        }
    } catch (error) {
        console.error('Error fetching universities:', error);
        console.log(error);
    
  }
}

  useEffect(() => {
    const fetchevent = async () => {
      try {
        let response = await fetch(`http://localhost:3001/api/competition/get/${params.eventId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        response = await response.json();
        // console.log(response);
        setuniversity(response[0])
        setevent(response[1])
        setcompetition(response[2])

      } catch (error) {
        console.error('Error fetching universities:', error);
        console.log(error);
      }
    }
    fetchevent();
  }, [])

  let card_body = competition.filter(f => (f.eventName === event.title && event.university === f.universityName))
        .map((e) => {
            return (
                <Link to={"/" + university._id + "/" + event._id + "/"+ e._id} class="card p-2  lg:mt-0">
                    <div class="p-2 lg:mt-0 opacity-70 flex flex-wrap hover:opacity-100 hover:scale-105">
                        <div class="text-center  lg:flex lg:flex-col lg:justify-center lg:py-16">
                            <div class=" py-10 text-center  lg:flex lg:flex-col lg:justify-center lg:py-16">
                                <div class="z-10 -mb-10 -mt-10 flex items-baseline w-80 justify-center gap-x-2 event_image">
                                    <img class="rounded-full img w-80 h-52" src={e.image} alt="" />
                                </div>
                                <div class="mx-auto rounded-2xl bg-[#2e3c3d] max-w-xs p-16">

                                    <p class="text-base font-bold text-[#bec4d2]">{e.title}</p>
                                    <div className='event_detail'>
                                        <div class="mt-1 text-sm leading-5 text-[#bec4d2]">Start Date: {e.startingDate}</div>
                                        <div class="mt-1 text-sm leading-5 text-[#bec4d2]">End Date: {e.endingDate}</div>
                                        <div class="mt-3 text-sm font-semibold leading-5 text-[#bec4d2]">College</div>
                                        <div class="text-sm leading-5 text-[#bec4d2]">{e.universityName}</div>
                                    </div>
                                    <div class="flex gap-3">
                                        <a
                                            class="mt-6 text-[#2e3c3d] block w-96 rounded-md bg-[#bec4d2] px-3 py-2 text-center text-xs font-semibold shadow-sm hover:bg-[#bec4d280] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        })

  return (
    <div>
    <Navbar/>
    <div className='mt-3' style={{textAlign:"center"}}>
      <p style={{color:"#fff", fontSize:"2.5em"}}>{event.title}</p>
      <h4 style={{color:"#fff"}}>In - {event.university}</h4>
    </div>
      
      <div>
        {/* {
          competition != []
            ? competition.filter(f => (f.eventName === event.title && event.university === f.universityName))
              .map(compData => {
                return (
                  <>
                    <Link style={{color:"#fff"}} to={"/" + university._id + "/" + event._id + "/" + compData._id}>{compData.title}</Link>
                    <br />
                  </>
                )
              })
            : <div></div>
        } */}
        <div className='aboutpage'>

            <div class="grid lg:grid-cols-3 md:grid-cols-2 m-auto  w-fit rounded-3xl">
                {card_body}

                <div class="p-2 lg:mt-8" onClick={addEvent}>
                    <div class="p-2 lg:mt-24 opacity-70 flex flex-wrap hover:opacity-100 hover:scale-110 ">

                        <div class=" py-10 text-center  lg:flex lg:flex-col lg:justify-center lg:py-16">

                            <div class="mx-auto rounded-2xl bg-[#2e3c3d]  max-w-xs p-16">
                                <p class="text-base font-semibold text-[#bec4d2]">Build Event</p>

                                <p class="mt-6 text-6xl leading-5 text-[#bec4d2] p-10"> + </p>
                                <p 
                                    class="mt-10 text-[#2e3c3d] block w-44 rounded-md bg-[#bec4d2] px-3 py-2 text-center text-sm font-semibold shadow-sm hover:bg-[#bec4d280] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Build</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='admincodec' className='mb-40' style={{display:"none"}}>
                    <input type='text' placeholder='Write your Admin Code' onChange={(e) => setAdminCode(e.target.value)} style={{borderBottom:"1px solid #fff", height:"50px", marginRight:"10px"}}/>
                    <button style={{color:"#fff", border:"1px solid white", paddingInline:"10px"}} onClick={checkAdminCode}>Submit</button>
                </div>
            </div>

       </div>
      </div>
    </div>
  )
}

