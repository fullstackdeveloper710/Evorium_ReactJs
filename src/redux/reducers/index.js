import { combineReducers } from "redux";
import appSlice from "./common/appSlice";
import adminMainSlice from "./adminSlices/adAuth";
import adminUserSlice from "./adminSlices/adUser";
import adminSpeakerSlice from "./adminSlices/adSpeakers";
import adminCategoriesSlice from "./adminSlices/adCategories";
import adminTagsSlice from "./adminSlices/adTags";
import adminProgramsSlice from "./adminSlices/adPrograms";
import adminDashboardSlice from "./adminSlices/adDashboard";
import adminFaqsSlice from "./adminSlices/adFaq";
import adminCmsSlice from "./adminSlices/adCms";
import adminPaymentSlice from "./adminSlices/adPayment";
import userAuth from "./userSlices/userAuth";
import userProfileSlice from "./userSlices/userProfile";
import userProgramsSlice from "./userSlices/userPrograms";
import userPaymentSlice from "./userSlices/userPayment";
import adminNotificationSlice from "./adminSlices/adNotification"
import userProgramCategoriesList from "./userSlices/userProgramCategories&SpeakersList";
import userProgramCategoriesSpeakersList from "./userSlices/userProgramCategories&SpeakersList";
import userCredentials from "./userSlices/userCredentials";




const rootReducer = combineReducers({
  //common slices
  app: appSlice,
  //Admin slices
  adAuth: adminMainSlice,
  adUser: adminUserSlice,
  adSpeaker: adminSpeakerSlice,
  adCategories: adminCategoriesSlice,
  adTags: adminTagsSlice,
  adPrograms: adminProgramsSlice,
  adDashboard: adminDashboardSlice,
  admin: adminMainSlice,
  adFaqs: adminFaqsSlice,
  adCms: adminCmsSlice,
  adPayment: adminPaymentSlice,
  adNotification : adminNotificationSlice,
  //User slices
  userAuth: userAuth,
  userPrograms: userProgramsSlice,
  userProfile: userProfileSlice,
  userPayment: userPaymentSlice,
  userCategoriesSpeakers: userProgramCategoriesSpeakersList,
  userCredentials : userCredentials
});

export default rootReducer;
