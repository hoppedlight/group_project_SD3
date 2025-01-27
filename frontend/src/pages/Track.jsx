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
  
    try {
      const response = await fetch(`http://localhost:8000/api/track-parcel/?trackingCode=${trackingCode}`);
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong.");
        return;
      }
  
      const data = await response.json();
      setParcelInfo(data);
    } catch (err) {
      setError("Failed to connect to the server. Please try again later.");
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
          <p>
            <strong>Status:</strong> {parcelInfo.status}
          </p>
          <p>
            <strong>Origin:</strong> {parcelInfo.origin}
          </p>
          <p>
            <strong>Destination:</strong> {parcelInfo.destination}
          </p>
          {parcelInfo.estimatedDelivery && (
            <p>
              <strong>Estimated Delivery:</strong>{" "}
              {parcelInfo.estimatedDelivery}
            </p>
          )}
          {parcelInfo.deliveryDate && (
            <p>
              <strong>Delivery Date:</strong> {parcelInfo.deliveryDate}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Track;
