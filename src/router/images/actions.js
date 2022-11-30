import { Image } from "../../models";
import FileDelete from "../../utils/filedelete";
import deleteFile from "../../utils/filedelete";

const imageLabels = {
  docs: "image",
  limit: "perPage",
  nextPage: "next",
  prevPage: "prev",
  meta: "paginator",
  page: "currentPage",
  pagingCounter: "slNo",
  totalPages: "pageCount",
  totalDocs: "totalImages",
};

export const CREATE_IMAGE = async (req, res) => {
  try {
    const image = await Image.create({
      ...req.body,
      author: req.user._id.toString(),
    });
    if (!image) {
      return res.status(404).json({
        message: "image not created",
        success: false,
      });
    }
    return res.status(200).json({
      message: "image created successfully",
      success: true,
      image,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
      err,
    });
  }
};

export const UPDATE_IMAGE = async (req, res) => {
  try {
    const image = await Image.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id.toString() },
      {
        ...req.body,
      }
    );

    if (!image) {
      return res.status(404).json({
        message: "image not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "image succesfully updated",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const DELETE_IMAGE = async (req, res) => {
  try {
    const image = await Image.findOne({
      _id: req.params.id,
      author: req.user._id.toString(),
    }).populate({ path: "imageIds" });

    if (!image) {
      return res.status(403).json({
        message: "image not found",
        success: false,
      });
    }
    await Image.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id.toString(),
    });

    await Promise.all(
      image.imageIds.map(async (file) => await deleteFile(file))
    );

    return res.status(200).json({
      message: "succesfully deleted",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const GET_IMAGE = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const opts = {
      page: page || 1,
      limit: limit || 10,

      populate: [
        {
          path: "imageIds",
          select: "filePath",
        },
        { path: "author", select: "name email" },
      ],

      customLabels: imageLabels,
    };
    const images = await Image.paginate(
      { author: req.user._id.toString() },
      opts
    );

    return res.status(200).json({
      images,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const GET_IMAGE_BY_ID = async (req, res) => {
  try {
    // const { page, limit } = req.query;
    // const opts = {
    //   page: page || 1,
    //   limit: limit || 10,
    //   populate: [
    //     { path: "imageIds", select: "filePath" },
    //     { path: "author", select: "name email" },
    //   ],
    //   customLabels: imageLabels,
    // };
    let image = await Image.findById({ _id: req.params.id }).populate([
      { path: "imageIds", select: "filePath" },
      { path: "author", select: "name email" },
    ]);

    return res.status(200).json({
      image,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const GET_IMAGE_BY_AUTHOR = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const opts = {
      page: page || 1,
      limit: limit || 10,
      populate: [
        { path: "imageIds", select: "filePath" },
        { path: "author", select: "name email" },
      ],
      customLabels: imageLabels,
    };
    let image = await Image.paginate({ author: req.user._id.toString() }, opts);

    return res.status(200).json({
      image,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
