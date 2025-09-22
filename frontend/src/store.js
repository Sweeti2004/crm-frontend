import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from './page/ticket-list/ticketsSlice'
import loginReducer from './components/login/loginSlice'
import userReducer from './page/dashboard/userSlice'
import  newTicketReducer from './components/add-ticket-form/addTicketSlicer'
import passwordReducer from './components/password-reset/passwordSlice'
import registrationReducer from './components/registration-form/userRegistrationSlice'
const store = configureStore({
	reducer: {
		tickets:ticketsReducer,
		login: loginReducer,
		user:userReducer,
		openTicket:newTicketReducer,
		password:passwordReducer,
		registration:registrationReducer,
	},
});

export default store;