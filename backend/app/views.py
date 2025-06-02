from django.shortcuts import render
from .models import Property
from .serializers import PropertySerializer
from rest_framework import generics

# Create your views here.
class PropertyListCreateView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer 
    def perform_create(self, serializer):
        serializer.save(host=self.request.user)