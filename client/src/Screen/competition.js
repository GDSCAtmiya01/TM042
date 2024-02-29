import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';


export default function Competition() {

  const [university, setuniversity] = useState({})
  const [competition, setcompetition] = useState([]);
  const [event, setevent] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchevent = async () => {
      try {
        let response = await fetch(`http://localhost:3001/api/competition/get/${params.id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        response = await response.json();
        // console.log(response);
        setuniversity(response[0])
        setevent(response[1])
        setcompetition(response[2])

      } catch (error) {
        console.error('Error fetching universities:', error);
        console.log(error);
      }
    }
    fetchevent();
  }, [])

  return (
    <div>
      <div><h1>Competition</h1></div>
      <h2>{event.title}</h2>
      <h4>In - {event.university}</h4>
      <div>
        {
          competition != []
            ? competition.filter(f => (f.eventName === event.title && event.university === f.universityName))
              .map(compData => {
                return (
                  <>
                    <Link to={"/" + university._id + "/" + event._id + "/" + compData._id}>{compData.title}</Link>
                    <br />
                  </>
                )
              })
            : <div></div>
        }
      </div>
    </div>
  )
}
