import { Gift } from "../../models";

import deleteFile from "../../utils/filedelete";

const giftLabels = {
  docs: "gift",
  limit: "perPage",
  nextPage: "next",
  prevPage: "prev",
  meta: "paginator",
  page: "currentPage",
  pagingCounter: "slNo",
  totalPages: "pageCount",
  totalDocs: "totalVideos",
};
export const CREATE_GIFT = async (req, res) => {
  try {
    const { title, message, videoIds, link, categorieId, relationId } =
      req.body;
    const gift = await Gift.create({
      ...req.body,
      author: req.user._id.toString(),
    });

    return res.status(201).json({
      gift,
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

export const UPDATE_GIFT = async (req, res) => {
  try {
    const id = req.params.id;

    let gift = await Gift.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id.toString() },
      {
        ...req.body,
      }
    );
    if (!gift) {
      return res.status(404).json({
        message: "gift not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "gift succesfully updated",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const DELETE_GIFT = async (req, res) => {
  try {
    let Response = null;
    let gift = await Gift.findOne({
      _id: req.params.id,
      author: req.user._id.toString(),
    }).populate({
      path: "videoIds",
      select: "filePath",
    });

    if (!gift) {
      return res.status(403).json({
        message: "gift not found",
        success: false,
      });
    }

    await Gift.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id.toString(),
    });

    await Promise.all(
      gift.videoIds.map(async (file) => await deleteFile(file))
    );

    return res.status(200).json({
      message: "gift succesfully deleted",
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

export const GET_GIFT = async (req, res) => {
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
        {
          path: "relationId",
          select: "dropdownItem",
        },
        {
          path: "categoryId",
          select: "dropdownItem",
        },
        { path: "author", select: "name email" },
      ],

      customLabels: giftLabels,
    };
    const gift = await Gift.paginate({ author: req.user._id.toString() }, opts);

    return res.status(200).json({
      gift,
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

export const GET_GIFT_BY_ID = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const opts = {
      page: page || 1,
      limit: limit || 10,
      populate: [
        { path: "videoIds", select: "filePath" },
        { path: "author", select: "name email" },
        {
          path: "relationId",
          select: "dropdownItem",
        },
        {
          path: "categoryId",
          select: "dropdownItem",
        },
      ],
      customLabels: giftLabels,
    };
    let gift = await Gift.paginate({ _id: req.params.id }, opts);

    return res.status(200).json({
      gift,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const GET_GIFT_BY_AUTHOR = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const opts = {
      page: page || 1,
      limit: limit || 10,
      populate: [
        { path: "videoIds", select: "filePath" },
        { path: "author", select: "name email" },
        {
          path: "relationId",
          select: "dropdownItem",
        },
        {
          path: "categoryId",
          select: "dropdownItem",
        },
      ],
      customLabels: giftLabels,
    };
    let gift = await Gift.paginate({ author: req.user._id }, opts);

    return res.status(200).json({
      gift,
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
