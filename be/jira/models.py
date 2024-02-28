from django.db import models

from custom_auth.models import User


class Project(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    admin = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="project_admin"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Task(models.Model):
    STATUS_CHOICES = (
        ("TODO", "TODO"),
        ("DEV_IN_PROGRESS", "DEV_IN_PROGRESS"),
        ("QA_IN_PROGRESS", "QA_IN_PROGRESS"),
        ("DONE", "DONE"),
    )

    PRIORITY_CHOICES = (
        ("LOW", "LOW"),
        ("MEDIUM", "MEDIUM"),
        ("HIGH", "HIGH"),
        ("CRITICAL", "CRITICAL"),
        ("BLOCKER", "BLOCKER"),
    )

    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="project_issue"
    )
    assignee = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="assignee"
    )
    reporter = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="reporter"
    )
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="TODO")
    priority = models.CharField(max_length=50, choices=PRIORITY_CHOICES, default="LOW")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Comment(models.Model):
    task = models.ForeignKey(
        Task, on_delete=models.CASCADE, related_name="task_comment"
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_comment"
    )
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Attachment(models.Model):
    task = models.ForeignKey(
        Task, on_delete=models.CASCADE, related_name="task_attachment"
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_attachment"
    )
    attachment = models.FileField(upload_to="attachments/")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Board(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="project_board"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{} - {}".format(self.project.name, self.name)
