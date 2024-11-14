from rest_framework import serializers

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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'code', 'image']
        extra_kwargs = {
            "email": {"required": False, "allow_null": True},
            "code": {"required": False, "allow_null": True},
            "username": {"required": False, "allow_null": True},
            "image": {"required": False, "allow_null": True},

        }

