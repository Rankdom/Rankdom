from exceptiongroup import catch
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse


from rankdom.serializers import UserSerializer
from rankdom.models import UserRegistration, CustomUser
from djangoProject.emailAuthorization import send_mail_page, generate_password

class register(APIView):
    def authenticateUserData(self, username, email, code):
        send_mail_page(code, email)
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

class login(APIView):
    def authenticateUserData(self,  email, code):
        send_mail_page(code, email)
        data = CustomUser.objects.get(email =email)
        UserRegistration.objects.create( email=email, code=code)
        data.code = code
        data.save()
        return Response({"message": "Success."}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            code = generate_password()
            try:
                return self.authenticateUserData(email,code)
            except Exception as e:
                return Response({"message": "Invalid data", "errors": serializer.errors},
                                status=status.HTTP_400_BAD_REQUEST)


        return Response({"message": "Invalid data", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class Authenticate(APIView):
    def authenticateEmailCode(self, provided_code, saved_code, registration_data):
        if saved_code == provided_code:
            try:
                data = CustomUser.objects.get(code=provided_code)
                print(data.email)
                return Response({"message": "Success."}, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist:
                CustomUser.objects.create(username=registration_data.username, email=registration_data.email,
                                          code=saved_code)
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



class getProfileInfo(APIView):

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            code = serializer.validated_data.get('code')
            try:
                data = CustomUser.objects.get(code=code)
                arr=[]
                arr.append(data.username)
                arr.append(data.image.url)


                return Response({"message": arr}, status=status.HTTP_200_OK)


            except UserRegistration.DoesNotExist:
                return Response({"message": "Invalid data", "errors": serializer.errors},
                                status=status.HTTP_400_BAD_REQUEST)


            return Response({"message": "Success."}, status=status.HTTP_200_OK)

        return Response({"message": "Invalid data", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)




def home(request):
    return HttpResponse("Hello, world. You're at the polls index.")
