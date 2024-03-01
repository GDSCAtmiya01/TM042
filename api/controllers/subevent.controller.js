import Competition from "../models/sub_event.model.js";
import {Event} from "../models/event.model.js";
import University from "../models/university.model.js";

export const createCompetition = async (req, res, next) => {
    const {
        title,
        description,
        eventName,
        universityName,
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
        createdBy
    } = req.body;
    const newSubEvent = new Competition({
        title,
        description,
        eventName,
        universityName,
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
        createdBy
    });
    try {
        await newSubEvent.save();
        res.status(200).json("created new Competition successfully!");
    } catch (err) {
        next(err);
    }
};

export const getAllCompetition = async (req, res, next) => {
    try {
        res.send([global.Competitions])
    } catch (error) {
        res.send("Server Error")
    }
};

export const getFilteredCompetition = async (req, res, next) => {
    try {
        const id = req.params.id;
        const event = await Event.findById(id);
        const uniName = event.university;
        const university = await University.findOne({ universityName: uniName });
        res.send([university, event, global.Competitions])
    } catch (error) {
        res.send("Server Error")
    }
};

export const getDetailedCompetition = async (req, res, next) => {
    try {
        const id = req.params.id;
        const competition = await Competition.findById(id);
        res.send(competition)
    } catch (error) {
        res.send("Server Error")
    }
};

export const updateCompetition = async (req, res, next) => {


    const id = req.params.id;

    const { title, description, eventName, universityName, startingDate, endingDate, location, totalParticipants, image, resgestrationOpen,
        registrationStartDate, registrationEndDate, allowTeams, teams, limitOfMembers, createdBy } = req.body;


    try {
        const result = await Competition.updateOne({ _id: id }, {
            $set: {
                title, description, eventName, universityName, startingDate, endingDate, location, totalParticipants, image, resgestrationOpen,
                registrationStartDate, registrationEndDate, allowTeams, teams, limitOfMembers, createdBy
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

export const deleteCompetition = async (req, res, next) => {

    const id = req.params.id;
    try {
        const deletedEvent = await Competition.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ message: 'Competition not found' });
        }

        res.status(200).json({ message: 'Competition deleted successfully', deletedEvent });
    } catch (error) {
        console.error('Error deleting Competition:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

};