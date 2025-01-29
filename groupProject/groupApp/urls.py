from django.urls import path
from .views import track_parcel, create_parcel, register_user, login_user

urlpatterns = [
    path('api/track-parcel/', track_parcel, name = 'track_parcel'),
    path('api/create-parcel/', create_parcel, name = 'create_parcel'),
    path('register/', register_user, name = 'register' ),
    path("login/", login_user, name = "login"),
]