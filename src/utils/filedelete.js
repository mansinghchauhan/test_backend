import fs from "fs";
import path from "path";
import { File } from "../models";

const FileDelete = async (file) => {
  try {
    fs.exists(
      path.resolve(__dirname, ".." + file.filePath),
      async function (exists) {
        if (exists) {
          await fs.unlink(
            path.resolve(__dirname, ".." + file.filePath),
            (err) => {
              if (err && err.code == "ENOENT") {
                // file doens't exist
                console.info("File doesn't exist, won't remove it.");
                throw err;
              } else if (err) {
                // other errors, e.g. maybe we don't have enough permission
                console.info("Error occurred while trying to remove file.");
                throw err;
              } else {
                console.info("File Removed Suceesfully.");
              }
            }
          );
        } else {
          //Show in red
          console.info("File not found, so not deleting.");
        }
      }
    );
    await File.findByIdAndDelete({ _id: file._id });

    return;
  } catch (err) {
    throw err;
  }
};

export default FileDelete;
