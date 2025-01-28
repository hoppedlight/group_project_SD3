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
      const response = await fetch(
        `http://localhost:8000/api/track-parcel/?trackingCode=${trackingCode}`
      );

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
            <strong>Description:</strong> {parcelInfo.description}
          </p>
          <p>
            <strong>Shipment Type:</strong> {parcelInfo.shipment_type}
          </p>
          {parcelInfo.shipment_type === "parcel" && (
            <p>
              <strong>Parcel Size:</strong> {parcelInfo.parcel_size}
            </p>
          )}
          {parcelInfo.shipment_type === "documents" && (
            <p>
              <strong>Document Type:</strong> {parcelInfo.document_type}
            </p>
          )}
          <p>
            <strong>Sending Country:</strong> {parcelInfo.sending_country}
          </p>
          <p>
            <strong>Delivery Country:</strong> {parcelInfo.delivery_country}
          </p>
          <p>
            <strong>Created at:</strong> {parcelInfo.created_at}
          </p>
          {parcelInfo.updated_at && (
            <p>
              <strong>Last Updated:</strong> {parcelInfo.updated_at}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Track;