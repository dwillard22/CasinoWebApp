"""Serializer for the Leaderboard model."""
from rest_framework import serializers
from .models import Leaderboard


class LeaderboardSerializer(serializers.ModelSerializer):
    """Serializer for the Leaderboard model."""
    class Meta:
        """class that defines the model and fields to be serialized"""
        model = Leaderboard
        fields = '__all__'

    def validate_score(self, value):
        """Ensure the score is a non-negative integer."""
        if value < 0:
            raise serializers.ValidationError("Score cannot be negative.")
        return value
