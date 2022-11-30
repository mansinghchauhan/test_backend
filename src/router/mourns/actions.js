import { Mourn } from "../../models";

const mournLabels = {
  docs: "mourn",
  limit: "perPage",
  nextPage: "next",
  prevPage: "prev",
  meta: "paginator",
  page: "currentPage",
  pagingCounter: "slNo",
  totalPages: "pageCount",
  totalDocs: "totalMourn",
};
export const CREATE_MOURN = async (req, res) => {
  try {
    const mourn = await Mourn.create({
      ...req.body,
      author: req.user._id.toString(),
    });
    if (!mourn) {
      return res.status(404).json({
        message: "Mourn not created",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Mourn  created Successfully",
      success: true,
      mourn,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const DELETE_MOURN = async (req, res) => {
  try {
    const { id } = req.params;
    let mourn = await Mourn.findByIdAndDelete({
      _id: id,
      author: req.user._id.toString(),
    });
    if (!mourn) {
      return res.status(404).json({
        message: "Mourn not found.",
        success: false,
      });
    }

    return res.status(202).json({
      message: "Mourn deleted succesfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const UPDATE_MOURN = async (req, res) => {
  try {
    const id = req.params.id;
    let mourn = await Mourn.findOneAndUpdate(
      {
        _id: id,
        author: req.user._id.toString(),
      },
      { ...req.body },
      { new: true }
    );

    if (!mourn) {
      return res.status(404).json({
        message: "Mourn not found.",
        success: false,
      });
    }

    return res.status(202).json({
      message: "mourn updated succesfully",
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
export const GET_MOURN = async (req, res) => {
  try {
    const id = req.params.id;
    const { page, limit } = req.query;
    const opt = {
      page: page || 1,
      limit: limit || 10,
      populate: [
        {
          path: "author",
          select: "name email",
        },
        {
          path: "cremateType",
          select: "dropdownItem",
        },
      ],
      customLabels: mournLabels,
    };

    const mourn = await Mourn.paginate(
      { author: req.user._id.toString() },
      opt
    );

    return res.status(202).json({
      success: true,
      mourn,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const GET_MOURN_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;
    let mourn = await Mourn.findById({ _id: req.params.id }).populate([
      {
        path: "author",
        select: "name email",
      },
      {
        path: "cremateType",
        select: "dropdownItem",
      },
    ]);

    if (!mourn) {
      return res.status(403).json({
        message: "Data not found",
        success: false,
      });
    }

    return res.status(202).json({
      success: true,
      mourn,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
