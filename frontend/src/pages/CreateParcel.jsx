import React, { useState } from 'react';
import './style.css';

export const CreateParcel = () => {
  const [sendingCountry, setSendingCountry] = useState('Poland');
  const [deliveryCountry, setDeliveryCountry] = useState('Poland');
  const [shipmentType, setShipmentType] = useState('parcel');
  const [parcelSize, setParcelSize] = useState('small');
  const [documentType, setDocumentType] = useState('A4');
  const [parcelDescription, setParcelDescription] = useState('');
  const [senderInfo, setSenderInfo] = useState({ name: '', phone: '', email: '' });
  const [recipientInfo, setRecipientInfo] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event, setter) => {
    const { name, value } = event.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!senderInfo.name) newErrors.senderName = 'Sender name is required.';
    if (!senderInfo.phone) newErrors.senderPhone = 'Sender phone number is required.';
    if (!senderInfo.email) newErrors.senderEmail = 'Sender email is required.';
    if (!recipientInfo.name) newErrors.recipientName = 'Recipient name is required.';
    if (!recipientInfo.phone) newErrors.recipientPhone = 'Recipient phone number is required.';
    if (!recipientInfo.email) newErrors.recipientEmail = 'Recipient email is required.';
    if (!parcelDescription) newErrors.parcelDescription = 'Parcel description is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="title">Create a Parcel</h1>

        {/* Sending & Delivery Countries */}
        <div className="form-group">
          <label className="label">Sending Country</label>
          <select className="input" value={sendingCountry} onChange={(e) => setSendingCountry(e.target.value)}>
            {['Poland', 'Ukraine', 'Germany', 'France', 'Slovakia', 'Lithuania', 'Czech Republic'].map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="label">Delivery Country</label>
          <select className="input" value={deliveryCountry} onChange={(e) => setDeliveryCountry(e.target.value)}>
            {['Poland', 'Ukraine', 'Germany', 'France', 'Slovakia', 'Lithuania', 'Czech Republic'].map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Shipment Type Selection */}
        <div className="form-group">
          <h2 className="section-title">Shipment Type</h2>
          <div className="button-group">
            <button className={`button ${shipmentType === 'parcel' ? 'active' : ''}`} onClick={() => setShipmentType('parcel')}>
              Parcel
            </button>
            <button className={`button ${shipmentType === 'documents' ? 'active' : ''}`} onClick={() => setShipmentType('documents')}>
              Documents
            </button>
          </div>
        </div>

        {/* Parcel Size or Document Type Selection */}
        {shipmentType === 'parcel' ? (
          <div className="form-group">
            <h2 className="section-title">Parcel Size</h2>
            <div className="grid">
              {[
                { size: 'small', description: 'Up to 2kg | 35×20×10cm' },
                { size: 'medium', description: 'Up to 10kg | 40×30×30cm' },
                { size: 'large', description: 'Up to 30kg | 60×50×40cm' },
              ].map(({ size, description }) => (
                <button key={size} className={`grid-item ${parcelSize === size ? 'active' : ''}`} onClick={() => setParcelSize(size)}>
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                  <br /><span className="description">{description}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="form-group">
            <h2 className="section-title">Document Type</h2>
            <div className="grid">
              {[
                { type: 'A4', description: 'Standard Document' },
                { type: 'A3', description: 'Larger Document' },
                { type: 'A2', description: 'Poster Size' },
              ].map(({ type, description }) => (
                <button key={type} className={`grid-item ${documentType === type ? 'active' : ''}`} onClick={() => setDocumentType(type)}>
                  {type}<br /><span className="description">{description}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Parcel Description */}
        <div className="form-group">
          <h2 className="section-title">Parcel Description</h2>
          <textarea className={`textarea ${errors.parcelDescription ? 'error' : ''}`} placeholder="Describe your parcel" rows="4" value={parcelDescription} onChange={(e) => setParcelDescription(e.target.value)}></textarea>
          {errors.parcelDescription && <p className="error-message">{errors.parcelDescription}</p>}
        </div>

        {/* Sender & Recipient Information */}
        {[
          { title: 'Sender', state: senderInfo, setState: setSenderInfo, errorKeys: ['senderName', 'senderPhone', 'senderEmail'] },
          { title: 'Recipient', state: recipientInfo, setState: setRecipientInfo, errorKeys: ['recipientName', 'recipientPhone', 'recipientEmail'] },
        ].map(({ title, state, setState, errorKeys }) => (
          <div key={title} className="form-group">
            <h2 className="section-title">{title} Information</h2>
            {['name', 'phone', 'email'].map((field, index) => (
              <div key={field}>
                <input
                  className={`input ${errors[errorKeys[index]] ? 'error' : ''}`}
                  name={field}
                  placeholder={`${title} ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  value={state[field]}
                  onChange={(e) => handleInputChange(e, setState)}
                />
                {errors[errorKeys[index]] && <p className="error-message">{errors[errorKeys[index]]}</p>}
              </div>
            ))}
          </div>
        ))}

        {/* Submit Button */}
        <div className="actions">
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CreateParcel;
