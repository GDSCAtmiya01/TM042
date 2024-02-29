import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {

    const [university, setuniversity] = useState();
    const [loading, setLoading] = useState(true);

    // const fetchUni = async () => {
    //     try {
    //         let response = await fetch("http://localhost:3001/api/university/get", {
    //             method: "GET",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         response = await response.json();
    //         console.log(response);
    //         setuniversity(response)

    //     } catch (error) {
    //         console.error('Error fetching universities:', error);
    //         console.log(error);
    //     }
    // }
    const fetchUni = async () => {
        try {
            let response = await fetch("http://localhost:3001/api/university/get", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            // console.log(data);

            if (Array.isArray(data)) {
                setuniversity(data);
            } else {
                console.error('Data is not in expected format');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUni();
    }, []);


    return (
        <div>
            <h1>Home</h1>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {university.map((uni, index) => (
                            <>
                            <Link to={"/" + uni._id} key={index}>{uni.universityName}</Link> 
                            <br/>
                            </>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
