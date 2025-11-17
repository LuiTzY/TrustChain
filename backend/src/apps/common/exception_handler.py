from rest_framework.views import exception_handler
from src.apps.common.response import ApiResponse
from rest_framework.exceptions import MethodNotAllowed
from rest_framework import status
from requests.exceptions import ConnectionError

def custom_exception_handler(exc, context):
    
    response = exception_handler(exc, context)
    if response is not None:
        return ApiResponse.error(
            message="Error procesando la solicitud",
            errors=response.data,
            code=response.status_code
        )
        
    if isinstance(response,ConnectionError):
        return ApiResponse.error(
            message="Error procesando la solicitud",
            errors=response.data,
            code=response.status_code
        )
        
    #No esta funcionando para los method not allowed
    if response is not None and response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED:
         return ApiResponse.error(
            message="Metodo no permitido",
            errors=f"El metodo {context['request'].method} no esta permitido para esta ruta",
            code=status.HTTP_405_METHOD_NOT_ALLOWED
        ) 
    return ApiResponse.error(message=str(exc))
