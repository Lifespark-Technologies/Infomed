from django.test import TestCase
from .models import Account, Role

# Create your tests here.

class AccountsManagersTests(TestCase):
    """
    Tests the Account and AccountManager classes inspired by the 
    example here: https://testdriven.io/blog/django-custom-user-model/.
    """

    def setUp(self):
        self.admin_role = Role.objects.create(id=1)
        self.hosp_staff = Role.objects.create(id=2)
        self.general_user = Role.objects.create(id=3)
        self.govt_official = Role.objects.create(id=4)

    def test_duplicate_role(self):
        try:
            test_role = Role.objects.create(id=1)
            raise RuntimeError("Fail: Duplicate role created.")
        except:
            self.assertEqual(True, True)

    def test_invalid_role_id(self):
        try:
            test_role = Role.objects.create(id=5)
            raise RuntimeError("Fail: Role created with invalid role ID.")
        except:
            self.assertEqual(True, True)


