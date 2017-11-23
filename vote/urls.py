from django.conf.urls import url
from . import views
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns =[
    url(r'(?P<pk>\d+)/$', views.QestionDetail.as_view(), name='detail'),
    url(r'(?P<pk>\d+)/vote$', views.vote, name='vote'),
    url(r"^thanks/$", views.ThanksPage.as_view(), name="thanks")
    url(r'^login/$', LoginView.as_view(), name='login'),
    url(r'^logout/$', LogoutView.as_view(), name='logout'),
]