from django.shortcuts import render

# import view sets from the REST framework
from rest_framework import viewsets

from .models import Questionsset
# import the TodoSerializer from the serializer file
from .serializers import RankdomSerializer


# import the Todo model from the models file


# create a class for the Todo model viewsets
class RankdomView(viewsets.ModelViewSet):
    serializer_class = RankdomSerializer

    queryset = Questionsset.objects.all()
