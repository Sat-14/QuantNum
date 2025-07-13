import React, { useState , useEffect} from 'react';
import './ApplyNow.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';


export default function ApplyNow() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    year: '',
    branch: '',
    email: '',
    phone: '',
    whyJoin: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Application submitted successfully!');
    // TODO: integrate with backend or google forms
  };

  return (
    <div className="apply-container">
      <Navigation />
      <div className="back-button-container">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Home
        </button>
      </div>
      <div className="apply-form-container">
        <h2>Apply Now</h2>
        <form onSubmit={handleSubmit} className="apply-form">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Year:</label>
            <select name="year" value={formData.year} onChange={handleChange} required>
              <option value="">Select Year</option>
              <option value="First">First Year</option>
              <option value="Second">Second Year</option>
              <option value="Third">Third Year</option>
              <option value="Fourth">Fourth Year</option>
            </select>
          </div>

          <div className="form-group">
            <label>Branch:</label>
            <input type="text" name="branch" value={formData.branch} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Why do you want to join QuantNum?</label>
            <textarea name="whyJoin" value={formData.whyJoin} onChange={handleChange} rows="4" required />
          </div>

          <button type="submit" className="submit-button">Submit Application</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
