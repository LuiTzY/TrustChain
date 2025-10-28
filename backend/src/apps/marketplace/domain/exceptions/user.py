class UserNotFound(Exception):
    def __init__(self, message="No pudimos encontrar un usuario que matchee con ese ID"):
        self.message = message
        super().__init__(self.message)
        
class UserUnknownError(Exception):
    pass

class UserNotFoundWallet(Exception):
    def __init__(self, message="Este usuario no tiene un wallet"):
        self.message =  message
        super().__init__(message)
    