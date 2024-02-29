import University from "../models/university.model.js";

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
        res.status(200).json("Added new University successfully!");
    } catch (err) {
        next(err);
    }
};

export const getAllUniversity = async (req, res, next) => {
    try {
        res.send(global.university)
    } catch (error) {
        res.send("Server Error")
    }
};

export const updateUniversity = async (req, res, next) => {

    const id = req.params.id;
    const { universityName,
        universityCode,
        admins } = req.body;


    try {
        const result = await University.updateOne({ _id: id }, {
            $set: {
                universityName,
                universityCode,
                admins
            }
        });
        if (result.matchedCount === 0) {
            res.status(404).json({ message: 'University not found' });
        } else {
            res.status(200).json({ message: 'University updated successfully' });
        }
    } catch (error) {
        console.error('Error updating University:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteUniversity = async (req, res, next) => {

    const id = req.params.id;
    try {
        const deletedEvent = await University.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ message: 'University not found' });
        }

        res.status(200).json({ message: 'University deleted successfully', deletedEvent });
    } catch (error) {
        console.error('Error removing University:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

};