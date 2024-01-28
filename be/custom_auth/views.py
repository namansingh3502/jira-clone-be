from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode
from django.views import View

from custom_auth.forms import RegistrationForm
from custom_auth.models import User
from utils.dispatcher import user_activation_success
from .token import account_activation_token


def csrf_token(request):
    token = get_token(request)
    return JsonResponse({"token": token}, status=200)


class RegisterUser(View):

    def post(self, request):

        form = RegistrationForm(request.POST)

        if form.is_valid():
            if User.objects.filter(username__iexact=form.cleaned_data["username"]).exists():
                return JsonResponse(
                    {"errors": {"username": "Username already in use."}}, status=400
                )
            if User.objects.filter(email__iexact=form.cleaned_data["email"]).exists():
                return JsonResponse(
                    {"errors": {"email": "Email already in use."}}, status=400
                )

            user = User.objects.create_user(user_data=form.cleaned_data)

            return JsonResponse(
                {"user_created": "success", "user_name": user.username}, status=201
            )

        return JsonResponse({"errors": form.errors}, status=400)


class ActivateUser(View):

    def get(self, uuidb64, token):
        user = None

        try:
            uid = force_bytes(urlsafe_base64_decode(uuidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return JsonResponse({'msg': "Activation link is invalid!."}, status=400)

        if user and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            user_activation_success.send(sender=self.__class__, instance=user, user=user)

            return JsonResponse({'msg': "Account activated."}, status=200)

        return JsonResponse({'msg': "Activation link is invalid!."}, status=400)
