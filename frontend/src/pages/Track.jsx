import React, { useState } from "react";

const Track = () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [parcelInfo, setParcelInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!trackingCode) {
      setError("Please enter a tracking code.");
      return;
    }

    setError(null);
    setParcelInfo(null);

    const mockData = {
      "123456": {
        status: "In Transit",
        origin: "New York, NY",
        destination: "Los Angeles, CA",
        estimatedDelivery: "2025-02-01",
      },
      "654321": {
        status: "Delivered",
        origin: "Chicago, IL",
        destination: "Houston, TX",
        deliveryDate: "2025-01-25",
      },
    };

    const result = mockData[trackingCode];

    if (result) {
      setParcelInfo(result);
    } else {
      setError("No parcel found with this tracking code.");
    }
  };

  return (
    <div className="tracking-container">
      <h1 className="tracking-title">Parcel Tracker</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter your tracking code"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
          className="tracking-input"
        />
        <button onClick={handleSearch} className="tracking-button">
          Track
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {parcelInfo && (
        <div className="parcel-info">
          <h2>Parcel Details</h2>
          <p><strong>Status:</strong> {parcelInfo.status}</p>
          <p><strong>Origin:</strong> {parcelInfo.origin}</p>
          <p><strong>Destination:</strong> {parcelInfo.destination}</p>
          {parcelInfo.estimatedDelivery && (
            <p><strong>Estimated Delivery:</strong> {parcelInfo.estimatedDelivery}</p>
          )}
          {parcelInfo.deliveryDate && (
            <p><strong>Delivery Date:</strong> {parcelInfo.deliveryDate}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Track;