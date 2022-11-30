import { Router } from 'express';
import * as DonationRouter from './actions';
import { userAuth } from "../../middlewares/authGuard";
const donationRouter = Router();

donationRouter.post('/', userAuth, DonationRouter.CREATE_NEW_DONATIONS);
donationRouter.get('/', userAuth, DonationRouter.GET_DONATIONS_BY_USER);
donationRouter.put('/update-donation/:id/:type', userAuth, DonationRouter.UDPATE_DONATION);
donationRouter.put('/update-donation-entity/:id/:type', userAuth, DonationRouter.UPDATE_DONATION_ENTITY);
donationRouter.put('/delete-donation-entity/:id/:entity/:type', userAuth, DonationRouter.DELETE_DONATION_ENTITY);

export default donationRouter;