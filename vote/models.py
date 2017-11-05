from django.db import models
import uuid


class User(models.Model):
    name = models.CharField("name", max_length=128, blank=False, null=False)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return self.name


class Finalist(models.Model):
    class Meta:
        ordering = ["-number"]
    name = models.CharField("name",max_length=128, blank=False, null=False)
    number = models.IntegerField(default=0)
    Votes = models.IntegerField(default=0)

    def __str__(self):
        return self.name
