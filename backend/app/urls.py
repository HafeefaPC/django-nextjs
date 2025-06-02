from . import views
from django.urls import path,include
from django.contrib import admin

urlpatterns = [
    
    path('properties/', views.PropertyListCreateView.as_view()),
    

]