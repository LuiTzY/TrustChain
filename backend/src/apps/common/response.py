from rest_framework.response import Response
from rest_framework import status

class ApiResponse:
    """Clase helper para estandarizar respuestas del API."""
    
    @staticmethod
    def success(data=None, message="Operación exitosa", code=status.HTTP_200_OK):
        return Response({
            "success": True,
            "message": message,
            "data": data
        }, status=code)

    @staticmethod
    def created(data=None, message="Recurso creado correctamente"):
        return ApiResponse.success(data, message, status.HTTP_201_CREATED)

    @staticmethod
    def error(message="Ha ocurrido un error", errors=None, code=status.HTTP_400_BAD_REQUEST):
        return Response({
            "success": False,
            "message": message,
            "errors": errors
        }, status=code)
