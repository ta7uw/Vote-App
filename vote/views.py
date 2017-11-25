from django.views.generic import TemplateView, DetailView
from .models import Finalist, Question, Choice
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required


class VotePage(TemplateView):
    """
    Top Page
    """
    template_name = "vote/index.html"



class ThanksPage(TemplateView):
    """
    Thanks Page For Vote
    """
    template_name = "vote/thanks.html"


class QestionDetail(DetailView):
    template_name = "vote/detial.html"
    model = Question


@login_required
def vote(request, pk):
    question = get_object_or_404(Question, pk=pk)
    try:
        selected_choice = question.choice_set.get(pk=request.POST["choice"])
    except (KeyError, Choice.DoesNotExist):
        return render(request, "vote/detial.html", {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        return redirect("vote:thanks")

