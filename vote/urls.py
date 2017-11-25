from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'detail/(?P<pk>[0-9]+)/$', views.QestionDetail.as_view(), name='detail'),
    url(r'(?P<pk>\d+)/vote$', views.vote, name='vote'),
    url(r"^thanks/$", views.ThanksPage.as_view(), name="thanks"),

]