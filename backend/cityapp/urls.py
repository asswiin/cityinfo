from django.urls import path
from .views import register, login, save_user_details

urlpatterns = [

    path('api/register/', register),
    path('api/login/', login),
    path('api/user-details/', save_user_details),
]