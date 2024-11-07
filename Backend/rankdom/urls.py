from django.urls import path,include
from win32comext.axscript.client.framework import profile

from rankdom.api.views import login,Authenticate,profile,home



urlpatterns = [
    path("", home, name="home"),
    path("Register/", login.as_view(), name="login"),
    path("authenticator/", Authenticate.as_view(), name="authenticator"),
    path("profile/", profile.as_view(), name="authenticator"),

]