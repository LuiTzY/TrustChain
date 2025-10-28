from django.contrib import admin

from  src.apps.marketplace.infraestructure.models.user import UserModel

# Register your models here.
admin.site.register(UserModel)