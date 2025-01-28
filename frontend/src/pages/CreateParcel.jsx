import React, { useState } from "react";
import "./style.css";

export const CreateParcel = () => {
  const [sendingCountry, setSendingCountry] = useState("Poland");
  const [deliveryCountry, setDeliveryCountry] = useState("Poland");
  const [shipmentType, setShipmentType] = useState("parcel");
  const [parcelSize, setParcelSize] = useState("small");
  const [parcelDescription, setParcelDescription] = useState("");
  const [senderInfo, setSenderInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [recipientInfo, setRecipientInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [documentType, setDocumentType] = useState("A4");

  const handleInputChange = (event, setter) => {
    const { name, value } = event.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async () => {
    const parcelData = {
      sending_country: sendingCountry,
      delivery_country: deliveryCountry,
      shipment_type: shipmentType,
      parcel_size: shipmentType === "parcel" ? parcelSize : null,
      document_type: shipmentType === "documents" ? documentType : null,
      description: parcelDescription,
      sender_info: senderInfo,
      recipient_info: recipientInfo,
    };

    try {
      const response = await fetch("http://localhost:8000/api/create-parcel/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parcelData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating parcel:", errorData);
        alert(errorData.error || "Failed to create parcel.");
        return;
      }

      const data = await response.json();
      alert(
        `Parcel created! Tracking code: ${data.parcel_id}`
      );
    } catch (err) {
      console.error("Error connecting to server:", err);
      alert("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ backgroundColor: "#f0f0f0" }}>
        <div className="header-line">
          <img
            src="http://localhost:3000/image1.png"
            alt="Logo"
            className="logo"
          />
          <h1 className="header-title">Nova Post</h1>
        </div>

        <h1 className="title">Create a Parcel</h1>

        <div className="form-group">
          <label className="label">Sending Country</label>
          <select
            className="input"
            value={sendingCountry}
            onChange={(e) => setSendingCountry(e.target.value)}
          >
            <option value="Poland">Poland</option>
            <option value="Ukraine">Ukraine</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Czech Republic">Czech Republic</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label">Delivery Country</label>
          <select
            className="input"
            value={deliveryCountry}
            onChange={(e) => setDeliveryCountry(e.target.value)}
          >
            <option value="Poland">Poland</option>
            <option value="Ukraine">Ukraine</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Czech Republic">Czech Republic</option>
          </select>
        </div>

        <div className="form-group">
          <h2 className="section-title">Shipment Type</h2>
          <div className="button-group">
            <button
              className={`button ${shipmentType === "parcel" ? "active" : ""}`}
              onClick={() => setShipmentType("parcel")}
            >
              Parcel
            </button>
            <button
              className={`button ${
                shipmentType === "documents" ? "active" : ""
              }`}
              onClick={() => setShipmentType("documents")}
            >
              Documents
            </button>
          </div>
        </div>

        {shipmentType === "parcel" ? (
          <div className="form-group">
            <h2 className="section-title">Parcel Size</h2>
            <div className="grid">
              <button
                className={`grid-item ${
                  parcelSize === "small" ? "active" : ""
                }`}
                onClick={() => setParcelSize("small")}
              >
                Small
                <br />
                <span className="description">Up to 2kg | 35×20×10cm</span>
              </button>
              <button
                className={`grid-item ${
                  parcelSize === "medium" ? "active" : ""
                }`}
                onClick={() => setParcelSize("medium")}
              >
                Medium
                <br />
                <span className="description">Up to 10kg | 40×30×30cm</span>
              </button>
              <button
                className={`grid-item ${
                  parcelSize === "large" ? "active" : ""
                }`}
                onClick={() => setParcelSize("large")}
              >
                Large
                <br />
                <span className="description">Up to 30kg | 60×50×40cm</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="form-group">
            <h2 className="section-title">Document Type</h2>
            <div className="grid">
              <button
                className={`grid-item ${documentType === "A4" ? "active" : ""}`}
                onClick={() => setDocumentType("A4")}
              >
                A4
                <br />
                <span className="description">Standard Document</span>
              </button>
              <button
                className={`grid-item ${documentType === "A3" ? "active" : ""}`}
                onClick={() => setDocumentType("A3")}
              >
                A3
                <br />
                <span className="description">Larger Document</span>
              </button>
              <button
                className={`grid-item ${documentType === "A2" ? "active" : ""}`}
                onClick={() => setDocumentType("A2")}
              >
                A2
                <br />
                <span className="description">Poster Size</span>
              </button>
            </div>
          </div>
        )}

        <div className="form-group">
          <h2 className="section-title">What Are You Sending?</h2>
          <textarea
            className="textarea"
            placeholder="Describe the contents of the parcel"
            rows="4"
            value={parcelDescription}
            onChange={(e) => setParcelDescription(e.target.value)}
          ></textarea>
          <p className="warning">
            Prohibited items are not allowed for shipment.
          </p>
        </div>

        <div className="form-group">
          <h2 className="section-title">Sender Information</h2>
          <input
            className="input"
            name="name"
            placeholder="Name"
            value={senderInfo.name}
            onChange={(e) => handleInputChange(e, setSenderInfo)}
          />
          <input
            className="input"
            name="phone"
            placeholder="Phone Number"
            value={senderInfo.phone}
            onChange={(e) => handleInputChange(e, setSenderInfo)}
          />
          <input
            className="input"
            name="email"
            placeholder="Email"
            value={senderInfo.email}
            onChange={(e) => handleInputChange(e, setSenderInfo)}
          />
        </div>

        <div className="form-group">
          <h2 className="section-title">Recipient Information</h2>
          <input
            className="input"
            name="name"
            placeholder="Name"
            value={recipientInfo.name}
            onChange={(e) => handleInputChange(e, setRecipientInfo)}
          />
          <input
            className="input"
            name="phone"
            placeholder="Phone Number"
            value={recipientInfo.phone}
            onChange={(e) => handleInputChange(e, setRecipientInfo)}
          />
          <input
            className="input"
            name="email"
            placeholder="Email"
            value={recipientInfo.email}
            onChange={(e) => handleInputChange(e, setRecipientInfo)}
          />
        </div>

        <div className="actions">
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateParcel;
