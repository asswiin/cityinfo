from django.db import models


class UserProfile(models.Model):
    name=models.CharField(max_length=100)
    phone=models.CharField(max_length=15,unique=True)
    email=models.EmailField(unique=True)
    password=models.CharField(max_length=100)
    is_admin=models.BooleanField(default=False)

    def __str__(self):
        return self.name