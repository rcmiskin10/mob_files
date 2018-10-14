from accounts.models import User

def jwt_response_payload_handler(token, user, *args, **kwargs):

	data = {
		"token":token,
		"user":user.id,
		"user_type":user.user_type
	}
	return data