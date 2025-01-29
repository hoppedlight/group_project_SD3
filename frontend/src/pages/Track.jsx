import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBox,
  faInfoCircle,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

const Track = () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [parcelInfo, setParcelInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!trackingCode) {
      setError("Please enter a tracking code.");
      return;
    }

    setError(null);
    setParcelInfo(null);
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/track-parcel/?trackingCode=${trackingCode}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setParcelInfo(data);
    } catch (err) {
      setError("Failed to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tracking-container">
      <h1 className="tracking-title">Track Your Parcel</h1>
      <p className="tracking-subtitle">
        Enter your tracking code to check the status of your package.
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter your tracking code"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="tracking-input"
        />
        <button onClick={handleSearch} className="tracking-button">
          <FontAwesomeIcon icon={faSearch} /> Track
        </button>
      </div>

      {loading && <p className="loading-message">Fetching data...</p>}
      {error && <p className="error-message">{error}</p>}

      {parcelInfo && (
        <div className="parcel-info">
          <h2>
            <FontAwesomeIcon icon={faBox} /> Parcel Details
          </h2>
          <p>
            <FontAwesomeIcon icon={faInfoCircle} /> <strong>Status:</strong>{" "}
            {parcelInfo.status}
          </p>
          <p>
            <strong>Description:</strong> {parcelInfo.description}
          </p>
          <p>
            <strong>Created at:</strong> {parcelInfo.created_at}
          </p>
          {parcelInfo.updated_at && (
            <p>
              <FontAwesomeIcon icon={faTruck} />{" "}
              <strong>Estimated Delivery:</strong> {parcelInfo.updated_at}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Track;