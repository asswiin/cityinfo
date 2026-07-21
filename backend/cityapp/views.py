from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from .models import UserProfile
from .serializers import UserProfileSerializer


# login #
@api_view(['GET', 'POST''get'])
def login(request):
    if request.method == 'GET':
        return Response({"message": "Login API is working."})

    username = request.data.get('username')
    password = request.data.get('password')

    # Find user by email or phone
    user = UserProfile.objects.filter(phone=username).first()
    if not user:
        user = UserProfile.objects.filter(email=username).first()

    if user and check_password(password, user.password):
        return Response({
            "message": "Login Successful",
            "name": user.name,
            "is_admin": user.is_admin  # Return the admin status
        })

    return Response({"message": "Invalid Credentials"}, status=401)



@api_view(['GET', 'POST'])
def register(request):

    if request.method == 'GET':
        return Response({
            "message": "Register API is working. Use POST to register."
        })

    serializer = UserProfileSerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()

        return Response({
            "message": "Registration Successful"
        })

    return Response(
        serializer.errors,
        status=400
    )