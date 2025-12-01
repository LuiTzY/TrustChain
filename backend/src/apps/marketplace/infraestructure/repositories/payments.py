from src.apps.marketplace.domain.exceptions.payments import PaymentNotFound
from src.apps.marketplace.domain.entities.payment import Payment
from src.apps.marketplace.infraestructure.models.payments import PaymentModel
from src.apps.marketplace.domain.interfaces import IPaymentRepository


class DjangoPaymentRepository(IPaymentRepository):
    
    
    def save(self, entity: Payment) -> PaymentModel:
        
        payment =  PaymentModel.objects.create(
            tx_hash=entity.tx_hash,
            buyer_address=entity.buyer_address,
            seller_address=entity.seller_address,
            amount=entity.amount,
            product=entity.product,
            status=entity.status,            
        )
        return payment
    
    def find_by_id(self, item_id):
        try:
            return PaymentModel.objects.get(id=item_id)
        except PaymentModel.DoesNotExist:
            raise PaymentNotFound()
        
    def find_by_tx_hash(self, tx_hash):
        try:
            return PaymentModel.objects.filter(tx_hash=tx_hash)
        except PaymentModel.DoesNotExist:
            raise PaymentNotFound()
        
    def list_all(self) -> list[PaymentModel] :
        return PaymentModel.objects.all()
    
    def get_count(self)-> int:
        return PaymentModel.objects.count()

  