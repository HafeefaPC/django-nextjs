from . import views
from django.urls import path,include
from django.contrib import admin

urlpatterns = [
    
    path('properties/', views.PropertyListCreateView.as_view()),
   path('properties/<int:pk>/', views.PropertyRetrieveUpdateDestroyView.as_view()),
    path('bookings/', views.BookingListCreateView.as_view()),
    path('bookings/<int:pk>/', views.BookingRetrieveUpdateDestroyView.as_view()),

   

]