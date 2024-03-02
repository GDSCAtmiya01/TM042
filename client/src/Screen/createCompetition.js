import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../css/createCompetition.css"

export default function CreateCompetition() {

  const [event, setEvent] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    title: "", description: "", universityName: "", eventName: "", startingDate: "", endingDate: "", location: "", totalParticipants: 0,
    image: "", registrationOpen: "", registrationStartDate: "", registrationEndDate: "", allowTeams: false, teams: [], limitOfMembers: "", createdBy: ""
  });

  useEffect(() => {
    const fetchevent = async () => {
      try {
        let response = await fetch(`http://localhost:3001/api/event/getone/${params.eventId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log("params " + params.eventId);
        let data = await response.json();
        setEvent({
          title: data.title,
          university: data.university || "grrk"
        })
        // console.log(data.title)
        // console.log(data)
        // console.log(event);

      } catch (error) {
        console.error('Error fetching universities:', error);
        console.log(error);
      }
    }
    fetchevent();
  }, [])

  useEffect(() => {
    console.log("event:", event);
  }, [event]);

  // const [credentials, setCredentials] = useState({
  //   title: "", description: "", universityName: event.university, eventName: event.title, startingDate: "", endingDate: "", location: "", totalParticipants: 0,
  //   image: "", registrationOpen: "", registrationStartDate: "", registrationEndDate: "", allowTeams: false, teams: [], limitOfMembers: "", createdBy: ""
  // });

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/competition/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: credentials.title,
          description: credentials.description,
          eventName: event.title,
          universityName: event.university,
          location: credentials.location,
          startingDate: credentials.startingDate,
          endingDate: credentials.endingDate,
          registrationStartDate: credentials.registrationStartDate,
          registrationEndDate: credentials.registrationEndDate,
          allowSubEvent: credentials.allowSubEvent,
          image: credentials.image,
          createdBy: credentials.createdBy
        })
      });

      const json = await response.json();
      console.log(json);

      if (response.status === 200) {
        alert("Competition created Successfully");
        setCredentials({
          title: "", description: "", universityName: "", eventName: "", startingDate: "", endingDate: "", location: "", totalParticipants: 0,
          image: "", registrationOpen: "", registrationStartDate: "", registrationEndDate: "", allowTeams: false, teams: [], limitOfMembers: 1, createdBy: ""
        })
      } else {
        alert("Enter valid credentials")
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again later.");
    }
  };

  const handleSubmitsave = async (e) => {
    handleSubmit(e);
    navigate('/home')
  }

  function generateLimitFieldc() {
    const allowTeam = document.getElementById('allowTeam');
    const teamMem = document.getElementById('teamMem')
    if (allowTeam.checked) {
      teamMem.style.display = 'flex'
    } else {
      teamMem.style.display = 'none'
    }
  }
  return (
    <>
      <div className='bg-img'>
        <div className='contentc'>
          <div id='containerc'>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "45%", marginBottom: "10px" }}>
                <div class="lablec">Title</div>
                <div class="fieldc" style={{ height: "40px" }}>
                  <input type="text" name='title' value={credentials.title} required placeholder="Competition Title" onChange={onchange} />
                </div>
              </div>
              <div style={{ width: "45%", marginBottom: "10px" }}>
                <div class="lablec">Event</div>
                <div class="fieldc" style={{ height: "40px" }}>
                  <input type="text" name='eventName' value={event.title} disabled={true} required placeholder="Belongs to Event" onChange={onchange} />
                </div>
              </div>
            </div>
            <div>
              <div class="lablec">Description</div>
              <div class="fieldc" style={{ width: "100%", height: "50px", marginBottom: "10px" }}>
                <input type="text" name='description' value={credentials.description} required placeholder="Event Description" onChange={onchange} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "45%", marginBottom: "10px" }}>
                <div class="lablec">University</div>
                <div class="fieldc" style={{ height: "40px" }}>
                  <input type="text" name='universityName' value={event.university} disabled={true} required placeholder="University Name" onChange={onchange} />
                </div>
              </div>
              <div style={{ width: "45%", marginBottom: "10px" }}>
                <div class="lablec">Location</div>
                <div class="fieldc" style={{ height: "40px" }}>
                  <input type="text" name='location' value={credentials.location} required placeholder="Location" onChange={onchange} />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
              <div style={{ width: "20%", marginBottom: "10px" }}>
                <div class="lablec">Start Date</div>
                <div class="fieldc" style={{ height: "40px" }}>
                  <input type="date" name='startingDate' value={credentials.startingDate} required placeholder="dd-mm-yyyy" onChange={onchange} />
                </div>
              </div>
              <div style={{ width: "20%", marginBottom: "10px" }}>
                <div class="lablec">End Date</div>
                <div class="fieldc" style={{ height: "40px" }}>
                  <input type="date" name='endingDate' value={credentials.endingDate} required placeholder="dd-mm-yyyy" onChange={onchange} />
                </div>
              </div>
              <div style={{ width: "20%", marginBottom: "10px" }}>
                <div class="lablec">Registration Start Date</div>
                <div class="fieldc" style={{ height: "40px" }}>
                  <input type="date" name='registrationStartDate' value={credentials.registrationStartDate} required placeholder="dd-mm-yyyy" onChange={onchange} />
                </div>
              </div>
              <div style={{ width: "20%", marginBottom: "10px" }}>
                <div class="lablec">Registration End Date</div>
                <div class="fieldc" style={{ height: "40px" }}>
                  <input type="date" name='registrationEndDate' value={credentials.registrationEndDate} required placeholder="dd-mm-yyyy" onChange={onchange} />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "45%", marginBottom: "10px" }}>
                <div class="lablec">Total Participants</div>
                <div class="fieldc" style={{ height: "40px" }}>
                  <input type="text" name='totalParticipants' value={credentials.totalParticipants} required placeholder="Total Participants" onChange={onchange} />
                </div>
              </div>
              <div style={{ width: "45%", marginBottom: "5px" }}>
                <div class="lablec">Created By</div>
                <div class="fieldc" style={{ height: "45px" }}>
                  <input type="text" name='createdBy' value={credentials.createdBy} required placeholder="Competition is Created by" onChange={onchange} />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "10px", display: "flex" }}>
              <div class="lablee">Allow Teams :</div>
              <input type="checkbox" name='allowSubEvent' value={credentials.allowTeams} id="allowTeam" required style={{ width: "5%", height: "15px" }} onClick={generateLimitFieldc} />
              <div id='teamMem' style={{ display: "none" }}>
                <div class="lablee" style={{ marginRight: "10px" }}>Limit Of Team Members :</div>
                <div className='fieldc'>
                  <input type='text' name='limitOfMembers' value={credentials.limitOfMembers} placeholder='Team Memebers' onChange={onchange}></input>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <div class="lablec">Image</div>
              <div className='fieldc' style={{ height: "40px" }}>
                <input type='text' name='image' value={credentials.image} onChange={onchange} placeholder='Image url here' />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "5px" }}>
              <button className='btn' value={'addMore'} style={{ marginRight: "10px" }} onClick={handleSubmit}>Add More</button>
              <button className='btn' value={'save'} onClick={handleSubmitsave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
