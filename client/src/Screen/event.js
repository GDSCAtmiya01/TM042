import React, { useEffect, useState } from 'react'

export default function Event() {

    const [university, setuniversity] = useState();
    const [event, setevent] = useState();

    useEffect(() => {
        const fetchUni = async () => {
            try {
                let response = await fetch("http://localhost:3001/api/university/get", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                response = await response.json();
                console.log(response);
                setuniversity(response)

            } catch (error) {
                console.error('Error fetching universities:', error);
                console.log(error);
            }
        }
        fetchUni();
    }, [])

    useEffect(() => {
        const fetchevent = async () => {
            try {
                let response = await fetch("http://localhost:3001/api/event/get", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                response = await response.json();
                console.log(response);
                setevent(response)

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
            {/* <div>
                {
                    event !== null
                        ? event.map(unidata => {
                            return (
                                <div>{unidata.title}</div>
                            )
                        })
                        : <div></div>
                }
            </div> */}
        </div>
    )
}
