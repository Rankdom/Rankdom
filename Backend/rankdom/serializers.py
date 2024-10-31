from rest_framework import serializers

# import the rankdom data model
from .models import Rankdom, Questionsset


# create a serializer class
class RankdomSerializer(serializers.ModelSerializer):
    # create a meta class
    class Meta:
        model = Questionsset
        fields = ('supercategory', 'category', 'description', 'content_array')
