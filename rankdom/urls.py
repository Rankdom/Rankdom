from django.urls import path,include
from rankdom.api.views import RegisterUserView,LoginUserView,home


urlpatterns = [
    path("", home, name="home"),
    path("routeGoogle/", LoginUserView.as_view(), name="Login"),
    path("Register/", RegisterUserView.as_view(), name="Register")]