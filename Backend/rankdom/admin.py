from django.contrib import admin

from .api.views import CustomUser
# import the model Rankdom
from .models import  Questionsset, CustomUser , Answer


# create a class for the admin-model integration
class RankdomAdmin(admin.ModelAdmin):
    # add the fields of the model here
    list_display = ("supercategory", "category", "description","content_array")


# we will need to register the
# model class and the Admin model class
# using the register() method
# of admin.site class
admin.site.register(Questionsset, RankdomAdmin)

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'code','image')


admin.site.register(CustomUser, UserAdmin)

class AnswerAdmin(admin.ModelAdmin):
    list_display = ("supercategory", "category", "description","content_array")

admin.site.register(Answer, AnswerAdmin)
