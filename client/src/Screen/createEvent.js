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

    function generateLimitField() {
        var checkbox = document.querySelector('.allowTeam');
        var limitField = document.getElementById('limitOfTeamMember');
        // Check if the checkbox is checked
        if (checkbox.checked) {
            // If checked, generate the limitOfTeamMember field
            if (!limitField) {
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
            // If not checked, remove the limitOfTeamMember field if it exists
            if (limitField) {
                limitField.parentNode.removeChild(limitField);
            }
        }

    }
    return (
        <>
            <div className='bg-img'>
                <div className='content'>
                    <div id='container'>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ width: "45%", marginBottom: "10px" }}>
                                <div class="lable">Title</div>
                                <div class="field" style={{ height: "45px" }}>
                                    <input type="text" name='title' value={credentials.title} required placeholder="Event Title" onChange={onchange} />
                                </div>
                            </div>
                            {/* <div style={{ width: "45%", marginBottom: "10px" }}>
                                <div class="lable">Location</div>
                                <div class="field" style={{ height: "45px" }}>
                                    <input type="text" class="pass-key" required placeholder="Location" />
                                </div>
                            </div> */}
                        </div>
                        <div>
                            <div class="lable">Description</div>
                            <div class="field" style={{ width: "100%", height: "70px", marginBottom: "10px" }}>
                                <input type="text" name='description' value={credentials.description} required placeholder="Event Description" onChange={onchange} />
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ width: "45%", marginBottom: "10px" }}>
                                <div class="lable">University</div>
                                <div class="field" style={{ height: "45px" }}>
                                    <input type="text" name='university' value={credentials.university} class="pass-key" required placeholder="University Name" onChange={onchange} />
                                </div>
                            </div>
                            <div style={{ width: "45%", marginBottom: "10px" }}>
                                <div class="lable">Location</div>
                                <div class="field" style={{ height: "45px" }}>
                                    <input type="text" name='location' value={credentials.location} class="pass-key" required placeholder="Location" onChange={onchange} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                            <div style={{ width: "20%", marginBottom: "10px" }}>
                                <div class="lable">Start Date</div>
                                <div class="field" style={{ height: "45px" }}>
                                    <input type="date" name='startingDate' value={credentials.startingDate} class="pass-key" required placeholder="dd-mm-yyyy" onChange={onchange} />
                                </div>
                            </div>
                            <div style={{ width: "20%", marginBottom: "10px" }}>
                                <div class="lable">End Date</div>
                                <div class="field" style={{ height: "45px" }}>
                                    <input type="date" name='endingDate' value={credentials.endingDate} class="pass-key" required placeholder="dd-mm-yyyy" onChange={onchange} />
                                </div>
                            </div>
                            <div style={{ width: "20%", marginBottom: "10px" }}>
                                <div class="lable">Registration Start Date</div>
                                <div class="field" style={{ height: "45px" }}>
                                    <input type="date" name='registrationStartDate' value={credentials.registrationStartDate} class="pass-key" required placeholder="dd-mm-yyyy" onChange={onchange} />
                                </div>
                            </div>
                            <div style={{ width: "20%", marginBottom: "10px" }}>
                                <div class="lable">Registration End Date</div>
                                <div class="field" style={{ height: "45px" }}>
                                    <input type="date" name='registrationEndDate' value={credentials.registrationEndDate} class="pass-key" required placeholder="dd-mm-yyyy" onChange={onchange} />
                                </div>
                            </div>
                        </div>
                        <div style={{ marginBottom: "10px", display: "flex" }}>
                            <div class="lable">Does not Allow SubEvents :</div>
                            <input type="checkbox" name='allowSubEvent' value={credentials.allowSubEvent} class="allowTeam" checked="false" required style={{ width: "5%", height: "15px" }} onChange={generateLimitField} />
                        </div>
                        <div>
                            <div class="lable">Image</div>
                            <div className='field'>
                                <input type='text' name='image' value={credentials.image} onChange={onchange} placeholder='image url here' />
                            </div>
                        </div>
                        <button onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}
