import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  const [showForm, setShowForm] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });
  const [submittedData, setSubmittedData] = useState(null);

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating > 0) {
      setSubmittedData(formData);
      setIsSubmitted(true); // Disables the button logic
      setShowForm(false);
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };


  const handleButtonClick = () => {
    console.log("Button clicked! Current state of showForm:", showForm);
    setShowForm(true);
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
          <tr>
            <td>1</td>
            <td>Dr. Michael Doe</td>
            <td>Cardiology</td>
            <td>
              {/* Disable the button if feedback is already submitted */}
              <button 
                className="btn-primary" 
                onClick={handleButtonClick} 
                disabled={isSubmitted}
                style={{ backgroundColor: isSubmitted ? 'grey' : '' }}
              >
                {isSubmitted ? 'Review Submitted' : 'Click Here'}
              </button>
            </td>
            <td>
              {/* Display the submitted review text here */}
              {submittedData && (
                <div className="submitted-review">
                  <p><strong>{submittedData.name}:</strong> {submittedData.review}</p>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {showForm && (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <h3>Feedback Form</h3>
          {showWarning && <p className="warning" style={{color: 'red'}}>Please fill out all fields.</p>}
          
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div>
            <label>Review:</label>
            <textarea name="review" value={formData.review} onChange={handleChange} />
          </div>

          <div>
            <label>Rating:</label>
            <select name="rating" value={formData.rating} onChange={handleChange}>
              <option value="0">Select Rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          <button type="submit" className="btn-submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;