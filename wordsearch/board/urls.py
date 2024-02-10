from django.urls import path
from . import views

urlpatterns = [
    path('', views.create_board, name="create_board"),
    path('sidebar', views.sidebar, name="sidebar"),
]
