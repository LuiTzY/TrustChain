from django.apps import AppConfig


class ProductsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'src.apps.marketplace.products'

    
    def ready(self):
        # print("Se supone que se inicializa esto")
        #Solo iniciamos los listeners
        from src.apps.marketplace.infraestructure.tasks import run_web3_listeners
        
        run_web3_listeners.delay()