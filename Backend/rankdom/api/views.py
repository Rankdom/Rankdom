from exceptiongroup import catch
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
import os
from django.conf import settings


from rankdom.serializers import UserSerializer
from rankdom.models import UserRegistration, CustomUser
from djangoProject.emailAuthorization import send_mail_page, generate_password
import base64
from io import BytesIO
from PIL import Image

from django.core.files.uploadedfile import InMemoryUploadedFile
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
                user = CustomUser.objects.get(code=code)
                image_base64 = ""

                # Check if the user has a profile image and encode it if it exists
                if user.image and user.image.name:
                    try:
                        with open(user.image.path, 'rb') as img_file:
                            image_binary = img_file.read()
                            image_base64 = base64.b64encode(image_binary).decode('utf-8')
                    except Exception as e:
                        image_base64 = "default.png"

                return Response({
                    "username": user.username,
                    "image": image_base64,

                }, status=status.HTTP_200_OK)

            except UserRegistration.DoesNotExist:
                return Response({"message": "Invalid data", "errors": serializer.errors},
                                status=status.HTTP_400_BAD_REQUEST)


            return Response({"message": "Success."}, status=status.HTTP_200_OK)

        return Response({"message": "Invalid data", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

def create_image_from_base64(base64_string,url):
    image_data = base64.b64decode(base64_string)
    image = Image.open(BytesIO(image_data))
    image_file = InMemoryUploadedFile(BytesIO(image_data), field_name='image',
                                       filename=url, content_type=image.format)
    return image_file

class setProfileInfo(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            code = serializer.validated_data.get('code')
            username = serializer.validated_data.get('username')
            image_base64 = serializer.validated_data.get('image')
            image_url = serializer.validated_data.get('image_url')

            try:
                user = CustomUser.objects.get(code=code)
                user.username = username

                if image_base64:
                    try:
                        # Decode the base64 image
                        if isinstance(image_base64, str):
                            image_data = base64.b64decode(image_base64)
                        else:
                            image_data = image_base64.read()
                        print(image_url)
                        file_path = os.path.join(settings.MEDIA_ROOT, image_url)

                        # Create a new unique file name using UUID
                        if os.path.exists(file_path):
                            user.image.name = image_url

                        else:

                            # Save the image as a file
                            image_file = InMemoryUploadedFile(
                                BytesIO(image_data),
                                field_name=None,
                                name=image_url,
                                content_type="image/jpeg",  # Change this dynamically if needed
                                size=len(image_data),
                                charset=None,
                            )
                            user.image.save(image_file.name, image_file, save=False)

                        # Save the new image file to the user's image field

                    except (ValueError, IOError) as e:
                        return Response({"message": f"Invalid image data: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

                # Save the updated user data
                user.save()
                return Response({"message": "Profile updated successfully."}, status=status.HTTP_200_OK)

            except CustomUser.DoesNotExist:
                return Response({"message": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)

        return Response({"message": "Invalid data", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

def home(request):
    return HttpResponse("Hello, world. You're at the polls index.")
