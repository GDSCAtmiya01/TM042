import React from 'react'
import { useState } from 'react';
import "../css/createEvent.css"

export default function CreateEvent() {


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

            if (response.status === 200) {
                alert("Event created Successfully");
                // navigate('/home')
            } else {
                alert("Enter valid credentials")
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed. Please try again later.");
        }
    };

    function generateLimitFielde() {
        var checkbox = document.querySelector('.allowTeam');
        var limitFielde = document.getElementById('limitOfTeamMember');
        // Check if the checkbox is checked
        if (checkbox.checked) {
            // If checked, generate the limitOfTeamMember fielde
            if (!limitFielde) {
                // Create the input element
                var input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.setAttribute('id', 'limitOfTeamMember');
                input.setAttribute('name', 'limitOfTeamMember');
                input.setAttribute('placeholder', 'Enter limit of team members');

                // Create a new checkbox element
                var checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('id', 'myCheckbox');
                checkbox.setAttribute('name', 'myCheckbox');
                checkbox.setAttribute('value', 'isChecked');

                // Append the input element to the form or any desired container
                var container = document.getElementById('container'); // Change 'container' to your actual container ID
                container.appendChild(input);
                container.appendChild(checkbox)
            }
        } else {
            // If not checked, remove the limitOfTeamMember fielde if it exists
            if (limitFielde) {
                limitFielde.parentNode.removeChild(limitFielde);
            }
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
                            <div class="lablee">Does not Allow SubEvents :</div>
                            <input type="checkbox" name='allowSubEvent' value={credentials.allowSubEvent} class="allowTeam" checked="false" required style={{ width: "5%", height: "15px" }} onChange={generateLimitFielde} />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <div class="lablee">Image</div>
                            <div className='fielde' style={{ height: "40px" }}>
                                <input type='text' name='image' value={credentials.image} onChange={onchange} placeholder='Image url here' />
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <button style={{ padding: "8px 15px", fontSize: "15px", fontWeight: "bold", backgroundColor: "transparent", color: "#fff", letterSpacin: "1px", border: "1px solid #fff" }} onClick={handleSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
