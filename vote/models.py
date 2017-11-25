from django.db import models
from django.contrib.auth.models import AbstractUser


class Judge(models.Model):
    votes = models.IntegerField("number of votes", default=1)


class Finalist(models.Model):
    class Meta:
        ordering = ["-number"]
    name = models.CharField("name",max_length=128, blank=False, null=False)
    number = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.question_text


class Choice(models.Model):
    question = models.ForeignKey(Question)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
