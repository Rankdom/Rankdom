from rest_framework import serializers

from rankdom.models import CustomUser



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'code', 'image']
        extra_kwargs = {
            "email": {"required": False, "allow_null": True},
            "code": {"required": False, "allow_null": True},
            "username": {"required": False, "allow_null": True},
            "image": {"required": False, "allow_null": True},

        }

