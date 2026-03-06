import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  // State to manage whether the feedback form is visible
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <div className="review-form-container">
      <h2>Give Your Feedback</h2>
      
      {/* Table to display consultation info */}
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
              {/* Button to access the feedback form */}
              <button className="btn-primary" onClick={handleButtonClick}>
                Click Here
              </button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {/* Logic to display the feedback form when the button is clicked */}
      {showForm && (
        <div className="feedback-section">
          <h3>Feedback Form</h3>
          <p>This is where the feedback input fields will go.</p>
          {/* We will add actual form inputs in the next exercise */}
        </div>
      )}
    </div>
  );
};

export default ReviewForm;