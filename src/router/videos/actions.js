import { Video } from "../../models";
import deleteFile from "../../utils/filedelete";

const videoLabels = {
  docs: "videos",
  limit: "perPage",
  nextPage: "next",
  prevPage: "prev",
  meta: "paginator",
  page: "currentPage",
  pagingCounter: "slNo",
  totalPages: "pageCount",
  totalDocs: "totalVideos",
};
export const CREATE_VIDEO = async (req, res) => {
  try {
    const { title, message, videoUrl } = req.body;
    const video = await Video.create({
      ...req.body,
      author: req.user._id.toString(),
    });

    return res.status(201).json({
      video,
      message: "succesfully inserted",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const UPDATE_VIDEO = async (req, res) => {
  try {
    const id = req.params.id;

    let video = await Video.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id.toString() },
      {
        ...req.body,
      }
    );
    if (!video) {
      return res.status(404).json({
        message: "video not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "video succesfully updated",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const DELETE_VIDEO = async (req, res) => {
  try {
    let videoResponse = null;
    let video = await Video.findOne({
      _id: req.params.id,
      author: req.user._id.toString(),
    }).populate({ path: "videoIds" });

    if (!video) {
      return res.status(403).json({
        message: "video not found",
        success: false,
      });
    }

    await Video.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id.toString(),
    });

    await Promise.all(
      video.videoIds.map(async (file) => await deleteFile(file))
    );

    return res.status(200).json({
      message: "Video succesfully deleted",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const GET_VIDEO = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const opts = {
      page: page || 1,
      limit: limit || 10,

      populate: [
        {
          path: "videoIds",
          select: "filePath",
        },
        { path: "author", select: "name email" },
      ],
      customLabels: videoLabels,
    };
    const videos = await Video.paginate(
      { author: req.user._id.toString() },
      opts
    );

    return res.status(200).json({
      videos,
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

export const GET_VIDEO_BY_ID = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const opts = {
      page: page || 1,
      limit: limit || 10,
      populate: [
        {
          path: "videoIds",
          select: "filePath",
        },
        { path: "author", select: "name email" },
      ],
      customLabels: videoLabels,
    };
    let video = await Video.paginate({ _id: req.params.id }, opts);

    return res.status(200).json({
      video,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const GET_VIDEO_BY_AUTHOR = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const opts = {
      page: page || 1,
      limit: limit || 10,
      populate: [
        { path: "videoIds", select: "filePath" },
        { path: "author", select: "name email" },
      ],
      customLabels: videoLabels,
    };
    let video = await Video.paginate({ author: req.user._id.toString() }, opts);

    return res.status(200).json({
      video,
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
