from unittest import TestCase

class logIn:
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def authenticateUser(self):
        print(f"Authenticating user with data: {self.username}")

    def createUser(self):
        return self


class logInTest(TestCase):
    def test_creaete_user(self):
        user = logIn(username="testuser", password="testpassword")

        self.assertEqual(user.username, "testdsf34sduser")
        self.assertEqual(user.password, "testpassword")