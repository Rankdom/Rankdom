from django.urls import path, include
from django.contrib import admin

from rankdom.api.views import *

from rankdom.api.views import Authenticate, login, home
from rest_framework import routers

from rankdom import views

# create a router object
apiRouter = routers.DefaultRouter()

# register the router
apiRouter.register(r'Questions', views.RankdomView, 'Question')

urlpatterns = [
    path("", home, name="home"),
    path("Register/", login.as_view(), name="login"),
    path("authenticator/", Authenticate.as_view(), name="authenticator"),
    path("api/", include(apiRouter.urls), name="api"),
    path('admin/', admin.site.urls),

]
