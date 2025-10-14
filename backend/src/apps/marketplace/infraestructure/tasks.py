from celery import shared_task

from src.apps.marketplace.infraestructure.listeners.product_event_listener import ProductEventListener


@shared_task
def run_web3_listeners():
    print("Estamos corriendo EL WEB333333333333333333333333333333 ")
    listener =  ProductEventListener()
    listener.listen_item_listed()