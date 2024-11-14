from rest_framework import serializers

# import the rankdom data model
from .models import  Questionsset


# create a serializer class
class RankdomSerializer(serializers.ModelSerializer):
    # create a meta class
    class Meta:
        model = Questionsset
        fields = ('title','supercategory', 'category', 'description','like','dislike', 'content_array',"create_date","emoji")
