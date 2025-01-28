from django.urls import path
from .views import track_parcel, create_parcel

urlpatterns = [
    path('api/track-parcel/', track_parcel, name = 'track_parcel'),
    path('api/create-parcel/', create_parcel, name = 'create_parcel'),
]