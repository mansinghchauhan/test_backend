import { socialMedia } from "../../models";

import deleteFile from "../../utils/filedelete";

const socialMediaLabels = {
  docs: "socialMedia",
  limit: "perPage",
  nextPage: "next",
  prevPage: "prev",
  meta: "paginator",
  page: "currentPage",
  pagingCounter: "slNo",
  totalPages: "pageCount",
  totalDocs: "totalVideos",
};
export const CREATE_SOCIALMEDIA = async (req, res) => {
  try {
    const { title, message, videoIds } = req.body;
    const socialmedia = await socialMedia.create({
      ...req.body,
      author: req.user._id.toString(),
    });

    return res.status(201).json({
      socialmedia,
      message: "succesfully inserted",
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

export const UPDATE_SOCIALMEDIA = async (req, res) => {
  try {
    const id = req.params.id;

    let socialmedia = await socialMedia.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id.toString() },
      {
        ...req.body,
      }
    );
    if (!socialmedia) {
      return res.status(404).json({
        message: "socialMedia not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "socialMedia succesfully updated",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const DELETE_SOCIALMEDIA = async (req, res) => {
  try {
    let socialMediaResponse = null;
    let socialmedia = await socialMedia
      .findOne({
        _id: req.params.id,
        author: req.user._id.toString(),
      })
      .populate({ path: "socialMediaIds" });

    if (!socialmedia) {
      return res.status(403).json({
        message: "socialMedia not found",
        success: false,
      });
    }

    await socialMedia.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id.toString(),
    });

    await Promise.all(
      socialmedia.socialMediaIds.map(async (file) => await deleteFile(file))
    );

    return res.status(200).json({
      message: "socialMedia succesfully deleted",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const GET_SOCIALMEDIA = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const opts = {
      page: page || 1,
      limit: limit || 10,

      populate: [
        {
          path: "socialMediaIds",
          select: "filePath",
        },
        { path: "author", select: "name email" },
      ],

      customLabels: socialMediaLabels,
    };
    const socialmedia = await socialMedia.paginate(
      { author: req.user._id.toString() },
      opts
    );

    return res.status(200).json({
      socialmedia,
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

export const GET_SOCIALMedia_BY_ID = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const opts = {
      page: page || 1,
      limit: limit || 10,
      populate: [
        { path: "socialMediaIds", select: "filePath" },
        { path: "author", select: "name email" },
      ],
      customLabels: socialMediaLabels,
    };
    let socialmedia = await socialMedia.paginate({ _id: req.params.id }, opts);

    return res.status(200).json({
      socialmedia,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const GET_SOCIALMEDIA_BY_AUTHOR = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const opts = {
      page: page || 1,
      limit: limit || 10,
      populate: [
        { path: "socialMediaIds", select: "filePath" },
        { path: "author", select: "name email" },
      ],
      customLabels: socialMediaLabels,
    };
    let socialmedia = await socialMedia.paginate(
      { author: req.user._id.toString() },
      opts
    );

    return res.status(200).json({
      socialmedia,
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
