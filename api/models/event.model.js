import mongoose from "mongoose";

const teamSchema = mongoose.Schema(
  {
      teamName: { type: String, required: true },
      teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // this field is ref to the user schema
      // this field is ref to the user schema
  }
)

const subEvents = mongoose.Schema(
  {
    title: { type: String, required: true },

    description: { type: String, required: true },

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


const Team = mongoose.model('atm_team', teamSchema);

const SubEvent = mongoose.model("atm_subEvent", subEvents);

const eventTable = new mongoose.Schema(
  {
    title: { type: String, required: true },

    description: { type: String, required: true },

    university : { type: String, required:true },

    startingDate: { type: Date, required: true },

    endingDate: { type: Date, required: true },

    location: { type: String, required: true },

    totalParticipants: { type: Number, required: true, default: 0 },

    image: { type: String, required: true },

    resgistrationOpen: { type: Boolean, required: true, default: true },

    registrationStartDate: { type: Date, required: true },

    registrationEndDate: { type: Date, required: true },

    allowTeams: { type: Boolean, required: false, default: false },

    teams: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
      default: [],
      required: false
  },
   // if allowTeams is true then this field is required
    // this field is ref to the team schema

    limitOfMembers: { type: Number, required: false, default: 1 },

    allowSubEvent: { type: Boolean, required: true, default: false },

    // subEvents: {
    //   type : [{type: mongoose.Schema.Types.ObjectId, ref: 'SubEvent'}],
    //   default: [],
    //   required: false 
      // if allowSubEvent is true then this field is required
    // this field is ref to the subEvent schema
  // },
},
  { timestamps: true }
);



const Event = mongoose.model("atm_event", eventTable);

export {
  Event,
  Team, 
} ;
