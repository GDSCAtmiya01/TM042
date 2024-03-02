import {Event, Team} from "../models/event.model.js"; 
// import Team from "../models/event.model.js";
import University from "../models/university.model.js";
import User from "../models/user.model.js";
// import atmEvent from '../models/event.model'

export const createEvent = async (req, res, next) => {
    const {
        title,
        description,
        university,
        startingDate,
        endingDate,
        location,
        totalParticipants,
        image,
        resgestrationOpen,
        registrationStartDate,
        registrationEndDate,
        allowTeams,
        teams,
        limitOfMembers,
        allowSubEvents,
        subEvents
    } = req.body;
    const newEvent = new Event({
        title,
        description,
        university,
        startingDate,
        endingDate,
        location,
        totalParticipants,
        image,
        resgestrationOpen,
        registrationStartDate,
        registrationEndDate,
        allowTeams,
        teams,
        limitOfMembers,
        allowSubEvents,
        subEvents
    });
    try {
        await newEvent.save();
        res.status(200).json(newEvent._id);
    } catch (err) {
        next(err);
    }
};

export const getAllEvent = async (req, res, next) => {
    try {
        res.send(global.Events)
    } catch (error) {
        res.send("Server Error")
    }
};

export const getFilteredEvent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const uni = await University.findById(id);
        res.send([uni, global.Events])
    } catch (error) {
        res.send("Server Error")
    }
};

export const updateEvent = async (req, res, next) => {


    const id = req.params.id;
    const updateOps = {};
    const { title, description, university, startingDate, endingDate, location, totalParticipants, image, resgestrationOpen,
        registrationStartDate, registrationEndDate, allowTeams, teams, limitOfMembers, allowSubEvents, subEvents } = req.body;


    try {
        const result = await Event.updateOne({ _id: id }, {
            $set: {
                title, description, university, startingDate, endingDate, location, totalParticipants, image, resgestrationOpen,
                registrationStartDate, registrationEndDate, allowTeams, teams, limitOfMembers, allowSubEvents, subEvents
            }
        });
        if (result.matchedCount === 0) {
            res.status(404).json({ message: 'Document not found' });
        } else {
            res.status(200).json({ message: 'Document updated successfully', id : id });
        }
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteEvent = async (req, res, next) => {

    const id = req.params.id;
    try {
        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully', deletedEvent });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

};

export const getEventTeams = async (req, res, next) => {
    const id = req.params.id; //this is event id
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const data = [];
        let teams = [];
        for (let i = 0; i < event.teams.length; i++) {
            const team = await Team.findById(event.teams[i]);
            teams.push(team);
        }
        for (let i = 0; i < teams.length; i++) {
            let members = [];
            for (let j = 0; j < teams[i].teamMembers.length; j++) {
                const user = await User.findById(teams[i].teamMembers[j]);
                members.push(user.username);
            }
            console.log(members);
            let teamData = {
                teamName: teams[i].teamName,
                teamMembers: members || "data not fetched"
            }
            data.push(teamData);
        }
        res.status(200).json(data);
    }catch (err) {
        console.error('Error getting event:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createTeam = async (req, res, next) => {
    const { teamName, teamMembers } = req.body;
    const id = req.params.Eventid
    const newTeam = new Team({
        teamName,
        teamMembers
    });
    try {
        await newTeam.save();
        console.log(newTeam._id)
        const event = await Event.findById(id);
        event.teams.push(newTeam._id);
        await event.save();
        res.status(200).json({"message" : "created new team successfully!", "Teamid" : newTeam._id});
    } catch (err) {
        next(err);
    }
};