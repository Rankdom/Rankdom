from django.shortcuts import render

# import view sets from the REST framework
from rest_framework import viewsets

from .models import Questionsset
# import the TodoSerializer from the serializer file
from .serializers import RankdomSerializer

# import the Todo model from the models file


# create a class for the Todo model viewsets
class RankdomView(viewsets.ModelViewSet):
    # create a serializer class and
    # assign it to the TodoSerializer class
    serializer_class = RankdomSerializer

    # define a variable and populate it
    # with the Todo list objects
    queryset = Questionsset.objects.all()





