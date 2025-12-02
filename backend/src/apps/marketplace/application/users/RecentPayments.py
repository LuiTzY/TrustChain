class UserRecentPaymentService:
    """
        Servicio que me permitira listar los pagos recientes del usuario autenticado
    """
    def __init__(self, payment_repo):
        self.payment_repo = payment_repo
        
        
    def execute(self, user_id):
        
        try:
            print("Este es el ID del usuario", user_id)
            data = self.payment_repo.get_recent_payments(user_id)
            return data 
        except Exception as e:
            print("Ocurrio un error al intentar obtener los pagos recientes")
