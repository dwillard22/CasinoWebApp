"""Admin configuration for game models in the casino application."""
from django.contrib import admin
from .models import Game
admin.site.register(Game)
