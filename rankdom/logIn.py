class LogIn:
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def authenticateUser(self):
        print(f"Authenticating user with data: {self.username}")

    def createUser(self):
        return self