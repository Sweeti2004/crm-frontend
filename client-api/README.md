# CRM Ticket System API
API Resources
User API Resources
All the user API router follows /v1/user/

#	Routers	Verbs	Progress	Is Private	Description
1	/v1/user	GET	Done	Yes	Get user Info
2	/v1/user	POST	Done	No	Create a user
3	/v1/user/login	POST	Done	No	Verify user Authentication and return JWT
4	/v1/user/reset-password	POST	Done	No	Verify email and email pin to reset the password
5	/v1/user/reset-password	PATCH	Done	No	Replace with new password
6	/v1/user/logout	DELETE	Done	Yes	Delete user accessJWT
Ticket API Resources
All the user API router follows /v1/ticket/

#	Routers	Verbs	Progress	Is Private	Description
1	/v1/ticket	GET	Done	Yes	Get all ticket for the logined in user
2	/v1/ticket/{id}	GET	Done	Yes	Get a ticket details
3	/v1/ticket	POST	Done	Yes	Create a new ticket
4	/v1/ticket/{id}	PUT	Done	Yes	Update ticket details ie. reply message
5	/v1/ticket/close-ticket/{id}	PATCH	Done	Yes	Update ticket status to close
6	/v1/ticket/{id}	DELET	Done	Yes	Delete a ticket
Tokens API Resources
All the user API router follows /v1/tokens

#	Routers	Verbs	Progress	Is Private	Description
1	/v1/tokens	GET	Done	No	Get a fresh access JWT