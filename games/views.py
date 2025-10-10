"""This module holds the views for the leaderboards"""
# pylint: disable=no-member

from rest_framework import viewsets
from .models import Leaderboard
from .serializers import LeaderboardSerializer


class LeaderboardViewSet(viewsets.ModelViewSet):

    """
    summary: This function will hold
    the various views needed for the application's leaderboards
    """
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer
