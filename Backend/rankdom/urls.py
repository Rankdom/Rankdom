from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path,include


from rankdom.api.views import Authenticate, register, home,CustomUser,login,getProfileInfo,setProfileInfo
from rest_framework import routers

from rankdom import views

from django.contrib import admin

# create a router object
apiRouter = routers.DefaultRouter()

# register the router
apiRouter.register(r'Questions', views.RankdomView, 'Question')
apiRouter.register(r'Users',views.CustomUser ,'Users')
apiRouter.register(r'Answer', views.AnswerView, 'Answer')

urlpatterns = [
    path("", home, name="home"),
    path("Register/", register.as_view(), name="register"),
    path("Login/", login.as_view(), name="login"),
    path("GetProfile/", getProfileInfo.as_view(), name="getProfile"),
    path("SetProfile/", setProfileInfo.as_view(), name="setProfile"),
    path("authenticator/", Authenticate.as_view(), name="authenticator"),
    path("api/", include(apiRouter.urls), name="api"),
    path('admin/', admin.site.urls),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
