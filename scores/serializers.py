"""serializer for leaderboard model in the casino application."""

from rest_framework import serializers
from .models import Leaderboard

class LeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaderboard
        fields = "__all__"
