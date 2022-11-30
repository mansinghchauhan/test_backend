import { Audio } from "../../models";
import deleteFile from "../../utils/filedelete";
import { File } from "../../models";
const audioLabels = {
  docs: "audios",
  limit: "perPage",
  nextPage: "next",
  prevPage: "prev",
  meta: "paginator",
  page: "currentPage",
  pagingCounter: "slNo",
  totalPages: "pageCount",
  totalDocs: "totalAudios",
};

export const CREATE_AUDIO = async (req, res) => {
  try {
    const audio = await Audio.create({
      ...req.body,
      author: req.user._id.toString(),
    });
    if (!audio) {
      return res.status(404).json({
        message: "Audio not created",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Audio created successfully",
      success: true,
      audio,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const UPDATE_AUDIO = async (req, res) => {
  try {
    const audio = await Audio.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id.toString() },
      {
        ...req.body,
      }
    );
    if (!audio) {
      return res.status(403).json({
        message: "audio not found",
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

export const DELETE_AUDIO = async (req, res) => {
  try {
    const audio = await Audio.findOne({
      _id: req.params.id,
      author: req.user._id.toString(),
    }).populate({ path: "audioIds" });
    if (!audio) {
      return res.status(403).json({
        message: "audio not found",
        success: false,
      });
    }
    await Audio.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id.toString(),
    });

    await Promise.all(
      audio.audioIds.map(async (file) => await deleteFile(file))
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

export const GET_AUDIOS = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const opts = {
      page: page || 1,
      limit: limit || 10,
      populate: [
        {
          path: "audioIds",
          select: "filePath",
        },
        {
          path: "author",
          select: "name email",
        },
      ],
      customLabels: audioLabels,
    };

    const audios = await Audio.paginate(
      { author: req.user._id.toString() },
      opts
    );

    return res.status(200).json(audios);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
export const GET_AUDIO_BY_ID = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const opts = {
      page: page || 1,
      limit: limit || 10,
      populate: [
        {
          path: "audioIds",
          select: "filePath",
        },
        {
          path: "author",
          select: "name email",
        },
      ],
      customLabels: audioLabels,
    };

    const audios = await Audio.paginate({ _id: req.params.id }, opts);

    return res.status(200).json({
      audios,
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
export const GET_AUDIO_BY_AUTHOR = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const opts = {
      page: page || 1,
      limit: limit || 10,
      populate: [
        {
          path: "audioIds",
          select: "filePath",
        },
        {
          path: "author",
          select: "name email",
        },
      ],
      customLabels: audioLabels,
    };

    const audios = await Audio.paginate(
      { author: req.user._id.toString() },
      opts
    );

    return res.status(200).json({
      audios,
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
