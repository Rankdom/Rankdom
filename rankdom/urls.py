from django.urls import path
from rankdom.api.RegisterView import RegisterUserView
from django.http import HttpResponse
from rankdom.api.LoginView import LoginUserView



def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

urlpatterns = [
    path("", index, name="index"),
    path("routeGoogle/", LoginUserView.as_view(), name="Login"),
    path("Register/", RegisterUserView.as_view(), name="Register")]