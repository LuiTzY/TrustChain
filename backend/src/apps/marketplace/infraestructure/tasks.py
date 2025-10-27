from celery import shared_task

from src.apps.marketplace.infraestructure.listeners.product_event_listener import ProductEventListener



@shared_task
def run_listener():
    listener = ProductEventListener()
    listener.run()