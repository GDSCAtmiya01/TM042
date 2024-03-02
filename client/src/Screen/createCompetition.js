import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/createCompetition.css"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreateCompetition() {

  const navigate = useNavigate();
  const [file, setFile] = useState([]);


  const [credentials, setCredentials] = useState({
    title: "", description: "", universityName: "", eventName: "", startingDate: "", endingDate: "", location: "", totalParticipants: 0,
    image: "", registrationOpen: "", registrationStartDate: "", registrationEndDate: "", allowTeams: false, teams: [], limitOfMembers: "", createdBy: ""
  });

  const handleSingleImageSubmit = (e) => {
    if (file && file.size <= 2097152) {
        storeSingleImage(file)
        .then((url) => {
          setCredentials({
            ...credentials,
            image: url,
          });

          console.log(credentials)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please select image less than 2MB");
    }
  };

  const storeSingleImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("progress : " + progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveSingleImage = () => {
    setCredentials({
      ...credentials,
      imageUrl: null,
    });
  };

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
          eventName: credentials.eventName,
          universityName: credentials.universityName,
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
        // navigate('/home')
      } else {
        alert("Enter valid credentials")
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again later.");
    }
  };

  function generateLimitFieldc() {
    var checkbox = document.querySelector('.allowTeam');
    var limitFieldc = document.getElementById('limitOfTeamMember');
    // Check if the checkbox is checked
    if (checkbox.checked) {
      // If checked, generate the limitOfTeamMember fieldc
      if (!limitFieldc) {
        // Create the input element
        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'limitOfTeamMember');
        input.setAttribute('name', 'limitOfTeamMember');
        input.setAttribute('placeholder', 'Enter limit of team members');


        // Append the input element to the form or any desired container
        var container = document.getElementById('check'); // Change 'container' to your actual container ID
        container.appendChild(input);
      }
    } else {
      // If not checked, remove the limitOfTeamMember fieldc if it exists
      if (limitFieldc) {
        limitFieldc.parentNode.removeChild(limitFieldc);
      }
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
                  <input type="text" name='eventName' value={credentials.eventName} required placeholder="Belongs to Event" onChange={onchange} />
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
                  <input type="text" name='universityName' value={credentials.universityName} required placeholder="University Name" onChange={onchange} />
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

            <div id='check' style={{ marginBottom: "5px", display: "flex" }}>
              <div class="lablec">Allow Teams</div>
              <input type="checkbox" name='allowTeams' value={credentials.allowTeams} class="allowTeam" checked="false" required style={{ width: "5%", height: "15px" }} onChange={generateLimitFieldc} />
            </div>
            <div style={{ marginBottom: "10px" }}>
            <div className="flex gap-4">
                  <input
                    className="p-3 border border-gray-300 rounded-lg w-full"
                    onChange={(e) => {
                      setFile(e.target.files[0]); // Only store the first file
                    }}
                    type="file"
                    id="image"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    onClick={handleSingleImageSubmit}
                    className="p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    Upload
                  </button>
                </div>
                {credentials.image && (
                  <div className="flex justify-between p-3 border items-center">
                    <img
                      src={credentials.image}
                      alt={`Listing image`}
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                    <button
                      className="p-3 text-red-700 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                      type="button"
                      onClick={handleRemoveSingleImage}
                    >
                      Delete
                    </button>
                  </div>
                )}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "5px" }}>
              <button className='btn' style={{ marginRight: "10px" }} onClick={navigate("/createCompetition")}>Add More</button>
              <button className='btn' onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
