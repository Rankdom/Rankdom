from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from Serializers import UserSerializer, UserRegistration, CustomUser
from emailAuthorization import send_mail_page, generate_password


class login(APIView):
    def authenticateUserData(self, username, email, code):
            send_mail_page(code, email)
            if not UserRegistration.objects.filter(username=username, email=email).exists():
                UserRegistration.objects.create(username=username, email=email, code=code)

            return Response({"message": "Success."}, status=status.HTTP_200_OK)


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
            return Response({"message": "Success."}, status=status.HTTP_200_OK)
        else:
            user = CustomUser.objects.get(username=registration_data.username)
            user.code= saved_code


        UserRegistration.objects.all().delete()

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




def home(request):
    return HttpResponse("Hello, world. You're at the polls index.")
