from django.db import models
from rest_framework import serializers


class CustomUser(models.Model):
    username = models.CharField(max_length=150)
    email = models.EmailField(null=True, blank=True)
    code=models.CharField(max_length=128, blank=True, null=False,)


class UserRegistration(models.Model):
    email = models.EmailField()
    username = models.CharField(max_length=255)
    code = models.CharField(max_length=15)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username','email','code']
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {"required": False, "allow_null": True},
            "code": {"required": False, "allow_null": True},
            "username": {"required": False, "allow_null": True},


        }




class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    image_file = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    image_url = models.URLField(max_length=200, null=True, blank=True)

    def __str__(self):
        return f"Profile of {self.user.username}"