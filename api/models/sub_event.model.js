import mongoose from "mongoose";

const competition = mongoose.Schema(
    {
        title: { type: String, required: true },

        description: { type: String, required: true },

        eventName : { type: String, required: true},

        universityName: { type: String, required: true },

        startingDate: { type: Date, required: true },

        endingDate: { type: Date, required: true },

        location: { type: String, required: true },

        totalParticipants: { type: Number, required: true, default: 0 },

        image: { type: String, required: true },

        resgestrationOpen: { type: Boolean, required: true, default: true },

        registrationStartDate: { type: Date, required: true },

        registrationEndDate: { type: Date, required: true },

        allowTeams: { type: Boolean, required: true, default: false },

        teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],

        limitOfMembers: { type: Number, required: true, default: 1 },

        createdBy: { type: String, required: true },
    },
    { timestamps: true }
);


const Competition = mongoose.model("atm_competition", competition);

export default Competition