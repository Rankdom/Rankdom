from django.contrib import admin

# add include to the path
from django.urls import path, include

# import views from rankdom
from rankdom import views

# import routers from the REST framework
# it is necessary for routing
from rest_framework import routers

# create a router object
router = routers.DefaultRouter()

# register the router
router.register(r'tasks',views.RankdomView, 'task')

urlpatterns = [


]