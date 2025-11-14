"""Serializer for user profile model in the casino application."""
from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    """Class to serialize UserProfile model data."""
    class Meta:
        """class Meta to define model and fields."""
        model = UserProfile
        fields = "__all__"
