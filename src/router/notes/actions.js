import { Note } from "../../models";
import deleteFile from "../../utils/filedelete";
const noteLabels = {
  docs: "notes",
  limit: "perPage",
  nextPage: "next",
  prevPage: "prev",
  meta: "paginator",
  page: "currentPage",
  pagingCounter: "slNo",
  totalPages: "pageCount",
  totalDocs: "totalAudios",
};

export const CREATE_NOTE = async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      author: req.user._id.toString(),
    });
    if (!note) {
      return res.status(404).json({
        message: "Note not created",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Note created successfully",
      success: true,
      note,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const UPDATE_NOTE = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id.toString() },
      {
        ...req.body,
      }
    );
    if (!note) {
      return res.status(403).json({
        message: "note not found",
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

export const DELETE_NOTE = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      author: req.user._id.toString(),
    }).populate([
      {
        path: "imageIds",
        select: "filePath",
      },
      {
        path: "mediaIds",
        select: "filePath",
      },
    ]);
    if (!note) {
      return res.status(403).json({
        message: "note not found",
        success: false,
      });
    }
    await Note.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id.toString(),
    });

    await Promise.all([
      ...note.imageIds.map(async (file) => await deleteFile(file)),
      ...note.mediaIds.map(async (file) => await deleteFile(file)),
    ]);

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

export const GET_NOTES = async (req, res) => {
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
        {
          path: "mediaIds",
          select: "filePath",
        },
        {
          path: "author",
          select: "name email",
        },
        {
          path: "relationId",
          select: "dropdownItem",
        },
      ],
      customLabels: noteLabels,
    };

    const notes = await Note.paginate(
      { author: req.user._id.toString() },
      opts
    );

    return res.status(200).json(notes);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
export const GET_NOTE_BY_ID = async (req, res) => {
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
        {
          path: "mediaIds",
          select: "filePath",
        },
        {
          path: "author",
          select: "name email",
        },
        {
          path: "relationId",
          select: "dropdownItem",
        },
      ],
      customLabels: noteLabels,
    };

    const notes = await Note.paginate({ _id: req.params.id }, opts);

    return res.status(200).json({
      notes,
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
export const GET_NOTE_BY_AUTHOR = async (req, res) => {
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
        {
          path: "mediaIds",
          select: "filePath",
        },
        {
          path: "author",
          select: "name email",
        },
        {
          path: "relationId",
          select: "dropdownItem",
        },
      ],
      customLabels: noteLabels,
    };
    const notes = await Note.paginate(
      { author: req.user._id.toString() },
      opts
    );

    return res.status(200).json({
      notes,
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
