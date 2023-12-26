from django.forms import forms

from custom_auth.models import User


class RegistrationForm(forms.Form):
    model = User
