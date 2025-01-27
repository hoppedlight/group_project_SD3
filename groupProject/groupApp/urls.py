from django.urls import path
from .views import track_parcel

urlpatterns = [
    path('api/track-parcel/', track_parcel, name='track_parcel'),
]