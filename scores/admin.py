""""Admin configuration for leaderboard models in the casino application."""
from django.contrib import admin
from .models import Leaderboard
admin.site.register(Leaderboard)
