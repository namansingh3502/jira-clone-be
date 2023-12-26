from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, email, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not username:
            msg = "The given username must be set"
            raise ValueError(msg)

        username = User.normalize_username(username)
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email, password, **extra_fields):
        return self._create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser):
    """
    Users who belong to the forum are represented by this model.
    """

    username_validator = UnicodeUsernameValidator()

    first_name = models.CharField(_("first name"), max_length=150)
    middle_name = models.CharField(_("middle Name"), max_length=150, blank=True)
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
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts.",
        ),
    )
    date_joined = models.DateTimeField(
        _("date joined"),
        default=timezone.now,
        editable=False,
    )

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"

    objects = UserManager()

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
        return f"{self.first_name} {self.middle_name} {self.last_name}"

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)
