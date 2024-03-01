import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {

    const [university, setuniversity] = useState([]);

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
            setuniversity(data);
            // console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchUni();
    }, []);


    return (
        <div>
            <h1>Home</h1>
            <div>
                {university != []
                    ?
                    university.map((uni, index) => (
                        <>
                            <Link to={"/" + uni._id} key={index}>{uni.universityName}</Link>
                            <br />
                        </>
                    )
                    )
                    : <div></div>
                }
            </div>
        </div>
    )
}
