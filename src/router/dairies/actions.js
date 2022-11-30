import { Diary } from "../../models";

const diaryLabels = {
  docs: "diary",
  limit: "perPage",
  nextPage: "next",
  prevPage: "prev",
  meta: "paginator",
  page: "currentPage",
  pagingCounter: "slNo",
  totalPages: "pageCount",
  totalDocs: "totalDiaries",
};
export const CREATE_DIARY = async (req, res) => {
  try {
    const { title, description } = req.body;
    const diary = await Diary.create({
      ...req.body,
      author: req.user._id.toString(),
    });

    return res.status(201).json({
      message: "successfully created Diary",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
export const DELETE_DIARY = async (req, res) => {
  try {
    const { id } = req.params;
    let diary = await Diary.findOneAndDelete({
      _id: id,
      author: req.user._id.toString(),
    });
    if (!diary) {
      return res.status(404).json({
        message: "Diary not found.",
        success: false,
      });
    }

    return res.status(202).json({
      message: "Diary deleted succesfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const UPDATE_DIARY = async (req, res) => {
  try {
    const id = req.params.id;

    let diary = await Diary.findOne({
      _id: id,
      author: req.user._id.toString(),
    });
    if (!diary) {
      return res.status(404).json({
        message: "Diary not found.",
        success: false,
      });
    }

    const { title, description } = req.body;
    const dairyvalues = {
      title,
      description,
      author: req.user._id.toString(),
    };
    await Diary.findByIdAndUpdate(req.params.id, dairyvalues);

    return res.status(202).json({
      message: "Diary updated succesfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const GET_DIARY = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const opts = {
      page: page || 1,
      limit: limit || 10,
      customLabels: diaryLabels,
    };
    // let diary = await Diary.find({ author: req.user._id.toString() });
    let diary = await Diary.paginate({ author: req.user._id.toString() }, opts);
    return res.status(201).json({
      diary,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal sevre error",
      success: false,
    });
  }
};

export const GETDIARY_BYID = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    let diary = await Diary.findById({
      _id: id,
      author: req.user._id.toString(),
    });
    return res.status(201).json({
      diary,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
