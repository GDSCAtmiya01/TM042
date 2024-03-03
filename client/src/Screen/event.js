import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from './navbar';

export default function Event() {

    const [university, setuniversity] = useState({});
    const [event, setevent] = useState([]);
    const [adminCode, setAdminCode] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    const addEvent = () => {
        const gmy = document.getElementById('admincode');
        gmy.style.display = 'flex'
    }

    const checkCode =  async () => {
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
                navigate(`/${json.universityId}/createEvent`)
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
                let response = await fetch(`http://localhost:3001/api/event/get/${params.uniId}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                response = await response.json();
                setuniversity(response[0])
                setevent(response[1])
                // console.log(response[0], response[1]);
                // console.log(response);

            } catch (error) {
                console.error('Error fetching universities:', error);
                console.log(error);
            }
        }
        fetchevent();
    }, [])

    let card_body = event.filter(f => (f.university === university.universityName))
        .map((e) => {
            return (
                <Link to={"/" + university._id + "/" + e._id} class="card p-2  lg:mt-0">
                    <div class="p-2 lg:mt-0 opacity-70 flex flex-wrap hover:opacity-100 hover:scale-105">
                        <div class="text-center  lg:flex lg:flex-col lg:justify-center lg:py-16">
                            <div class=" py-5 text-center  lg:flex lg:flex-col lg:justify-center lg:py-16">
                                <div class="z-10 -mb-10 -mt-10 flex items-baseline w-80 justify-center gap-x-2 event_image">
                                    <img class="rounded-full img w-76 h-52" src={e.image} alt="" />
                                </div>
                                <div class="mx-auto rounded-2xl bg-[#2e3c3d] max-w-xs w-96 p-16">

                                    <p class="text-base font-bold text-[#bec4d2]">{e.title}</p>
                                    <div className='event_detail'>
                                        <div class="mt-1 text-sm leading-5 text-[#bec4d2]">Start Date: {e.startingDate}</div>
                                        <div class="mt-1 text-sm leading-5 text-[#bec4d2]">End Date: {e.endingDate}</div>
                                        <div class="mt-3 text-sm font-semibold leading-5 text-[#bec4d2]">College</div>
                                        <div class="text-sm leading-5 text-[#bec4d2]">{e.university}</div>
                                    </div>
                                    <div class="flex gap-3">
                                        <a
                                            class="mt-10 text-[#2e3c3d] block w-96 rounded-md bg-[#bec4d2] px-3 py-2 text-center text-xs font-semibold shadow-sm hover:bg-[#bec4d280] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        })

    return (
        // <div>
        //     <h1>Event</h1>
        //     <h1>{university.universityName}</h1>
        //     <div>
        //         {
        //             event !== null
        //                 ? event.filter(f => (f.university === university.universityName))
        //                     .map(eventData => {
        //                         return (
        //                             <>
        //                                 <Link to={"/" + university._id + "/" + eventData._id} style={{ color: "#fff" }}>{eventData.title}</Link>
        //                                 <br />
        //                             </>
        //                         )
        //                     }) : <div></div>
        //         }
        //     </div>
        // </div>
        <div className='aboutpage'>
            <Navbar/>
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
                <div id='admincode' style={{display:"none"}}>
                    <input type='text' placeholder='Write your Admin Code' style={{borderBottom:"1px solid #fff"}} onChange={(e) => setAdminCode(e.target.value)}/>
                    <button onClick={() => {
                        console.log(adminCode)
                        checkCode()}} style={{color:"#fff"}}>Submit</button>
                </div>
            </div>

       </div>
    )
}
