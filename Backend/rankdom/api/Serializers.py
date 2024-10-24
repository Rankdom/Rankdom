from django.db import models
from rest_framework import serializers


class CustomUser(models.Model):
    username = models.CharField(max_length=150)
    email = models.EmailField(null=True, blank=True)
    code = models.CharField(max_length=128, blank=True, null=False,)


class UserRegistration(models.Model):
    email = models.EmailField()
    username = models.CharField(max_length=255)
    code = models.CharField(max_length=15)
class codeRegister(models.Model):
    code = models.CharField(max_length=100)


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


class codeSerializer(serializers.ModelSerializer):
    class Meta:
        model = codeRegister
        fields = ['code']


