import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import '../css/registration.css';
import { useParams, useNavigate } from 'react-router-dom';

export default function Registration() {

    const [teamName, setTeamName] = useState('');
    const [name, setName] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const team = [];

    const addName = () => {
        team.push(name);
        console.log(teamMembers);
        alert('Name added');
        setName('');
    }

    // const validateDate = (date) => {
    //     const today = new Date();
    //     try {
    //         let response = fetch(`http://localhost:3001/api/competition/getone/${params.compId}`, {
    //             method: "GET",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         // response = response.json();
    //         // console.log(today < response.startingDate, today > response.endingDate);
    //         // if (today < response.startingDate || today > response.endingDate) {
    //         //     alert('Registration not started yet');
    //         // } else  {
    //             handleSubmit();
    //         // }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     const fetchevent = async () => {
    //         try {
    //             let response = await fetch(`http://localhost:3001/api/event/${params.eventId}/${params.compId}/createTeam`, {
    //                 method: "POST",
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     teamName: teamName,
    //                     teamMembers: teamMembers
    //                 })
    //             });
    //             response = await response.json();
    //         } catch (error) {
    //             console.error('Error fetching universities:', error);
    //             console.log(error);
    //         }
    //     }
    //     fetchevent();
    // },[])

    const handleSubmit = async () => {  
        // validateDate();
        try {
            // let response = await fetch(`http://localhost:3001/api/event/${params.eventId}/${params.compId}/createTeam`, {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         teamName: teamName,
            //         teamMembers: team
            //     })
            // });
            // response = await response.json();
            navigate(`/${params.uniId}/${params.eventId}`)
            
        } catch (error) {
            console.error('Error adding team:', error);
            console.log(error);
        }
    }

    // const [C, setC] = useState([]);
    // let name = C.map((e) => {
    //     return (
    //         <div>
    //             <div className='text-[#b1b6c9ad]'>Name</div>
    //             <input className='m-2 mb-4  border-2 border-[#b1b6c9]  ps-4 pt-2 pb-2 text-[#b1b6c9]  border-solid outline-none rounded-md bg-[#697b89] transition-all duration-1000 ease-in-out w-96 bg-transparent focus:bg-[#b1b6c930] placeholder:text-[#b1b6c9]' placeholder='Team Name...' type='text' />
    //         </div>
    //     );
    // })

    // function PushMember() {
    //     setC(C => [...C, 1])
    // }

    // function PullMember() {

    //     setC(C.slice(1))
    // }

    return (
        <>
            <Navbar />
            <div className='flex justify-center resgtration_main'>
                <div className='registration'>
                    <div className='xyz mt-28 p-32 bg-[#0c0c0c8b]'>
                        <div>
                            <div className='text-[#b1b6c9ad]'>Team Name</div>

                            <input className='m-2 mb-4 border-2 border-[#b1b6c9]  ps-4 pt-2 pb-2 text-[#b1b6c9]  border-solid outline-none rounded-md bg-[#697b89] transition-all duration-1000 ease-in-out w-96 bg-transparent focus:bg-[#b1b6c930] placeholder:text-[#b1b6c9]' onChange={(e) => setTeamName(e.target.value)} placeholder='Team Name...' type='text' />
                        </div>
                        {/* <div>
                            {name}
                        </div> */}
                        {/* <div>
                            <div className='text-[#b1b6c9ad]'>Name</div>
                            <button onClick={() => PullMember()} className='ext-[#0c0c0c] bg-[#b1b6c9] rounded-lg hover:bg-[#b1b6c9da]'><p className='flex justify-center align-middle ps-2 pe-2 pt-1 pb-1'>-</p></button>
                            <input className='m-2 mb-4  border-2 border-[#b1b6c9]  ps-4 pt-2 pb-2 text-[#b1b6c9]  border-solid outline-none rounded-md bg-[#697b89] transition-all duration-1000 ease-in-out w-96 bg-transparent focus:bg-[#b1b6c930] placeholder:text-[#b1b6c9]' placeholder='Team Name...' type='text' />

                            <button onClick={() => PushMember()} className='ext-[#0c0c0c] bg-[#b1b6c9] rounded-lg hover:bg-[#b1b6c9da]'><p className='flex justify-center align-middle ps-2 pe-2 pt-1 pb-1'>+</p></button>
                        </div> */}
                        <div className='text-[#b1b6c9ad]'>Name</div>
                        <input  onChange={(e) => setName(e.target.value)} className='m-2 mb-4  border-2 border-[#b1b6c9]  ps-4 pt-2 pb-2 text-[#b1b6c9]  border-solid outline-none rounded-md bg-[#697b89] transition-all duration-1000 ease-in-out w-96 bg-transparent focus:bg-[#b1b6c930] placeholder:text-[#b1b6c9]' placeholder='Name...' type='text' />
                        <div>
                            <button onClick={addName} className='bg-[#b1b6c9] text-[#0c0c0c] px-6 py-1 rounded-md hover:bg-[#b1b6c9da] mb-2'>Add</button>
                        </div>
                        <div className='flex justify-center'>
                            <button onClick={handleSubmit} className='bg-[#b1b6c9] text-[#0c0c0c] px-6 py-1 rounded-md hover:bg-[#b1b6c9da]'>Submit</button>
                        </div>
                    </div></div>
            </div></>
    );
}
