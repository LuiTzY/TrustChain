from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        
        print("Establecimos la conexion")
        print(f"Estos son los metodos {dir(self.channel_layer)}")
        self.group_name = 'trustchain_chat'
        
        #se agrega al channel el grupo 
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        
        print(f"Este es el chanel Name {self.channel_name} \n")

        #aceptamos la conexion entrante
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        """
            Metodo para recibir los chats
        """
        print(f"Esta es la data  {text_data} \n")
        message = text_data

        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event):
        """
            Metodo para el envio de los mensajes
        """
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))