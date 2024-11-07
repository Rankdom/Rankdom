import datetime

from django.db import models


# Create your models here.
class Questionsset(models.Model):
    title = models.CharField(max_length=150)
    supercategory = models.CharField(max_length=150)
    category = models.CharField(max_length=150)
    description = models.CharField(max_length=500)
    like = models.IntegerField(default=0)
    dislike = models.IntegerField(default=0)
    create_date = models.DateTimeField(default=datetime.datetime.now())
    content_array = models.JSONField(max_length=400)

    def __str__(self):
        # it will return the title
        return self.supercategory


