import React, { useState } from 'react';
import ''; // Import your CSS file
import baseurl from './config'

const InternshipForm = () => {
  const [submissionModalVisible, setSubmissionModalVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Your form data
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      collegeName: formData.get('collegename'),
      phone: formData.get('phone'),
      whatsappnumber: formData.get('whatsappnumber'),
      highestqualification: formData.get('highestqualification'),
      internshipDomain: formData.get('internshipDomain'),
      internshipDuration: formData.get('internshipDuration'),
    };

    try {
      const response = await fetch(`${baseurl}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmissionModalVisible(true);
      } else {
        console.error('Submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const closeModal = () => {
    setSubmissionModalVisible(false);
    window.location.reload(); // Reload the page
  };

  return (
    <>
      <div className="form-main">
        <div className="main-wrapper">
          <h2 className="form-head">Internship form</h2>
          <form id="myForm" onSubmit={handleSubmit}>
            <div className="form-wrapper">
              <div className="form-card">
                <input className="form-input" type="text" name="name" placeholder="Full Name" required />
              </div>
              {/* Add other form fields here */}
              <button className="btn-wrap" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {submissionModalVisible && (
        <div id="submissionModal" className="modal">
          <div className="modal-content">
            <span className="close" id="closeModal" onClick={closeModal}>
              &times;
            </span>
            <p>Your submission was successful!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default InternshipForm;
