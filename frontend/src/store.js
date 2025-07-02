import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from './page/ticket-list/ticketsSlice'
import loginReducer from './components/login/loginSlice'
import userReducer from './page/dashboard/userSlice'
const store = configureStore({
	reducer: {
		tickets:ticketsReducer,
		login: loginReducer,
		user:userReducer,
	},
});

export default store;