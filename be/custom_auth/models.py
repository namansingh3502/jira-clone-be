from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.conf import settings

from utils import tasks as async_tasks
from custom_auth.token import account_activation_token


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, user_data=None):
        """
        Create and save a user with the given username, email, and password.
        """

        if not user_data:
            msg = "The given user_data must be set"
            raise ValueError(msg)

        if not user_data.get("username"):
            msg = "The given username must be set"
            raise ValueError(msg)

        username = User.normalize_username(user_data["username"])
        email = self.normalize_email(user_data["email"])
        user = self.model(
            username=username,
            email=email,
            first_name=user_data["first_name"],
            last_name=user_data["last_name"],
        )
        user.password = make_password(user_data["password1"])
        user.save(using=self._db)
        return user

    def create_user(self, user_data=None):
        if not user_data:
            msg = "The given user_data must be set"
            raise ValueError(msg)
        return self._create_user(user_data)


class User(AbstractBaseUser):
    """
    Users who belong to the forum are represented by this model.
    """

    objects = UserManager()

    username_validator = UnicodeUsernameValidator()

    first_name = models.CharField(_("first name"), max_length=150)
    last_name = models.CharField(_("last name"), max_length=150, blank=True)

    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.",
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    email = models.EmailField(_("email address"))

    is_active = models.BooleanField(
        _("active"),
        default=False,
        help_text=_(
            "Designates whether this user should be treated as active."
            "Unselect this instead of deleting accounts.",
        ),
    )
    date_joined = models.DateTimeField(
        _("date joined"),
        default=timezone.now,
        editable=False,
    )

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"

    class Meta:
        db_table = _("users")
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        return self.username

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        """
        Return the first_name plus the middle_name plus the last_name, with a space in between.
        """
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send email to this user in async mode."""
        async_tasks.send_mail.delay(subject, message, from_email, [self.email], **kwargs)
