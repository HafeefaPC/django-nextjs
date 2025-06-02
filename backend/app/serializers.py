from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from .models import User, Property, AmenityType, PropertyType, Room, Amenity, Booking, RoomBooking, Review, Photo


class CustomRegisterSerializer(RegisterSerializer):
    is_host = serializers.BooleanField(default=False, required=False)

    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()
        return {
            'username': self.cleaned_data.get('username', ''),
            'email': self.cleaned_data.get('email', ''),
            'password1': self.cleaned_data.get('password1', ''),
            'password2': self.cleaned_data.get('password2', ''),
            'is_host': self.cleaned_data.get('is_host', ''),
        }
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ( 'username','first_name','last_name', 'email', 'is_host')
        read_only_fields = ('id',)
    
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Room
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class photoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'
       
class AmenityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AmenityType
        fields = '__all__'

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = '__all__'

class PropertyTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyType
        fields = '__all__'