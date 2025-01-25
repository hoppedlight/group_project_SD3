#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from pymongo import MongoClient
from datetime import datetime, timezone

client = MongoClient('mongodb+srv://MykhailoOstapovets:qwerty12345@database.sf5mx.mongodb.net/?retryWrites=true&w=majority&appName=database')
db = client['nova_poshta']

users_collection = db['users']
parcels_collection = db['parcels']
statuses_collection = db['statuses']

def create_user(name, email, phone):
    user = {
        "name": name,
        "email": email,
        "phone": phone,
        "registered_date": datetime.now(timezone.utc)
    }
    result = users_collection.insert_one(user)
    print(f"The user was created with the ID: {result.inserted_id}")

def create_parcel(sender_id, receiver_id, description, size, cost, origin, destination):
    parcel = {
        "sender_id": sender_id,
        "receiver_id": receiver_id,
        "description": description,
        "size": size,
        "cost": cost,
        "origin": origin,
        "destination": destination,
        "status": "Parcel was created ;)",
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc)
    }
    result = parcels_collection.insert_one(parcel)
    print(f"The parcel was created with the track-number: {result.inserted_id}")

def update_parcel_status(parcel_id, new_status):
    parcels_collection.update_one(
        {"_id": parcel_id},
        {"$set": {"status": new_status, "updated_at": datetime.now(timezone.utc)}}
    )
    status_entry = {
        "parcel_id": parcel_id,
        "status": new_status,
        "timestamp": datetime.now(timezone.utc)
    }
    statuses_collection.insert_one(status_entry)
    print(f"Status of parcel {parcel_id} updated to: {new_status}")

def track_parcel(parcel_id):
    parcel = parcels_collection.find_one({"_id": parcel_id})
    if parcel:
        statuses = statuses_collection.find({"parcel_id": parcel_id})
        print(f"Information about parcel: {parcel}")
        print("History of statuses:")
        for status in statuses:
            print(f"- {status['status']} (time: {status['timestamp']})")
    else:
        print("Parcel not found.")

if __name__ == "__main__":
    create_user("Dmytro Grebeniev", "Dmytro@gmail.com", "+380123455789")
    create_user("Maksym Kyryk", "Maksym@gmail.com", "+380987654321")

    sender_id = users_collection.find_one({"name": "Maksym Kyryk"})["_id"]
    receiver_id = users_collection.find_one({"name": "Dmytro Grebeniev"})["_id"]

    create_parcel(
        sender_id, 
        receiver_id, 
        "Book for Dmytro", 
        size="30x20x10 cm",  
        cost=200,  
        origin="Lviv",  
        destination="Kyiv" 
    )

    parcel_id = parcels_collection.find_one({"description": "Book for Dmytro"})["_id"]

    update_parcel_status(parcel_id, "Sent")
    update_parcel_status(parcel_id, "On the way")

    track_parcel(parcel_id)

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'groupProject.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)