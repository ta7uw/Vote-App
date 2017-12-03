from django.views.generic import TemplateView, DetailView, ListView
from .models import Question, Choice
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.http import JsonResponse


class VotePage(ListView):
    """
    Top Page
    """
    template_name = "vote/index.html"
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """Return the last five published polls."""
        return Question.objects.order_by('-pub_date')[:5]

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(VotePage, self).dispatch(*args, **kwargs)


class ThanksPage(TemplateView):
    """
    Thanks Page For Vote
    """
    template_name = "vote/thanks.html"

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(ThanksPage, self).dispatch(*args, **kwargs)


class QuestionDetail(DetailView):
    template_name = "vote/detial.html"
    model = Question

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(QuestionDetail, self).dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["votes"] = self.request.user.votes
        return context


class ResultsView(DetailView):
    model = Question
    template_name = 'vote/results.html'


@login_required
def vote(request, pk):
    if request.method == "POST":
        votes_counts = request.POST.getlist('choice')
        print(votes_counts)
        question = get_object_or_404(Question, pk=pk)
        if votes_counts == request.user.votes:
            for i, count in enumerate(votes_counts):
                pk = i + 1
                count = int(count)
                if count != 0:
                    try:
                        selected_choice = question.choice_set.get(pk=pk)
                    except (KeyError, Choice.DoesNotExist):
                        return render(request, "vote/detial.html", {
                            'question': question,
                            'error_message': "You didn't select a choice.",
                        })
                    else:
                        selected_choice.votes += count
                        selected_choice.save()

            return redirect("vote:thanks")

        else:
            print("Not enough")
            return render(request, "vote/detial.html", {
                'question': question,
                'error_message': "You didn't select a choice.",
            })

    else:
        redirect("vote:index")


def ajax_get(request, pk):
    if request.method == "GET":
        question = get_object_or_404(Question, pk=pk)
        choices = question.choice_set.all()
        choice_list = []
        for choice in choices:
            choice_contents = {
                "choice_text": choice.choice_text,
                "votes": choice.votes,
            }
            choice_list.append(choice_contents)

        choice_json = {
            "choice_list": choice_list
        }
        return JsonResponse(data=choice_json)