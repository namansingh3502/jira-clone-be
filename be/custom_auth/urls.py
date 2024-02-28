from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from custom_auth import views as auth_view

urlpatterns = [
    path("token", auth_view.csrf_token, name="csrf-token"),

    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("register/", auth_view.RegisterUser.as_view(), name="register"),
    path("activate/<uidb64>/<token>/", auth_view.ActivateUser.as_view(), name="activate_user"),
]
