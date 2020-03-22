import mongoose, { Schema, Document } from "mongoose"

if (!process.env.PRODUCTION) {
    mongoose.connect("mongodb://localhost:27017/labshare", { useNewUrlParser: true }, err => {
        console.log(err)
    })
} else {
    mongoose.connect("mongodb://mongodb:27017/labshare", { useNewUrlParser: true }, err => {
        console.log(err)
    })
}



const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});


export interface IUserCommon extends Document {
    role: string
    location: {
        type: string
        coordinates: [number]
    },
    address: {
        city: string,
        zipcode: string,
        street: string,
    },
    description: string,
    password: string
}

export interface IUserHuman extends IUserCommon {
    firstname: string,
    lastname: string,
    contact: {
        email: string,
        phone: string,
    },
    
    details: {
        rnaExtraction: number,
        rtPcr: number,
        hoursPerWeek: number
    },
    available: boolean,
}


const user_human = new Schema({
    location: {
        type: pointSchema,
        required: true
    },
    address: new Schema({
        city: String,
        zipcode: String
    }),
    firstname: String,
    lastname: String,
    contact: new Schema({
        email: String,
        phone: String
    }),
    description: String,
    details: new Schema({
        rnaExtraction: Number,
        rtPcr: Number,
        hoursPerWeek: Number
    }),
    available: {type: Boolean, default: true},
    password: String
})


export interface IUserLab extends IUserCommon {
    labContact: {
        firstname: string,
        lastname: string,
        email: string,
        phone: string,
    }
    name: string,
    lookingFor: {
        humanRessources: boolean,
        devices: {
            rnaExtraction: boolean,
            testingKit: boolean
        },
        advice: {
            rnaExtraction: boolean,
            testingKit: boolean,
            dataEvaluation: boolean
        }
    }
}

const user_lab = new Schema({
    location: {
        type: pointSchema,
        required: true
    },
    address: new Schema({
        city: String,
        zipcode: String,
        street: String
    }),
    labContact: new Schema({
        firstname: String,
        lastname: String,
        email: String,
        phone: String
    }),
    name: String,
    description: String,
    password: String,
    lookingFor: new Schema({
        humanRessources: Boolean,
        devices: new Schema({
            rnaExtraction: Boolean,
            testingKit: Boolean
        }),
        advice: new Schema({
            rnaExtraction: Boolean,
            testingKit: Boolean,
            dataEvaluation: Boolean
        })
    })
})


export interface IResetToken extends Document {
    token: string,
    objectId: IUserHuman['_id']
}

const reset_token = new Schema({
    token: String,
    objectId: Schema.Types.ObjectId
})



export const User_Human = mongoose.model<IUserHuman>('user_human', user_human)
export const User_Lab = mongoose.model<IUserLab>('user_lab', user_lab)
export const Reset_Token = mongoose.model<IResetToken>('reset_token', reset_token)



export async function getUserForMail(email: string): Promise<Optional<IUserCommon>> {
    try {
        let human = await User_Human.findOne({ "contact.email": email }).exec()
        if (!human) {
            throw new Error("not found")
        }
        return human
    } catch { }

    try {
        let lab = await User_Lab.findOne({ 'labContact.email': email }).exec()
        if (!lab) {
            throw new Error("not found")
        }
        return lab
    } catch {
        return undefined
    }
}

export async function getUser(filter: any): Promise<Optional<IUserCommon>> {
    try {
        let human = await User_Human.findOne(filter).exec()
        if (!human) {
            throw new Error("not found")
        }
        return human
    } catch { }

    try {
        let lab = await User_Lab.findOne(filter).exec()
        if (!lab) {
            throw new Error("not found")
        }
        return lab
    } catch {
        return undefined
    }
}

