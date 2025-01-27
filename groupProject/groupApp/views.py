from django.shortcuts import render, HttpResponse
from django.http import JsonResponse

def track_parcel(request):
  if request.method == "GET":
    trackingCode = request.GET.get('trackingCode', None)
    if not trackingCode:
      return JsonResponse({"error": "Tracking code is required."}, status = 400)
    
    mockData = {
      "123456": {
          "status": "In Transit",
          "origin": "New York, NY",
          "destination": "Los Angeles, CA",
          "estimatedDelivery": "2025-02-01",
      },
      "654321": {
          "status": "Delivered",
          "origin": "Chicago, IL",
          "destination": "Houston, TX",
          "deliveryDate": "2025-01-25",
      },
    }
    parcelInfo = mockData.get(trackingCode)
    if parcelInfo:
      return JsonResponse(parcelInfo)
    else:
      return JsonResponse({"error": "No parcel found with this tracking code."}, status = 404)


