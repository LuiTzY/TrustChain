from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
from src.apps.common.fields import WalletAddressField 

class UserManager(BaseUserManager):
    def create_user(self, first_name, last_name, username, email, password=None):
        if not email:
            raise ValueError("El usuario debe tener un correo electronico")
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name
        )
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, first_name, last_name, username, email, password):
        user = self.create_user(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            password=password
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

    
class UserModel(AbstractBaseUser):
    first_name = models.CharField(max_length=50, verbose_name="Nombre")
    last_name = models.CharField(max_length=50, verbose_name="Apellido")
    username = models.CharField(unique=True, max_length=128, null=False, verbose_name="Nombre de usuario")
    email = models.EmailField(unique=True, max_length=200, verbose_name="Correo Electronico")
    password = models.CharField(max_length=128, verbose_name="Contraseña")
    wallet_address = WalletAddressField(verbose_name="Wallet", unique=True, null=True, blank=True)
    user_active = models.BooleanField(default=True,verbose_name="Usuario Activo")
    user_admin = models.BooleanField(default=False, verbose_name="Usuario administrador")
    created_at = models.DateField(auto_now_add = True, verbose_name = "Creado el")
    update_at = models.DateField(auto_now=True, verbose_name = "Actualizado el")
    
    objects = UserManager()
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ('first_name','last_name','email')
    
    class Meta:
        app_label = "users"
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
    
    def __str__(self):
        return f"{self.email} - {self.first_name}"
    
    def has_perm(self,perm,obj=None):
        return True
    
    def has_module_perms(self,app_label):
        return True
    
   
    @property
    def is_staff(self):
        return self.user_admin
    
    @is_staff.setter
    def is_staff(self, value):
        self.user_admin = value
        