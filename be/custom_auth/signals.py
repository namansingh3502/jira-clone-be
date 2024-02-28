from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

from custom_auth.models import User
from custom_auth.token import account_activation_token
from utils import tasks as tasks
from utils.dispatcher import user_activation_success


@receiver(post_save, sender=User)
def send_registration_success_email(sender, instance, created, **kwargs):
    if created:
        template = "registration_success_email.html"
        subject = "Welcome On Board on Project Management App."
        context = {
            "first_name": instance.first_name,
            "last_name": instance.last_name,
            "domain": settings.DOMAIN,
            "uid": urlsafe_base64_encode(force_bytes(instance.pk)),
            "token": account_activation_token.make_token(instance),
        }

        tasks.send_mail.apply_async(
            args=(
                template,
                subject,
                context,
                settings.EMAIL_HOST_USER,
                [instance.email],
            )
        )


@receiver(user_activation_success)
def send_user_activation_email(sender, user, **kwargs):
    template = "account_activation_success_email.html"
    subject = "Account activation successful."
    context = {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "domain": settings.DOMAIN,
        "uid": urlsafe_base64_encode(force_bytes(user.pk)),
        "token": account_activation_token.make_token(user),
    }

    tasks.send_mail.apply_async(
        args=(
            template,
            subject,
            context,
            settings.EMAIL_HOST_USER,
            [user.email],
        )
    )
