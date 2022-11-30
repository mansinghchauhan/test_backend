import { Router } from "express";
import * as fileActions from "./actions";
import upload from "../../middlewares/uploader";
import { userAuth } from "../../middlewares/authGuard";
import { max } from "lodash";
const fileRouter = Router();

fileRouter.post("/", upload.single("file"), fileActions.UPLOAD_IMAGE);
fileRouter.post(
  "/multiple",
  upload.fields([
    { name: "video", maxCount: max },
    { name: "audio", maxCount: max },
    { name: "image", maxCount: max },
  ]),
  upload.single("file"),
  fileActions.UPLOAD_IMAGES
);
fileRouter.delete("/:id",userAuth, fileActions.FILE_DELETE);
fileRouter.get("/",userAuth, fileActions.GET_FILE_BY_AUTHOR);
fileRouter.get("/:id",userAuth, fileActions.GET_FILE_BY_ID);
export default fileRouter;
