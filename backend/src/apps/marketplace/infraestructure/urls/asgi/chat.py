
from src.apps.marketplace.infraestructure.consumers.chat_consumer import ChatConsumer
from django.urls import path

websocket_urlpatterns = [
    path('api/chat/', ChatConsumer.as_asgi()),
]