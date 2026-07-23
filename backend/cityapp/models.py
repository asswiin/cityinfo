from django.db import models


class UserProfile(models.Model):
    name=models.CharField(max_length=100)
    phone=models.CharField(max_length=15,unique=True)
    email=models.EmailField(unique=True)
    password=models.CharField(max_length=100)
    is_admin=models.BooleanField(default=False)
    date_of_birth=models.DateField(null=True, blank=True)
    gender=models.CharField(max_length=20, blank=True, default='')
    address=models.TextField(blank=True, default='')
    house_flat=models.CharField(max_length=150, blank=True, default='')
    street=models.CharField(max_length=150, blank=True, default='')
    town=models.CharField(max_length=100, blank=True, default='')
    district=models.CharField(max_length=100, blank=True, default='')
    state=models.CharField(max_length=100, blank=True, default='')
    blood_group=models.CharField(max_length=5, blank=True, default='')
    occupation=models.CharField(max_length=100, blank=True, default='')
    education_qualification=models.CharField(max_length=150, blank=True, default='')

    def __str__(self):
        return self.name