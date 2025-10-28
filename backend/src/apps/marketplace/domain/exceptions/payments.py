class PaymentNotFound(Exception):
    def __init__(self, message="No econtramos un pago con ese ID"):
        return super().__init__(self.message)