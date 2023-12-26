from django.http import JsonResponse

from custom_auth.froms import RegistrationForm


def register(request):
    form = RegistrationForm(request.POST)
    if form.is_valid():
        user = form.save()
        return user
    return JsonResponse({"message": "register"}, status=200)
