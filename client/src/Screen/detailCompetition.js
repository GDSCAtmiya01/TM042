import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function DetailCompetition() {

    const [competition, setcompetition] = useState([]);
    const params = useParams();

    useEffect(() => {
        const fetchevent = async () => {
            try {
                let response = await fetch(`http://localhost:3001/api/competition/getone/${params.id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                response = await response.json();
                setcompetition(response)

            } catch (error) {
                console.error('Error fetching universities:', error);
                console.log(error);
            }
        }
        fetchevent();
    }, [])

    return (
        <>
        <div><h2>Detailed Event Description</h2></div>
            <div>{competition.title}</div>
            <div>{competition.description}</div>
            <div>Belong to Event - {competition.eventName}</div>
        </>
    )
}
