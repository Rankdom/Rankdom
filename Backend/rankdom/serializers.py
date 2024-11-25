from rest_framework import serializers
from django.core.exceptions import ValidationError
from io import BytesIO
from django.core.files.base import ContentFile
from PIL import Image
import base64
import uuid

# import the rankdom data model
from .models import Questionsset, Answer, CustomUser


# create a serializer class
class RankdomSerializer(serializers.ModelSerializer):
    # create a meta class
    class Meta:
        model = Questionsset
        fields = ('title','supercategory', 'category', 'description','like','dislike', 'content_array',"create_date","emoji","user")

class AnswerSerializer(serializers.ModelSerializer):
    # create a meta class
    class Meta:
        model = Answer
        fields = ('title','supercategory', 'category', 'description','like','dislike', 'content_array',"create_date","emoji","user")


class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if isinstance(data,
 str):
            # Decode base64 data
            image_data = base64.b64decode(data.encode('utf-8'))
            # Create a new image file object
            return ContentFile(image_data, name='temp.jpg')  # Adjust file name as needed
        return super().to_internal_value(data)

class UserSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'code', 'image','image_name']
        extra_kwargs = {
            "email": {"required": False, "allow_null": True},
            "code": {"required": False, "allow_null": True},
            "username": {"required": False, "allow_null": True},
            "image": {"required": False, "allow_null": True},
            "image_name": {"required": False, "allow_null": True},

        }

