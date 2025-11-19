"""
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os
from channels.routing import ProtocolTypeRouter,URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from src.apps.marketplace.infraestructure.urls.asgi.chat import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = get_asgi_application()


#ProtocolTypeRouter me permite dirigir la solicitud segun el tipo que sea, http y webscoket en estos casos
application = ProtocolTypeRouter({
    "http":get_asgi_application(),
    #AuthMiddleware autentica todas las rutas por websockets
    "websocket":AuthMiddlewareStack(
        #Mapea las urls de los websockets a sus respectivos consumidores(que es como si fuesen vistas normales por asi decirlo)
        URLRouter(
            websocket_urlpatterns
        )
    )
})

print(application)