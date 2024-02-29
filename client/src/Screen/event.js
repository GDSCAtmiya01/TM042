import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function Event() {

    const [university, setuniversity] = useState({});
    const [event, setevent] = useState([]);
    const params = useParams();

    useEffect(() => {
        const fetchevent = async () => {
            try {
                let response = await fetch(`http://localhost:3001/api/event/get/${params.id}`, {
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

    return (
        <div>
            <h1>Event</h1>
            <h1>{university.universityName}</h1>
            <div>
                {
                    event !== null
                        ? event.filter(f => (f.university === university.universityName))
                            .map(eventData => {
                                return (
                                    <>
                                    <Link to={"/" + university._id + "/"+ eventData._id}>{eventData.title}</Link>
                                    <br/>
                                    </>
                                )
                            }) : <div></div>
                }
            </div>
        </div>
    )
}
