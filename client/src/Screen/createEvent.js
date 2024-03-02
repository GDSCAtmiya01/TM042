import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/createEvent.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [credentials, setCredentials] = useState({
    title: "",
    description: "",
    university: "",
    startingDate: "",
    endingDate: "",
    location: "",
    totalParticipants: "",
    image: "",
    registrationOpen: "",
    registrationStartDate: "",
    registrationEndDate: "",
    allowTeams: "",
    limitOfMembers: "",
    allowSubEvent: "",
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
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/event/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          image: credentials.image,
        }),
      });

      const json = await response.json();
      console.log(json);

      const addButton = document.getElementById("add");
      const saveButton = document.getElementById("save");

      if (response.status === 200) {
        if (addButton.style.display === "block") {
          alert("Event created Successfully");
          navigate("json._id/createCompetition");
        } else if (saveButton.style.display === "block") {
          alert("Event created Successfully");
        }
      } else {
        alert("Enter valid credentials");
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
      addButton.style.display = "block";
      saveButton.style.display = "none";
    } else {
      addButton.style.display = "none";
      saveButton.style.display = "block";
    }
  }
  return (
    <>
      <div className="bg-img">
        <div className="contente">
          <div id="container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "45%", marginBottom: "10px" }}>
                <div class="lablee">Title</div>
                <div class="fielde" style={{ height: "45px" }}>
                  <input
                    type="text"
                    name="title"
                    value={credentials.title}
                    required
                    placeholder="Event Title"
                    onChange={onchange}
                  />
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
              <div
                class="fielde"
                style={{ width: "100%", height: "70px", marginBottom: "10px" }}
              >
                <input
                  type="text"
                  name="description"
                  value={credentials.description}
                  required
                  placeholder="Event Description"
                  onChange={onchange}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "45%", marginBottom: "10px" }}>
                <div class="lablee">University</div>
                <div class="fielde" style={{ height: "45px" }}>
                  <input
                    type="text"
                    name="university"
                    value={credentials.university}
                    class="pass-key"
                    required
                    placeholder="University Name"
                    onChange={onchange}
                  />
                </div>
              </div>
              <div style={{ width: "45%", marginBottom: "10px" }}>
                <div class="lablee">Location</div>
                <div class="fielde" style={{ height: "45px" }}>
                  <input
                    type="text"
                    name="location"
                    value={credentials.location}
                    class="pass-key"
                    required
                    placeholder="Location"
                    onChange={onchange}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <div style={{ width: "20%", marginBottom: "10px" }}>
                <div class="lablee">Start Date</div>
                <div class="fielde" style={{ height: "45px" }}>
                  <input
                    type="date"
                    name="startingDate"
                    value={credentials.startingDate}
                    class="pass-key"
                    required
                    placeholder="dd-mm-yyyy"
                    onChange={onchange}
                  />
                </div>
              </div>
              <div style={{ width: "20%", marginBottom: "10px" }}>
                <div class="lablee">End Date</div>
                <div class="fielde" style={{ height: "45px" }}>
                  <input
                    type="date"
                    name="endingDate"
                    value={credentials.endingDate}
                    class="pass-key"
                    required
                    placeholder="dd-mm-yyyy"
                    onChange={onchange}
                  />
                </div>
              </div>
              <div style={{ width: "20%", marginBottom: "10px" }}>
                <div class="lablee">Registration Start Date</div>
                <div class="fielde" style={{ height: "45px" }}>
                  <input
                    type="date"
                    name="registrationStartDate"
                    value={credentials.registrationStartDate}
                    class="pass-key"
                    required
                    placeholder="dd-mm-yyyy"
                    onChange={onchange}
                  />
                </div>
              </div>
              <div style={{ width: "20%", marginBottom: "10px" }}>
                <div class="lablee">Registration End Date</div>
                <div class="fielde" style={{ height: "45px" }}>
                  <input
                    type="date"
                    name="registrationEndDate"
                    value={credentials.registrationEndDate}
                    class="pass-key"
                    required
                    placeholder="dd-mm-yyyy"
                    onChange={onchange}
                  />
                </div>
              </div>
            </div>
            <div style={{ marginBottom: "10px", display: "flex" }}>
              <div class="lablee">Allow SubEvents :</div>
              <input
                type="checkbox"
                name="allowSubEvent"
                value={credentials.allowSubEvent}
                id="allowSubEvent"
                required
                style={{ width: "5%", height: "15px" }}
                onClick={generateLimitFielde}
              />
              {/* <input type='checkbox'></input> */}
            </div>
            <div style={{ marginBottom: "20px" }}>
              <div class="lablee">Image</div>
              <div className="fielde" style={{ height: "40px" }}>
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
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="btn"
                id="add"
                style={{ display: "none", marginRight: "10px" }}
                onClick={handleSubmit}
              >
                Add
              </button>
              <button
                className="btn"
                id="save"
                style={{ display: "block" }}
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
