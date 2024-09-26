from django.db import models
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class CustomUser(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(null=True, blank=True)
    password = models.CharField(max_length=128)



class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username','password','email']
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {"required": False, "allow_null": True}
        }


    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        user = CustomUser(**validated_data)
        user.save()
        return user
