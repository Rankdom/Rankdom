from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rankdom.api.Serializers import UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class LoginUserView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            password = serializer.validated_data.get('password')
            print(username)
            print(password)

            user = authenticate(username=username, password=password)

            if user is not None:
                return Response({"message": "Success"}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Invalid username or password!"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
