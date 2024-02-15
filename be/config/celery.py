from __future__ import absolute_import, unicode_literals

import os

from celery import Celery
from django.conf import settings

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

application = Celery("jira-clone")

# Configure Celery using settings from Django settings.py.
application.config_from_object("django.conf:settings", namespace="CELERY")

# Load tasks from all registered Django app configs.
application.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
