from django.db import models


# Create your models here.
class Rankdom(models.Model):
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)


class Questionsset(models.Model):
    supercategory = models.CharField(max_length=150)
    category = models.CharField(max_length=150)
    description = models.CharField(max_length=500)
    content_array = models.JSONField(max_length=400)
    def __str__(self):
        # it will return the title
        return self.title
