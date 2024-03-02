import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/createEvent.css"

export default function CreateEvent() {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        title: "", description: "", university: "", startingDate: "", endingDate: "", location: "", totalParticipants: "",
        image: "", registrationOpen: "", registrationStartDate: "", registrationEndDate: "", allowTeams: "", limitOfMembers: "", allowSubEvent: ""
    });

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/api/event/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: credentials.title,
                    description: credentials.description,
                    university: credentials.university,
                    location: credentials.location,
                    startingDate: credentials.startingDate,
                    endingDate: credentials.endingDate,
                    registrationStartDate: credentials.registrationStartDate,
                    registrationEndDate: credentials.registrationEndDate,
                    allowSubEvent: credentials.allowSubEvent,
                    image: credentials.image
                })
            });

            const json = await response.json();
            console.log(json);

            const addButton = document.getElementById("add");
            const saveButton = document.getElementById("save");

            if (response.status === 200) {
                if (addButton.style.display === "block") {
                    alert("Event created Successfully");
                    navigate(`/createEvent/${json}/createCompetition`)
                }else if (saveButton.style.display === 'block') {
                    alert("Event created Successfully");
                }
                
            } else {
                alert("Enter valid credentials")
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed. Please try again later.");
        }
    };

    function generateLimitFielde() {
        const allowSubEvent = document.getElementById("allowSubEvent");
        const addButton = document.getElementById("add");
        const saveButton = document.getElementById("save");
        if (allowSubEvent.checked) {
            addButton.style.display = 'block';
            saveButton.style.display = 'none';
        } else {
            addButton.style.display = 'none';
            saveButton.style.display = 'block';
        }

    }
    return (
        <>
            <div className='bg-img'>
                <div className='contente'>
                    <div id='container'>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ width: "45%", marginBottom: "10px" }}>
                                <div class="lablee">Title</div>
                                <div class="fielde" style={{ height: "45px" }}>
                                    <input type="text" name='title' value={credentials.title} required placeholder="Event Title" onChange={onchange} />
                                </div>
                            </div>
                            {/* <div style={{ width: "45%", marginBottom: "10px" }}>
                                <div class="lablee">Location</div>
                                <div class="fielde" style={{ height: "45px" }}>
                                    <input type="text" class="pass-key" required placeholder="Location" />
                                </div>
                            </div> */}
                        </div>
                        <div>
                            <div class="lablee">Description</div>
                            <div class="fielde" style={{ width: "100%", height: "70px", marginBottom: "10px" }}>
                                <input type="text" name='description' value={credentials.description} required placeholder="Event Description" onChange={onchange} />
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ width: "45%", marginBottom: "10px" }}>
                                <div class="lablee">University</div>
                                <div class="fielde" style={{ height: "45px" }}>
                                    <input type="text" name='university' value={credentials.university} class="pass-key" required placeholder="University Name" onChange={onchange} />
                                </div>
                            </div>
                            <div style={{ width: "45%", marginBottom: "10px" }}>
                                <div class="lablee">Location</div>
                                <div class="fielde" style={{ height: "45px" }}>
                                    <input type="text" name='location' value={credentials.location} class="pass-key" required placeholder="Location" onChange={onchange} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                            <div style={{ width: "20%", marginBottom: "10px" }}>
                                <div class="lablee">Start Date</div>
                                <div class="fielde" style={{ height: "45px" }}>
                                    <input type="date" name='startingDate' value={credentials.startingDate} class="pass-key" required placeholder="dd-mm-yyyy" onChange={onchange} />
                                </div>
                            </div>
                            <div style={{ width: "20%", marginBottom: "10px" }}>
                                <div class="lablee">End Date</div>
                                <div class="fielde" style={{ height: "45px" }}>
                                    <input type="date" name='endingDate' value={credentials.endingDate} class="pass-key" required placeholder="dd-mm-yyyy" onChange={onchange} />
                                </div>
                            </div>
                            <div style={{ width: "20%", marginBottom: "10px" }}>
                                <div class="lablee">Registration Start Date</div>
                                <div class="fielde" style={{ height: "45px" }}>
                                    <input type="date" name='registrationStartDate' value={credentials.registrationStartDate} class="pass-key" required placeholder="dd-mm-yyyy" onChange={onchange} />
                                </div>
                            </div>
                            <div style={{ width: "20%", marginBottom: "10px" }}>
                                <div class="lablee">Registration End Date</div>
                                <div class="fielde" style={{ height: "45px" }}>
                                    <input type="date" name='registrationEndDate' value={credentials.registrationEndDate} class="pass-key" required placeholder="dd-mm-yyyy" onChange={onchange} />
                                </div>
                            </div>
                        </div>
                        <div style={{ marginBottom: "10px", display: "flex" }}>
                            <div class="lablee">Allow SubEvents :</div>
                            <input type="checkbox" name='allowSubEvent' value={credentials.allowSubEvent} id="allowSubEvent" required style={{ width: "5%", height: "15px" }} onClick={generateLimitFielde} />
                            {/* <input type='checkbox'></input> */}
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <div class="lablee">Image</div>
                            <div className='fielde' style={{ height: "40px" }}>
                                <input type='text' name='image' value={credentials.image} onChange={onchange} placeholder='Image url here' />
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <button className='btn' id='add' style={{ display: "none", marginRight: "10px" }} onClick={handleSubmit}>Add</button>
                            <button className='btn' id='save' style={{ display: "block" }} onClick={handleSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
