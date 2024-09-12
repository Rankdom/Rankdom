from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse


def index(request):
    return HttpResponse(template.render("\\templates\\RankdomFront-main\\index.html"))
