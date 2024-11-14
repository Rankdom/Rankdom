import datetime

from django.db import models


# Create your models here.

class CustomUser(models.Model):
    username = models.CharField(max_length=150)
    email = models.EmailField(null=True, blank=True)
    code = models.CharField(max_length=128, blank=True, null=False)
    image = models.ImageField(blank=True, null=False)


class Questionsset(models.Model):
    title = models.CharField(max_length=150)
    supercategory = models.CharField(max_length=150)
    category = models.CharField(max_length=150)
    description = models.CharField(max_length=500)
    like = models.IntegerField(default=0)
    dislike = models.IntegerField(default=0)
    create_date = models.DateTimeField(default=datetime.datetime.now())
    content_array = models.JSONField(max_length=400)
    emoji = models.CharField(max_length=150)
    user  = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)

class Answer(models.Model):
    title = models.CharField(max_length=150)
    supercategory = models.CharField(max_length=150)
    category = models.CharField(max_length=150)
    description = models.CharField(max_length=500)
    like = models.IntegerField(default=0)
    dislike = models.IntegerField(default=0)
    create_date = models.DateTimeField(default=datetime.datetime.now())
    content_array = models.JSONField(max_length=400)
    emoji = models.CharField(max_length=150)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)


    def __str__(self):
        # it will return the title
        return self.supercategory






class UserRegistration(models.Model):
    email = models.EmailField()
    username = models.CharField(max_length=255)
    code = models.CharField(max_length=15)
