from django.db import models

from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    is_host = models.BooleanField(default=False)

class AmenityType(models.Model):
    name = models.CharField(max_length=100)

class PropertyType(models.Model):
    name = models.CharField(max_length=100)

class Room(models.Model):
    name = models.CharField(max_length=100)
    capacity = models.PositiveSmallIntegerField()

class Property(models.Model):
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    price= models.DecimalField(max_digits=6, decimal_places=2)
    location = models.CharField(max_length=200) 
    available_start = models.DateField()
    available_end = models.DateField()
    photos = models.ManyToManyField('Photo')
    property_type = models.ForeignKey(PropertyType, on_delete=models.SET_NULL, null=True)
    room=models.ManyToManyField(Room)
    amenities = models.ManyToManyField(AmenityType, through='Amenity')

class Amenity(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='property_amenities')
    amenity_type = models.ForeignKey(AmenityType, on_delete=models.CASCADE, related_name='amenity_properties', default=None)

class Booking(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    guest = models.ForeignKey(User, on_delete=models.CASCADE,)
    rooms = models.ManyToManyField(Room, through='RoomBooking')

class RoomBooking(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    adults = models.PositiveSmallIntegerField()
    children = models.PositiveSmallIntegerField()


class Review(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField()
    review_text = models.TextField()
    
class Photo(models.Model):
    url = models.URLField()
    alt_text = models.CharField(max_length=200)



