import University from "../models/university.model.js";

export const createUniversity = async (req, res, next) => {
    const {
        username,
        universityName
    } = req.body;

    const uniExist = await University.findOne({ universityName });
    const adminCode = generateRandomNumber();
    console.log(universityName);
    const uniCode = universityName.toString().split(' ');
    const universityCode = uniCode[0].indexOf(0) + uniCode[1].indexOf(0);
    const admins = [{adminName:username,adminCode}];

    if (uniExist) {
         uniExist.admins.push({adminName:username,adminCode});
         await uniExist.save();
         console.log("exist")
         res.status(200).json(adminCode);
    }else{
        const newUni = new University({
            universityName,
            universityCode,
            admins
        });
        console.log("created")
        try {
            await newUni.save();
            res.status(200).json(adminCode);
        } catch (err) {
            next(err);
        }
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
        admins, image } = req.body;


    try {
        const result = await University.updateOne({ _id: id }, {
            $set: {
                universityName,
                universityCode,
                admins,
                image
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

export const checkAdminCode = async (req, res, next) => {
    const adminCodee = req.body.adminCode
    const admin = await University.findOne({ admins: { $elemMatch: { adminCode: adminCodee } }});
    console.log(adminCodee)
    if(admin){
        res.status(200).json({"msg" : "Admin code is correct", "universityId":admin._id, "admin":admin})
    }
    else{
        res.status(401).json("Admin code is incorrect")
    }
};

function generateRandomNumber () {
    let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += arr[Math.floor(Math.random() * arr.length)];
    }
    return code
}


export const getOneUniversity = async (req, res, next) => {
    try {
        const id = req.params.id;
        const university = await University.findById(id);
        res.send(university)
    } catch (error) {
        res.send("Server Error")
    }
}

export const getUniversityByUserId = async (req, res, next) => {
    
}