from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class MyAccountManager(BaseUserManager):
    """
    This is the custom user manager that we've written in place of
    the default one. This inspired by the following example:
    https://github.com/mitchtabian/CodingWithMitch-Blog-Course/blob/Customizing-Django-Admin-(search-and-filtering)/src/account/models.py.
    It provides a create_user routine and a creat_superuser routine.
    """

    def create_user(self, email, password=None):
        if not email:
            raise ValueError("Users must have a valid email address")
        # if not role:
        #     raise ValueError("Users must have a valid role")

        user = self.model(
            email = self.normalize_email(email),
        )

        user.is_staff = False
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email = self.normalize_email(email),
            password=password,
        )

        user.is_superuser = True
        user.is_staff = True

        user.save(using=self._db)
        return user



class Account(AbstractBaseUser):
    """
    A model to store users. This model is written following the user structure
    indicated in issue #65: https://github.com/Lifespark-Technologies/Infomed/issues/65.
    Currently, each user can have 1 of 3 possible roles. We also have allowed for the
    user to be associated with multiple hospitals. It's also inspired by this example:
    https://github.com/mitchtabian/CodingWithMitch-Blog-Course/blob/Customizing-Django-Admin-(search-and-filtering)/src/account/models.py.
    """

    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    date_joined = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now=True)

    # Boolean to determine if the user is a superuser
    is_superuser = models.BooleanField(default=False)

    # We should get rid of this
    is_staff = models.BooleanField(default=False)

    # Allow a user to be associated with multiple different hospitals
    hospital = models.ManyToManyField("hospitals.Hospital", blank=True)

    # Ensures that the user can only sign in using their email
    USERNAME_FIELD = "email"

    # When creating a user, the following fields must be required.
    REQUIRED_FIELDS = []

    objects = MyAccountManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        """
        Returns if the user has superuser permissions.
        """
        # If the user is a superuser, we don't even have to 
        # see if the user has permissions for this or not.
        if self.is_superuser:
            return True

    def has_module_perms(self, app_label):
        return True



class HospitalStaff(Account):
    is_doctor = models.BooleanField(default=False)


class GeneralUser(Account):
    doctor = models.ForeignKey(
        HospitalStaff, 
        related_name="general_users", 
        on_delete=models.DO_NOTHING,
        null=True
    )


class HospitalAdmin(Account):
    """
    Creates a proxy class for the Account, since this 
    user doesn't have any personal attributes to keep track of.
    """
    pass