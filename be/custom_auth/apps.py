from django.apps import AppConfig


# from utils.dispatcher import user_activation_success
# from .signals import send_user_activation_email


class AuthConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "custom_auth"

    def ready(self):
        import custom_auth.signals  # noqa
        # user_activation_success.connect(send_user_activation_email)
