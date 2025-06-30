import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from './page/ticket-list/ticketsSlice'
const store = configureStore({
	reducer: {
		tickets:ticketsReducer
	},
});

export default store;