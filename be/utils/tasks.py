from django.core import mail
from django.template.loader import render_to_string

from config.celery import application as celery_app


def render_mail(template, context):
    """Render Email for the given template"""
    return render_to_string(
        template,
        context,
    )


@celery_app.task()
def send_mail(template, subject, context, from_email, to_email):
    """Send email to user(s)."""
    mail_body = render_mail(template, context)
    mail.send_mail(subject, mail_body, from_email, to_email)
