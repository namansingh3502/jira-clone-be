from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

from custom_auth.models import User
from custom_auth.token import account_activation_token
from utils import tasks as async_tasks
from utils.dispatcher import user_activation_success


@receiver(post_save, sender=User)
def send_success_registration_email(sender, instance, created, **kwargs):
    if created:
        subject = "Registration Successful on Project Management App."
        message = render_to_string(
            "registraion_success_email.html",
            {
                "first_name": instance.first_name,
                "last_name": instance.last_name,
                "domain": settings.DOMAIN,
                "uid": urlsafe_base64_encode(force_bytes(instance.pk)),
                "token": account_activation_token.make_token(instance),
            },
        )
        async_tasks.send_mail.delay(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [instance.email],
            **kwargs
        )


@receiver(user_activation_success, sender="testing")
def send_user_activation_email(sender, user, **kwargs):
    subject = "Account activation successful."
    message = render_to_string(
        "registraion_success_email.html",
        {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "domain": settings.DOMAIN,
            "uid": urlsafe_base64_encode(force_bytes(user.pk)),
            "token": account_activation_token.make_token(user),
        },
    )
    async_tasks.send_mail.delay(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        [user.email],
        **kwargs
    )
