import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function AllEvent() {
    const [event, setevent] = useState([]);
    const params = useParams();

    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleInputChange = e => {
        const inputValue = e.target.value;
        console.log("input=>"+inputValue);
        setQuery(inputValue);
        console.log(query);
        const filtered = event.filter(i => (i.title.toLowerCase().includes(inputValue.toLowerCase())));
        setFilteredData(filtered);
    };

    useEffect(() => {
        const fetchevent = async () => {
            try {
                let response = await fetch(`http://localhost:3001/api/event/get`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                response = await response.json();
                setevent(response)
                console.log(response);
            } catch (error) {
                console.error('Error fetching universities:', error);
                console.log(error);
            }
        }
        fetchevent();
    }, [])
    return (
        <>
            <div>
                <input type="text" placeholder="Search..." value={query} onChange={handleInputChange} />
            </div>
            <div>
                {
                    query == ''
                        ?
                        event.map(eventData => {

                            return (
                                <div>{eventData.title}</div>
                            )

                        })
                        : 
                        <div>{
                            filteredData != []
                                ? filteredData.map(eventData => {
                                    return (
                                        <div>{eventData.title}</div>
                                    )
                                })
                                : <div></div>
                        }</div>

                }

            </div>
        </>
    )
}
