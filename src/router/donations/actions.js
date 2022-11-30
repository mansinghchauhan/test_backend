
import { Donation } from '../../models';

export const CREATE_NEW_DONATIONS = async (req, res) => {
    try {
        const { type } = req.body;

        let donation = await Donation.findOne({ user: req.user._id.toString() });
        console.log(donation)
        if (donation) {
            return res.status(201).json({
                message: "Donation Already exists",
                success: false
            });
        }
        console.log("Hello")
        if (type === 'organs') {
            donation = await Donation.create({ organs: req.body.data, user: req.user._id.toString(), });
        } else if (type === 'belongings') {
            donation = await Donation.create({ belongings: req.body.data, user: req.user._id.toString(), });
        } else if (type === 'causes') {
            donation = await Donation.create({ causes: req.body.data, user: req.user._id.toString(), });
        } else {
            return res.status(403).json({
                message: "Invalid Type of donation.",
                success: false
            });
        }
        return res.status(201).json({
            message: "Donation request added.",
            donation
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Unable to add Donation request.",
            success: false
        });
    }
}

export const UDPATE_DONATION = async (req, res) => {
    try {
        const { id, type } = req.params;
        const donation = await Donation.findById(id);
        if (type === 'organs') {
            donation.organs = req.body.data;
        } else if (type === 'belongings') {
            donation.belongings = req.body.data;
        } else if (type === 'causes') {
            donation.causes = req.body.data;

        } else {
            return res.status(403).json({
                message: "Invalid Type of donation.",
                success: false``
            });
        }

        const updatedDonation = await donation.save();
        return res.status(201).json({
            message: "Donation request updated.",
            donation: donation
        });
    } catch (err) {
        return res.status(500).json({
            message: "Unable to update the Donation request.",
            success: false
        });
    }
}

export const UPDATE_DONATION_ENTITY = async (req, res) => {
    try {
        const { id, type } = req.params;
        const donation = await Donation.findOne({ _id: id, author: req.user._id.toString() });
        if (type === 'organs') {
            donation.organs.push(req.body.data);
        } else if (type === 'belongings') {
            donation.belongings.push(req.body.data);
        } else if (type === 'causes') {
            donation.causes.push(req.body.data);
        } else {
            return res.status(403).json({
                message: "Invalid Type of donation.",
                success: false
            });
        }
        const updatedDonation = await donation.save();
        return res.status(201).json({
            message: "Donation request updated.",
            donation: updatedDonation
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Unable to update the Donation request.",
            success: false
        });
    }
}

export const DELETE_DONATION_ENTITY = async (req, res) => {
    try {
        const { id, entity, type } = req.params;
        const donation = await Donation.findOne({ _id: id, author: req.user._id.toString() });
        if (type === 'organs') {
            donation.organs = donation.organs.filter(organ => organ._id.toString() !== entity);
        } else if (type === 'belongings') {
            donation.belongings = donation.belongings.filter(belonging => belonging._id.toString() !== entity);
        } else if (type === 'causes') {
            donation.causes = donation.causes.filter(cause => cause._id.toString() !== entity);
        } else {
            return res.status(403).json({
                message: "Invalid Type of donation.",
                success: false
            });
        }
        const updatedDonation = await donation.save();
        return res.status(201).json({
            message: "Donation request updated.",
            donation: updatedDonation
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Unable to update the Donation request.",
            success: false
        });
    }
}

export const GET_DONATIONS_BY_USER = async (req, res) => {
    try {
        const donations = await Donation.find({ user: req.user._id.toString() }).populate(
            [
                { path: 'organs.type' },
                { path: 'causes.causes' },
                { path: 'belongings.type' },
                { path: 'belongings.image' },
                { path: 'belongings.relation' },
            ]
        );
        return res.status(200).json(donations);
    } catch (err) {
        console.log("ERR", err);
        return res.status(500).json({
            message: "Unable to get the Donation request.",
            success: false
        });
    }
}