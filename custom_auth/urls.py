from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

import custom_auth.views as view

urlpatterns = [
    path("register/", view.register, name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
