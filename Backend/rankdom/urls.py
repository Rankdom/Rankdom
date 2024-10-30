from django.urls import path,include
from django.contrib import admin

from djangoProject.urls import router
from rankdom.api.views import *



urlpatterns = [
    path("", home, name="home"),
    path("Register/", login.as_view(), name="login"),
    path("authenticator/", Authenticate.as_view(), name="authenticator"),
    path("api/",include(router.urls),name="api"),
    path('admin/', admin.site.urls),

]