import { Motto } from "../../models";
const mottoLabels = {
  docs: "mottos",
  limit: "perPage",
  nextPage: "next",
  prevPage: "prev",
  meta: "paginator",
  page: "currentPage",
  pagingCounter: "slNo",
  totalPages: "pageCount",
  totalDocs: "totalMotto",
};
export const CREATE_MOTTO = async (req, res) => {
  try {
    // console.log(req.body);
    // const audioname = "/uploads/" + req.files["audio"][0]["filename"];
    // const videoname = "/uploads/" + req.files["video"][0]["filename"];
    // const image = "/uploads/" + req.files["image"][0]["filename"];

    const motto = await Motto.create({
      ...req.body,
      author: req.user._id,
    });

    return res
      .status(201)
      .json({ message: "Motto created successfully.", motto });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const DELETE_MOTTO = async (req, res) => {
  try {
    const { id } = req.params;
    let motto = await Motto.findByIdAndDelete({
      _id: id,
      author: req.user._id.toString(),
    });
    if (!motto) {
      return res.status(404).json({
        message: "Motto not found.",
        success: false,
      });
    }

    return res.status(202).json({
      message: "User deleted succesfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const UPDATE_MOTO = async (req, res) => {
  try {
    const id = req.params.id;
    let motto = await Motto.findOneAndUpdate(
      {
        _id: id,
        author: req.user._id.toString(),
      },
      { ...req.body },
      { new: true }
    );

    if (!motto) {
      return res.status(404).json({
        message: "Motto not found.",
        success: false,
      });
    }

    return res.status(202).json({
      message: "dairy updated succesfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
// const filestorageengine = multer.diskStorage({
//   destination: (req, File, cb) => {
//     cb(null, "./Images");
//   },
//   filename: (req, File, cb) => {
//     cb(null, Date.now() + "--" + File.originalname);
//   },
// });
// export const upload = multer({ storage: filestorageengine });
export const GET_MOTO = async (req, res) => {
  try {
    const id = req.params.id;
    const { page, limit } = req.query;
    const opt = {
      page: page || 1,
      limit: limit || 10,
      populate: {
        path: "author",
        select: "name email",
      },
      customLabels: mottoLabels,
    };

    let motto = await Motto.paginate({ author: req.user._id.toString() }, opt);

    return res.status(202).json({
      success: true,
      motto,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const GET_MOTO_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;
    let motto = await Motto.findById({ _id: req.params.id });

    if (!motto) {
      return res.status(403).json({
        message: "Data not found",
        success: false,
      });
    }

    return res.status(202).json({
      success: true,
      motto,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
