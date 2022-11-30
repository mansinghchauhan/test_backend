import { Schema, model } from 'mongoose';

const BelongingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'dropdowns'
    },
    relation: {
        type: Schema.Types.ObjectId,
        ref: 'dropdowns'
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'files'
    }
}, {
    timestamps: true
});

const OrganSchema = new Schema({
    hospital: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'dropdowns'
    },
}, {
    timestamps: true
});


const CauseSchema = new Schema({
    organization: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    causes: {
        type: Schema.Types.ObjectId,
        ref: 'dropdowns'
    },
}, {
    timestamps: true
});

const DonationSchema = new Schema({
    organs: [OrganSchema],
    causes: [CauseSchema],
    belongings: [BelongingSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true
});

const Donation = model('donations', DonationSchema);
export default Donation;