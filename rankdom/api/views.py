from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import HttpResponse
from rankdom.api.Serializers import userSerializer
from djangoProject.emailAuthorization import send_mail_page



class LoginUserView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = userSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            password = serializer.validated_data.get('password')

            user = authenticate(username=username, password=password)

            if user:
                return Response({"message": "Success"}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Invalid username or password!"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterUserView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = userSerializer(data=request.data)
        send_mail_page()

        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            password = serializer.validated_data.get('password')
            User.objects.create_user(username=username, password=password)
            return Response({"Success"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "Invalid data", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

def home(request):
    return HttpResponse("Hello, world. You're at the polls index.")
