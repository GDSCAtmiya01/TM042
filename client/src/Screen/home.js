import React, { useEffect, useState } from 'react'

export default function Home() {

    const [university, setuniversity] = useState();

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

    return (
        <div>
            <h1>Home</h1>
            <div>
                {
                    university !== null
                    ? university.map(unidata => {
                        return(
                            <div>{unidata.universityName}</div>
                        )
                    })
                    :<div></div>
                }
            </div>
        </div>
    )
}
