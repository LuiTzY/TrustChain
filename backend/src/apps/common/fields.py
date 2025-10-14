from django.db import models

class WalletAddressField(models.CharField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("max_length", 42)
        super().__init__(*args, **kwargs)
