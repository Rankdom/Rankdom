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
    emoji = models.CharField(max_length=150)

    def __str__(self):
        # it will return the title
        return self.supercategory




class Profile(models.Model):
    image = models.ImageField(upload_to='product_images/'),
    name = models.CharField(max_length=150, blank=True, null=True),



    def __str__(self):
        return f"Profile of {self.user.username}"

class CustomUser(models.Model):
    username = models.CharField(max_length=150)
    email = models.EmailField(null=True, blank=True)
    code = models.CharField(max_length=128, blank=True, null=False, )
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='user'
                                , null=True, blank=True)




class UserRegistration(models.Model):
    email = models.EmailField()
    username = models.CharField(max_length=255)
    code = models.CharField(max_length=15)
