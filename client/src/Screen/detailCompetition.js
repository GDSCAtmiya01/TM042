import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../css/detailcompetetion.css';
import Navbar from './navbar';

export default function DetailCompetition() {

    const [competition, setcompetition] = useState([]);
    const params = useParams();
    const {uniId, eventId, compId} = params;
    const navigate = useNavigate();

    const validateDate = () => {
        const today = new Date();
        try {
            let response = fetch(`http://localhost:3001/api/competition/getone/${params.compId}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response = response.json();
            console.log(today < response.startingDate, today > response.endingDate);
            // if (today < response.startingDate || today > response.endingDate) {
            //     alert('Registration not started yet');
            // } else  {
                navigate(`/${uniId}/${eventId}/${compId}/register`)
            // }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchevent = async () => {
            try {
                let response = await fetch(`http://localhost:3001/api/competition/getone/${params.compId}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                response = await response.json();
                setcompetition(response)
                
                console.log(compId);

            } catch (error) {
                console.error('Error fetching universities:', error);
                console.log(error);
            }
        }
        fetchevent();
    }, [])

    return (
        <>
            <Navbar />
            <div className='Cometetion_main'>
                <div className='competition mt-32'>
                    <div className='image_contain'>
                        <img className='competition_image' src={competition.image} />
                    </div>
                </div>
                <div className='Content'>
                    <div>

                        <div className='competition_title flex justify-center mb-8'>{competition.title}</div>
                        <div className='flex justify-center mb-8'>{competition.description}</div>
                        <div className='Uni_Name date flex justify-center pb-4 font-semibold'>{competition.eventName}</div>
                        <div className='Event_Name flex justify-center pb-4 font-semibold'>Sample Event 13</div>
                        <div className='flex justify-center pb-1'><span className='font-semibold pe-3'>Start Date:</span>{competition.startingDate}</div>
                        <div className='flex justify-center pb-4'><span className='font-semibold pe-3'>End Date:</span>{competition.endingDate}</div>
                        <div className='flex justify-center pb-1'><span className='font-semibold pe-3'>Registration Start Date:</span>  {competition.registrationStartDate}</div>
                        <div className='flex justify-center pb-4'><span className='font-semibold pe-3'>Registration End Date:</span>  {competition.registrationEndDate}</div>
                        <div className='flex justify-center'>
                            <a onClick={() => navigate(`/${uniId}/${eventId}/${compId}/register`)} className='btn_resister rounded-md ps-7 pe-7 font-thin text-[#bec4d2]'>Register</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
