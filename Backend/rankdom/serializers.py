from rest_framework import serializers

# import the rankdom data model
from .models import Rankdom


# create a serializer class
class RankdomSerializer(serializers.ModelSerializer):
    # create a meta class
    class Meta:
        model = Rankdom
        fields = ('id', 'title', 'description', 'completed')
