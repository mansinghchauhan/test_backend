import { Dropdown } from "../../models";

export const CREATE_DROPDOWN = async (req, res) => {
  try {
    const dropdown = await Dropdown.create({
      ...req.body,
      author: req.user._id.toString(),
    });
    if (!dropdown) {
      return res.status(404).json({
        message: "Dropdown not created",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Dropdown created successfully",
      success: true,
      dropdown,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const UPDATE_DROPDOWN = async (req, res) => {
  try {
    const dropdown = await Dropdown.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id.toString() },
      {
        ...req.body,
      }
    );
    if (!dropdown) {
      return res.status(403).json({
        message: "dropdown not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "succesfully updated",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const DELETE_DROPDOWN = async (req, res) => {
  try {
    let dropdown = await Dropdown.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id.toString(),
    });

    if (!dropdown) {
      return res.status(404).json({
        message: "dropdown not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "succesfully deleted",
      success: true,
      dropdown,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const GET_DROPDOWN_BY_DROPDOWN_TYPE = async (req, res) => {
  try {
    const dropdownType = req.params.dropdownType;
    let dropdown = await Dropdown.find({ dropdownType });

    return res.status(201).json({
      dropdown,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal sevre error",
      success: false,
    });
  }
};
