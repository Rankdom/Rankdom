from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
<<<<<<< HEAD:rankdom/api/views.py
from rankdom.api.Serializers import UserSerializer,UserRegistration,CustomUser
from djangoProject.emailAuthorization import send_mail_page,generate_password




=======

from rankdom.api.Serializers import UserSerializer, UserRegistration, CustomUser
from djangoProject.emailAuthorization import send_mail_page, generate_password
>>>>>>> cdc564660f39877e034ebc74d8f3fb9613371403:Backend/rankdom/api/views.py


class login(APIView):
    def authenticateUserData(self, username, email, code):
<<<<<<< HEAD:rankdom/api/views.py
            send_mail_page(code, email)
            if not UserRegistration.objects.filter(username=username, email=email).exists():
                UserRegistration.objects.create(username=username, email=email, code=code)
            return Response({"message": "Success."}, status=status.HTTP_200_OK)
=======
        send_mail_page(code, email)
        UserRegistration.objects.create(username=username, email=email, code=code)
        return Response({"message": "Success."}, status=status.HTTP_200_OK)
>>>>>>> cdc564660f39877e034ebc74d8f3fb9613371403:Backend/rankdom/api/views.py

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            email = serializer.validated_data.get('email')
            code = generate_password()
            return self.authenticateUserData(username, email, code)

        return Response({"message": "Invalid data", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class Authenticate(APIView):
    def authenticateEmailCode(self, provided_code, saved_code, registration_data):
        if saved_code == provided_code:
            CustomUser.objects.create(username=registration_data.username, email=registration_data.email)
            UserRegistration.objects.all().delete()
            return Response({"message": "Success."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid code."}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            provided_code = serializer.validated_data.get('code')
            try:
                registration_data = UserRegistration.objects.get(code=provided_code)
            except UserRegistration.DoesNotExist:
                return Response({"message": "Invalid data", "errors": serializer.errors},
                                status=status.HTTP_400_BAD_REQUEST)
            return self.authenticateEmailCode(provided_code, registration_data.code, registration_data)

        return Response({"message": "Invalid data", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


<<<<<<< HEAD:rankdom/api/views.py
class getUserInfo(APIView):
    def getInfo(self, code):
        if UserRegistration.objects.filter(code=code).exists():
            user = UserRegistration.objects.get(code=code)
            return Response({"message": user.username+" "+user.email}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            provided_code = serializer.validated_data.get('code')
            return self.getInfo(provided_code)

        return Response({"message": "Invalid data", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)





=======
>>>>>>> cdc564660f39877e034ebc74d8f3fb9613371403:Backend/rankdom/api/views.py
def home(request):
    return HttpResponse("Hello, world. You're at the polls index.")
