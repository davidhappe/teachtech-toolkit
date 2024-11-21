from django.urls import path
from . import views

# url for the autograder creation endpoint
urlpatterns = [
    path('autograder/', views.create_autograder, name='create-autograder'),
]