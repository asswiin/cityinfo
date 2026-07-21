from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.hashers import make_password
import re


class UserProfileSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = UserProfile
        fields = [
            'name',
            'phone',
            'email',
            'password',
            'confirm_password'
        ]

    def validate_phone(self, value):

        if not re.match(r'^[6-9]\d{9}$', value):
            raise serializers.ValidationError(
                "Phone number must start with 6,7,8,9 and contain 10 digits."
            )

        return value

    def validate_email(self, value):

        valid_domains = [
            '@gmail.com',
            '@yahoo.com',
            '@outlook.com'
        ]

        if not any(
            value.endswith(domain)
            for domain in valid_domains
        ):
            raise serializers.ValidationError(
                "Invalid email domain."
            )

        return value

    def validate_password(self, value):

        if len(value) < 8:
            raise serializers.ValidationError(
                "Password must contain at least 8 characters."
            )

        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError(
                "Password must contain an uppercase letter."
            )

        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError(
                "Password must contain a lowercase letter."
            )

        if not re.search(r'\d', value):
            raise serializers.ValidationError(
                "Password must contain a number."
            )

        return value

    def validate(self, data):

        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError(
                {
                    "confirm_password":
                    "Passwords do not match."
                }
            )

        return data

    def create(self, validated_data):

        validated_data.pop(
            'confirm_password'
        )

        validated_data['password'] = make_password(
            validated_data['password']
        )

        return UserProfile.objects.create(
            **validated_data
        )