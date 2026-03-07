import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });
  const [submittedData, setSubmittedData] = useState(null);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating > 0) {
      setSubmittedData(formData);
      setIsSubmitted(true);
      setShowForm(false);
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="review-form-container">
      <h2>Give Your Feedback</h2>
      
      <table className="review-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Review</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {/* Row 1 */}
          <tr>
            <td>1</td>
            <td>Dr. Michael Doe</td>
            <td>Cardiology</td>
            <td>
              <button 
                className="btn-primary" 
                onClick={handleButtonClick} 
                disabled={isSubmitted}
                style={{ backgroundColor: isSubmitted ? 'grey' : '#007bff' }}
              >
                {isSubmitted ? 'Review Submitted' : 'Click Here'}
              </button>
            </td>
            <td>
              {submittedData && (
                <div className="submitted-review">
                  <p><strong>{submittedData.name}:</strong> {submittedData.review}</p>
                  <p>Rating: {"★".repeat(submittedData.rating)}</p>
                </div>
              )}
            </td>
          </tr>

          {/* Row 2 */}
          <tr>
            <td>2</td>
            <td>Dr. John Kadiri</td>
            <td>Urology</td>
            <td>
              <button className="btn-primary" onClick={handleButtonClick} disabled={isSubmitted}
                style={{ backgroundColor: isSubmitted ? 'grey' : '#007bff' }}>
                {isSubmitted ? 'Review Submitted' : 'Click Here'}
              </button>
            </td>
            <td></td>
          </tr>

          {/* Row 3 */}
          <tr>
            <td>3</td>
            <td>Dr. Sarah Jenkins</td>
            <td>Dermatology</td>
            <td>
              <button className="btn-primary" onClick={handleButtonClick} disabled={isSubmitted}
                style={{ backgroundColor: isSubmitted ? 'grey' : '#007bff' }}>
                {isSubmitted ? 'Review Submitted' : 'Click Here'}
              </button>
            </td>
            <td></td>
          </tr>

          {/* Row 4 */}
          <tr>
            <td>4</td>
            <td>Dr. Amit Puri</td>
            <td>Neurology</td>
            <td>
              <button className="btn-primary" onClick={handleButtonClick} disabled={isSubmitted}
                style={{ backgroundColor: isSubmitted ? 'grey' : '#007bff' }}>
                {isSubmitted ? 'Review Submitted' : 'Click Here'}
              </button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {showForm && (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <h3>Feedback Form</h3>
          {showWarning && <p className="warning" style={{color: 'red'}}>Please fill out all fields.</p>}
          
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div>
            <label>Review:</label>
            <textarea name="review" value={formData.review} onChange={handleChange} required />
          </div>

          <div className="star-rating">
            <label>Rating:</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  className={star <= formData.rating ? "star-active" : "star-inactive"}
                  onClick={() => handleRatingChange(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm; // THIS LINE IS ESSENTIAL!