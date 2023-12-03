import React, { useState } from 'react';
import baseurl from './config'

const initialFormData = {
  fullName: '',
  email: '',
  phoneNumber: '', // Changed from 'phone' to 'phoneNumber'
  collegeName: '',
  whatsappNumber: '',
  highestqualification: '',
  internshipDomain: '',
  internshipDuration: '',
};

function Form() {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(''); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const isFormValid = () => {
    // Check if all required fields are filled
    if (
      formData.name &&
      formData.collegeName &&
      formData.email &&
      formData.phone &&
      formData.whatsappnumber &&
      formData.highestqualification &&
      formData.internshipDomain &&
      formData.internshipDuration
    ) {
      // Custom email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setFormError('Please enter a valid email address.');
        return false;
      }
  
      // Custom phone number length validation
      if (formData.phone.length !== 10) {
        setFormError('Please enter a 10-digit phone number.');
        return false;
      }
  
      // Clear previous error message if validation passes
      setFormError('');
  
      // If all validations pass
      return true;
    } else {
      setFormError('Please fill in all the required fields.');
      return false;
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isFormValid()) {
        console.error('Please fill in all the required fields.');
        
        return;
      }
      setFormError('');
      // Make an HTTP POST request to your backend API to save the form data
      const response = await fetch(`${baseurl}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Form data saved successfully
        const data = await response.json();
        console.log(data.message);
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
      }
    } catch (error) {
      console.error('Form submission failed', error);
    }
  };

  return (
    <>
      <div style={{ margin: "7%", borderRadius: "10px", border: "2px solid" }} className='container justify-content-center'>
        <form style={{ margin: "7%" }} className="needs-validation" noValidate onSubmit={handleSubmit}>
          <h2 style={{ textDecoration: "underline" }} className="text-center"><strong>Apply for Internship</strong></h2>
          <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom01">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="validationCustom01"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom02">College Name</label>
            <input
              type="text"
              className="form-control"
              id="validationCustom02"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              placeholder="Enter your college name"
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Email</label>
            <input
              type="email"
              className="form-control"
              id="validationCustom03"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom04">Phone Number</label>
            <input
              type="number"
              className="form-control"
              id="validationCustom04"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number , dont add 0 as prefix"
              required
            />
            <div className="invalid-feedback">Please provide a valid phone number.</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom05">WhatsApp Number</label>
            <input
              type="number"
              className="form-control"
              id="validationCustom05"
              name="whatsappnumber"
              value={formData.whatsappnumber}
              onChange={handleChange}
              placeholder="Enter your phone number , dont add 0 as prefix"
              required
            />
            <div className="invalid-feedback">Please provide a valid WhatsApp number.</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom06">Highest Qualification</label>
            <input
              type="text"
              className="form-control"
              id="validationCustom06"
              name="highestqualification"
              value={formData.highestqualification}
              onChange={handleChange}
              placeholder="Enter your highest qualification"
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom07">Choose Internship Domain</label>
            <select
              className="form-select"
              id="validationCustom07"
              name="internshipDomain"
              value={formData.internshipDomain}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select an option...</option>
              <option value="Human Resource Management">Human Resource Management</option>
              <option value="Fundraising Coordinator">Fundraising Coordinator</option>
              <option value="Social Media Marketing">Social Media Marketing</option>
              <option value="Business Development">Business Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Coding Tutor">Coding Tutor</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="Web Development">Web Development</option>
              <option value="Social Campaigner">Social Campaigner</option>
              <option value="Public Relations">Public Relations</option>
              <option value="Development">Development</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="Content Writer">Content Writer</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Capital Campaign">Capital Campaign</option>
              <option value="Community Outreach">Community Outreach</option>
              <option value="Philanthropy">Philanthropy</option>
              <option value="Data Entry">Data Entry</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Summer Internship">Summer Internship</option>
              <option value="Human Resource Recruiter">Human Resource Recruiter</option>
              <option value="Campus Ambassador">Campus Ambassador</option>
              <option value="Social Worker">Social Worker</option>
              <option value="English Tutor">English Tutor</option>
              <option value="Web Development Tutor">Web Development Tutor</option>
              <option value="Trainee Business Analyst">Trainee Business Analyst</option>
              <option value="Facebook Marketing">Facebook Marketing</option>
              <option value="Instagram Marketing">Instagram Marketing</option>
              <option value="LinkedIn Marketing">LinkedIn Marketing</option>
              <option value="YouTube Marketing">YouTube Marketing</option>
              <option value="Event Management">Event Management</option>
              <option value="Mentor">Mentor</option>
            </select>

            <div className="invalid-feedback">Please select an internship domain.</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom08">Duration Of Internship</label>
            <select
              className="form-select"
              id="validationCustom08"
              name="internshipDuration"
              value={formData.internshipDuration}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select an option...</option>
              <option value="1 week">1 week</option>
              <option value="1 month">1 month</option>
              <option value="2 months">2 months</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
            </select>
            <div className="invalid-feedback">Please select the duration of the internship.</div>
          </div>
          <div className="mb-3 form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="invalidCheck"
              required
            />
            <label className="form-check-label" htmlFor="invalidCheck">Agree to terms and conditions</label>
            <div className="invalid-feedback">You must agree before submitting.</div>
          </div>
          {formError && <div className="alert alert-danger">{formError}</div>}
          <div className="mb-3">
            <button className="btn btn-primary" type="submit">Submit Form</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
