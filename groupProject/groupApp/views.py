from django.shortcuts import render, HttpResponse
from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime, timedelta
from django.views.decorators.csrf import csrf_exempt
import json


client = MongoClient('mongodb+srv://MykhailoOstapovets:qwerty12345@database.sf5mx.mongodb.net/?retryWrites=true&w=majority&appName=database')
db = client['nova_poshta']

parcels_collection = db['parcels']
users_collection = db['users']

@csrf_exempt
def create_parcel(request):
  if request.method == "POST":
    try:
      data = json.loads(request.body.decode("utf-8"))
      parcel = {
        "sending_country": data.get("sending_country"),
        "delivery_country": data.get("delivery_country"),
        "shipment_type": data.get("shipment_type"),
        "parcel_size": data.get("parcel_size"),
        "document_type": data.get("document_type"),
        "description": data.get("description"),
        "sender_info": data.get("sender_info"),
        "recipient_info": data.get("recipient_info"),
        "status": data.get("status", "Created"),
        "created_at": datetime.now(),
        "updated_at": datetime.now() + timedelta(hours = 72),
      }
      inserted_id = parcels_collection.insert_one(parcel).inserted_id
      
      return JsonResponse({"message": "Parcel created successfully", "parcel_id": str(inserted_id)}, status = 201)
    except json.JSONDecodeError:
      return JsonResponse({"error": "Invalid JSON data"}, status = 400)
    except Exception as e:
      return JsonResponse({"error": str(e)}, status = 500)
  else:
    return JsonResponse({"error": "Invalid HTTP method"}, status = 405)

def track_parcel(request):
  if request.method == "GET":
    trackingCode = request.GET.get("trackingCode", None)
    if not trackingCode:
      return JsonResponse({"error" : "Tracking code is required."}, status = 400)
    
    try:
      tracking_code_objectid = ObjectId(trackingCode)
    except Exception:
      return JsonResponse({"error" : "Invalid tracking code format."}, status = 400)
    
    parcel = parcels_collection.find_one({"_id" : tracking_code_objectid})
    if parcel:
      parcel_info = {
        "sending_country" : parcel.get("sending_country"),
        "delivery_country" : parcel.get("delivery_country"),
        "shipment_type" : parcel.get("shipment_type"),
        "parcel_size" : parcel.get("parcel_size"),
        "document_type" : parcel.get("document_type"),
        "description" : parcel.get("description"),
        "sender_info" : parcel.get("sender_info"),
        "recipient_info" : parcel.get("recipient_info"),
        "status" : parcel.get("status"),
        "created_at" : parcel.get("created_at").strftime("%Y-%m-%d %H:%M:%S"),
        "updated_at" : parcel.get("updated_at").strftime("%Y-%m-%d %H:%M:%S"),
      }
      return JsonResponse(parcel_info)
    else:
      return JsonResponse({"error" : "No parcel found with this tracking code."}, status = 404)

@csrf_exempt
def register_user(request):
  if request.method == "POST":
    try:
      data = json.loads(request.body.decode("utf-8"))
      full_name = data.get("full_name")
      email = data.get("email")
      password = data.get("password")
      
      if users_collection.find_one({"email" : email}):
        return JsonResponse({"message" : "User already exists"}, status = 400)
      
      hashed_password = make_password(password)
      user_data = {
        "full_name" : full_name,
        "email" : email,
        "password" : hashed_password,
      }
      users_collection.insert_one(user_data)
        
      return JsonResponse({"message" : "User registered successfully"}, status = 201)
    except json.JSONDecodeError:
      return JsonResponse({"error" : "Invalid JSON data"}, status = 400)
    except Exception as e:
      return JsonResponse({"error" : str(e)}, status = 500)
  else:
    return JsonResponse({"error" : "Invalid HTTP method"}, status = 405)
  
  
@csrf_exempt
def login_user(request):
  if request.method == "POST":
    try:
      data = json.loads(request.body.decode("utf-8"))
      email = data.get("email")
      password = data.get("password")
      
      user = users_collection.find_one({"email" : email})
      if user and check_password(password, user["password"]):
        return JsonResponse({"message" : "Login successful"}, status = 200)
      
      return JsonResponse({"message" : "Invalid credentials"}, status = 401)
    except json.JSONDecodeError:
      return JsonResponse({"error" : "Invalid JSON data"}, status = 400)
    except Exception as e:
      return JsonResponse({"error" : str(e)}, status = 500)
  else:
    return JsonResponse({"error" : "Invalid HTTP method"}, status = 405)
