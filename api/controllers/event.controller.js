import Event from "../models/event.model.js";
import University from "../models/university.model.js";
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
        res.status(200).json("created new event successfully!");
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
            res.status(200).json({ message: 'Document updated successfully' });
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