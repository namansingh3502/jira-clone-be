from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm

UserModel = get_user_model()


class RegistrationForm(UserCreationForm):
    class Meta:
        model = UserModel
        fields = (
            "username",
            "password1",
            "password2",
            "email",
            "first_name",
            "last_name",
        )
