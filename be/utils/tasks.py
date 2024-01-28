from django.core import mail

from config.celery import application as celery_app


@celery_app.task(bind=True)
def send_mail(subject, message, from_email, to_email=None, **kwargs):
    """Send email to this user."""
    mail.send_mail(subject, message, from_email, to_email, **kwargs)
