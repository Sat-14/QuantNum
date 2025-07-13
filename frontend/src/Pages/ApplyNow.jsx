import './ApplyNow.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';


const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

const AnimatedSection = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 'duration-1000',
  className = '' 
}) => {
  const [ref, isVisible] = useIntersectionObserver(0.1);
  
  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translate-y-20';
      // other cases
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${duration} ease-out ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`transform transition-all ${duration} ease-out ${
          isVisible 
            ? 'translate-y-0 translate-x-0 scale-100 opacity-100' 
            : `${getInitialTransform()} opacity-0`
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
};


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
        <AnimatedSection direction="up" delay={100}>
            <div className="back-button-container">
                <button onClick={() => navigate('/')} className="back-button">
                ← Back to Home
                </button>
            </div>
        </AnimatedSection>
        <AnimatedSection direction="up" delay={200}>
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
        </AnimatedSection>
        
      <Footer />
    </div>
  );
}
