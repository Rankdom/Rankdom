from unittest import TestCase
from rankdom.logIn import LogIn


class logInTest(TestCase):
    def test_creaete_user(self):
        user = LogIn(username="testuser", password="testpassword")

        self.assertEqual(user.username, "testuser")
        self.assertEqual(user.password, "testpassword")