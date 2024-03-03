import mongoose from "mongoose";

const university = mongoose.Schema(
    {
        universityName: { type: String, required: true },

        universityCode: { type: String, required: true },

        image : { type:String, require:true, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHXi6kWCo1P3qJAuOnEAs6jWS1Dg1BqRkk8Q&usqp=CAU"},

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