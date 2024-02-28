import mongoose from "mongoose";

const university = mongoose.Schema(
    {
        universityName: { type: String, required: true },

        universityCode: { type: String, required: true },

        admins: {
            type: [
                {
                    adminName: { type:String, required: true},
                    adminCode: { type:String, required: true}
                }
            ]
        }

    },
    { timestamps: true }
);


const University = mongoose.model("atm_university", university);

export default University