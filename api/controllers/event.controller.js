import Event from "../models/event.model.js";

export const createEvent = async (req, res, next) => {
    const {
        title,
        description,
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