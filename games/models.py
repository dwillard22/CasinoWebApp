"""
    summary: Models that will be migrated into the backend
"""
from django.db import models
from django.contrib.auth.models import User

class Leaderboard(models.Model):
    """
    summary: This function will hold
    the various models needed for the application's leaderboards
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE) # Link to Django's built-in User model
    game_name = models.CharField(max_length=100)
    score = models.PositiveIntegerField()
    date_played = models.DateTimeField(auto_now_add=True)

    class Meta:
        """Class that defines the ordering and constraints of the model"""

        ordering = ['-score']
        verbose_name_plural = 'Leaderboards'
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'game_name', 'score', 'date_played'],
                name='uniq_entry_snapshot'
            )
        ]

    def __str__(self):
        return f'{self.user.username} · {self.game_name} · {self.score}' # pylint: disable=no-member
