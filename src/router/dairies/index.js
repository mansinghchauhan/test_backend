import { Router } from "express";
import * as Diary from "./actions";
import { userAuth } from "../../middlewares/authGuard";
import validator from "../../middlewares/validator";
import { dairyValidator } from "../../validators/dairies";

const diaryRouter = Router();
diaryRouter.post("/", dairyValidator, validator, userAuth, Diary.CREATE_DIARY);
diaryRouter.put("/:id", userAuth, Diary.UPDATE_DIARY);
diaryRouter.delete("/:id", userAuth, Diary.DELETE_DIARY);
diaryRouter.get("/", userAuth, Diary.GET_DIARY);
diaryRouter.get("/:id", userAuth, Diary.GETDIARY_BYID);

export default diaryRouter;
