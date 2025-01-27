from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime, timezone

client = MongoClient('mongodb+srv://MykhailoOstapovets:qwerty12345@database.sf5mx.mongodb.net/?retryWrites=true&w=majority&appName=database')
db = client['nova_poshta']

parcels_collection = db['parcels']


def track_parcel(request):
  if request.method == "GET":
    trackingCode = request.GET.get('trackingCode', None)
    if not trackingCode:
      return JsonResponse({"error": "Tracking code is required."}, status = 400)
    
    tracking_code_objectid = ObjectId(trackingCode)
    parcel = parcels_collection.find_one({"_id": tracking_code_objectid})
    
    if parcel:
      parcelInfo = {
        "status" : parcel.get("status"),
        "description": parcel.get("description"),
        "sender_id": str(parcel.get("sender_id")),
        "created_at": parcel.get("created_at").strftime("%Y-%m-%d %H:%M:%S"),
        "updated_at": parcel.get("updated_at").strftime("%Y-%m-%d %H:%M:%S"),
      }
      return JsonResponse(parcelInfo)
    else:
      return JsonResponse({"error": "No parcel found with this tracking code."}, status = 404)


