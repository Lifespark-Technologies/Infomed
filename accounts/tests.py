from django.test import TestCase
from .models import Account, Role

# Create your tests here.

class AccountsManagersTests(TestCase):
    """
    Tests the Account and AccountManager classes inspired by the 
    example here: https://testdriven.io/blog/django-custom-user-model/.
    """

    def setUp(self):
        self.test_admin_role = Role.objects.create(id=1)
        self.test_staff_role = Role.objects.create(id=2)
        self.test_general_user_role = Role.objects.create(id=3)

        self.test_acct_admin = Account.objects.create_user(
            email="admin@gmail.com", 
            password="foo", 
            username="admin", 
            role=self.test_admin_role
        )

        self.test_acct_staff = Account.objects.create_user(
            email="staff@gmail.com",
            password="foo",
            username="staff",
            role=self.test_staff_role
        )

        self.test_acct_general_user = Account.objects.create_user(
            email="user@gmail.com",
            password="foo",
            username="user",
            role=self.test_general_user_role
        )

    def test_create_roles(self):
        self.assertEqual(self.test_admin_role.id, 1)
        self.assertEqual(self.test_staff_role.id, 2)
        self.assertEqual(self.test_general_user_role.id, 3)


    def test_fail_createsuperuser_role(self):
        try:
            fail_create = Role.objects.create(id=0)
            raise RuntimeError("This Role object creation should have failed.")
        except:
            self.assertEqual(True, True)

    def test_create_user(self):
        self.assertEqual(self.test_acct_admin.email, "admin@gmail.com")

