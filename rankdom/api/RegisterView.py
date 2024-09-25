from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rankdom.api.Serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework import generics


class RegisterUserView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        print(request.data.get("username"))
        print(request.data.get("password"))
        email= request.data.get("email")




        if User.objects.filter(email=email).exists():
                return Response({"message": "User with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)

