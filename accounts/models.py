from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from hospitals.models import Hospital

# Create your models here.
class Role(models.Model):
    """
    This is designates a role to a given user. 
    At the moment, no user can assume more than one role. But 
    in the event we need that added complexity, this model should
    make that change much easier. This has been done following the
    example here: https://simpleisbetterthancomplex.com/tutorial/2018/01/18/how-to-implement-multiple-user-types-with-django.html.
    """

    HOSP_ADMIN = 1
    HOSP_STAFF = 2
    GENERAL_USER = 3
    GOVERNMENT_OFFICIAL = 4

    ROLE_CHOICES = (
        (HOSP_ADMIN, "admin"),
        (HOSP_STAFF, "staff"),
        (GENERAL_USER, "general_user"),
        (GOVERNMENT_OFFICIAL, "government_official")
    )

    id = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, primary_key=True)

    def __str__(self):
        return self.get_id_display()



class MyAccountManager(BaseUserManager):
    """
    This is the custom user manager that we've written in place of
    the default one. This inspired by the following example:
    https://github.com/mitchtabian/CodingWithMitch-Blog-Course/blob/Customizing-Django-Admin-(search-and-filtering)/src/account/models.py.
    It provides a create_user routine and a creat_superuser routine.
    """

    def create_user(self, email, username, password=None, role=None):
        if not email:
            raise ValueError("Users must have a valid email address")
        if not username:
            raise ValueError("Users must have a valid username")
        if not role:
            raise ValueError("Users must have a valid role")

        user = self.model(
            email = self.normalize_email(email),
            username=username,
            role=role,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email = self.normalize_email(email),
            password=password,
            username=username,
        )

        user.is_superuser = True

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
    username = models.CharField(max_length=30, unique=True)
    date_joined = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now=True)

    # Specify the type of account (hospital admin, hospital staff, or general user)
    # CASCADE on_delete because if the account is deleted, then also get rid of the account role
    role = models.OneToOneField(Role, on_delete=models.CASCADE)

    # Boolean to determine if the user is a superuser
    is_superuser = models.BooleanField(default=False)

    # Allow a user to be associated with multiple different hospitals
    hospital = models.ManyToManyField(Hospital)

    # Ensures that the user can only sign in using their email
    USERNAME_FIELD = "email"

    # When creating a user, the following fields must be required.
    REQUIRED_FIELDS = ["username", "role",]

    objects = MyAccountManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        """
        Returns if the user has superuser permissions.
        """
        return self.role.id == 0


    # No idea what this does ATM.
    def has_module_perms(self, app_label):
        return True
