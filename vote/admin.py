from django.contrib import admin
from .models import Judge, Finalist, Question, Choice


class ChoiceInline(admin.StackedInline):
    model = Choice
    extra = 5


class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]


admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(Judge)
admin.site.register(Finalist)