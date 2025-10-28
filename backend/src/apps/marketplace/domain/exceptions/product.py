
class ProductNotFound(Exception):
    pass

class InvalidOperation(Exception):
    pass


class ProductInvalidSellerWalletAddress(Exception):
    """Excepcion lanzada por un producto con una wallet invalida"""
    def __init__(self, message="La direccion de wallet del vendedor no es valida."):
        self.message = message
        super().__init__(self.message)


class ProductInvalidPrice(Exception):
    """Excepcion lanzada por un producto con una wallet invalida"""
    def __init__(self, message="El precio del producto debe de ser mayor a 0 ETH"):
        self.message = message
        super().__init__(self.message)
    

class ProductBlockhainDuplicated(Exception):
    """Excepcion lanzada por un producto con una wallet invalida"""
    def __init__(self, message="El blockchain ID ya se encuentra registrado en un producto"):
        self.message = message
        super().__init__(self.message)
    