from unittest import TestCase
from rankdom.model import rankdomUser


class logInTest(TestCase):
    def test_creaete_user(self):
        user = rankdomUser(username="testuser", password="testpassword")

        self.assertEqual(user.username, "tesusr")
        self.assertEqual(user.password, "testpassword")