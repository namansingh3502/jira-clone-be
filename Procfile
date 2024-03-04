web: gunicorn config.wsgi:application --log-level=DEBUG -b:8000
celery: celery -A config.celery worker -l INFO