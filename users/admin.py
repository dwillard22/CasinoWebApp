"""Admin configuration for user profiles in the casino application."""

from django.contrib import admin
from .models import UserProfile
admin.site.register(UserProfile)
