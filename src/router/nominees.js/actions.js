import { Nominee } from "../../models";
export const CREATE_NOMINEE = async (req, res) => {
  try {
    console.log(req.user._id.toString());
    let nominee = await Nominee.find({ user: req.user._id.toString() });
    if (nominee.length >= 2) {
      return res.status(404).json({
        message: "already two nominees created! please delete one of them",
        success: false,
      });
    }
    nominee = await Nominee.create({
      ...req.body,
      user: req.user._id.toString(),
    });

    if (!nominee) {
      return res.status(404).json({
        message: "Nominee not created",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Nominee  created Successfully",
      success: true,
      nominee,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const DELETE_NOMINEE = async (req, res) => {
  try {
    const { id } = req.params;
    let nominee = await Nominee.findByIdAndDelete({
      _id: id,
      author: req.user._id.toString(),
    });
    if (!nominee) {
      return res.status(404).json({
        message: "Nominee not found.",
        success: false,
      });
    }

    return res.status(202).json({
      message: "Nominee deleted succesfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const UPDATE_NOMINEE = async (req, res) => {
  try {
    const id = req.params.id;
    let nominee = await Nominee.findOneAndUpdate(
      {
        _id: id,
        user: req.user._id.toString(),
      },
      { ...req.body },
      { new: true }
    );

    if (!nominee) {
      return res.status(404).json({
        message: "Nominee not found.",
        success: false,
      });
    }

    return res.status(202).json({
      message: "Nominee updated succesfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const GET_NOMINEES = async (req, res) => {
  try {
    const nominee = await Nominee.find();

    return res.status(202).json({
      success: true,
      nominee,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const GET_NOMINEE_BY_USER = async (req, res) => {
  try {
    const id = req.params.id;
    let nominee = await Nominee.find({ user: req.user._id.toString() });

    if (!nominee) {
      return res.status(403).json({
        message: "Data not found",
        success: false,
      });
    }

    return res.status(202).json({
      success: true,
      nominee,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
