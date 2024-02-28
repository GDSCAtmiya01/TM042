import University from "../models/university.model";

export const createUniversity = async (req, res, next) => {
    const {
        universityName,
        universityCode,
        admins
    } = req.body;
    const newUni = new University({
        universityName,
        universityCode,
        admins
    });
    try {
        await newUni.save();
        res.status(200).json("created new event successfully!");
    } catch (err) {
        next(err);
    }
};

export const getAllEvent = async (req, res, next) => {
    try {
        res.send([global.Events])
    } catch (error) {
        res.send("Server Error")
    }
};

export const updateEvent = async (req, res, next) => {


    const id = req.params.id;
    const updateOps = {};
    const { universityName,
        universityCode,
        admins } = req.body;


    try {
        const result = await Event.updateOne({ _id: id }, {
            $set: {
                universityName,
                universityCode,
                admins
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