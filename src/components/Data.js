import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseurl from './config'
import employee from '../images/employee.png';
import profile from '../images/profile.png';
import add from '../images/add.png';
import verified from '../images/verified.png';
import viewpdf from '../images/viewpdf.png';
import deleteuser from '../images/delete.png';
import downloadpdf from '../images/download.png'
import reject from '../images/reject.png'
import approve from '../images/approve.png'
import loading from '../images/loading.gif'
export default function Data() {
    const [sendingRows, setSendingRows] = useState([]); // Track sending state for each row 
    const [successRows, setSuccessRows] = useState([]); // Track success state for each row
    const navigate =useNavigate();
    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
    
        // Navigate to the login page
        navigate('/');
      };
      const handleViewPdf = async (employee) => {
        try {
          const response = await fetch(`${baseurl}/certificateData/${employee.id}`);
          const result = await response.json();
      
          // Now you can navigate to the Certificate component with the data and intern ID
          navigate(`/Certificate/${employee.id}`, { state: { internDetails: result.intern, internId: employee.id } });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
    const [internData, setInternData] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        // Fetch data from your API endpoint
        axios.get(`${baseurl}/all-users`, {
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json',
            },
          })
            .then(response => {
                setInternData(response.data.users); // Use response.data.users
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSendEmail = async (employee) => {
        try {
            setSendingRows((prevSendingRows) => [...prevSendingRows, employee.id]); // Set sending state for the current row
          const response = await axios.post(`${baseurl}/generate-pdf-and-send-email`, {
            to: employee.email, //  sending the email to the employee's email
            subject: 'Congratulations on Your Offer from Suvidha Foundation!', // Replace with your subject
            text:  `Dear intern,

            Greetings of the day.
            
            Congratulations on your offer from Suvidha Foundation!
            Please find the attached - detailed offer letter.
            
            For the process of acceptance, Please revert back the physically signed copy of the Offer Letter within 48 hours.
            Email us here back:-
            hr@suvidhafoundationedutech.org
            
            After Successful Completion of your internship, You will be Awarded with "Certificate of Completion" And on the basis of your Performance "Letter of Recommendation".
            
            We are looking forward to hearing from you and hope you’ll join our team!
            
            Best regards,
            Sonal Godshelwar
            Human Resource Team
            Mail: suvidhafoundation00@gmail.com
            Suvidha Foundation
            R. No: MH/568/95/Nagpur
            H.No. 1951, W.N.4, Khaperkheda, Saoner, Nagpur
            Email: info@suvidhafoundationedutech.org
            Phone No: +918378042291`, // Replace with your text
            internId: employee.id,
          });
    
          console.log(response.data.message);
          
          setSuccessRows((prevSuccessRows) => [...prevSuccessRows, employee.id]); // Set success state for the current row
          // Handle success, show a success message, or perform any other actions
    
        } catch (error) {
          console.error('Error sending email:', error);
          // Handle error, show an error message, or perform any other error handling
        }
        finally {
            setSendingRows((prevSendingRows) => prevSendingRows.filter((id) => id !== employee.id)); // Reset sending state for the current row
          }
      };
    
    const handleDelete = async (employee) => {
        try {
          if (!employee || !employee.id) {
            console.error('Invalid employee object:', employee);
            return;
          }
      
          console.log(`Deleting intern with ID: ${employee.id}`);
      
          // Make a DELETE request to your delete endpoint with the internId
          await axios.delete(`${baseurl}/deleteintern/${employee.id}`);
          console.log('Intern deleted successfully');
          window.location.reload();
          // You can handle any further actions after deletion if needed
      
        } catch (error) {
          console.error('Error deleting intern:', error);
        }
      };
      const handleApprove = async (employee) => {
        try {
          console.log(`Approving intern with ID: ${employee.id}`);
      
          // Make a POST request to your approveintern endpoint with the internId
          await axios.post(`${baseurl}/approveintern/${employee.id}`);
          console.log('Intern approved successfully');
      window.location.reload();
          // You can handle any further actions after approval if needed
        } catch (error) {
          console.error('Error approving intern:', error);
        }
      };
    
    return (
        <>
            <div>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid ">
                        <a class="navbar-brand" href="#">
                            <img id='brandlogo' src={employee} alt="Bootstrap" width="30" height="24" /> <h4 style={{ display: "inline-block" }}> Employees</h4>
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">

                            {/* <form class="d-flex" role="search">
                                <input class="form-control me-2" type="search" placeholder="Search employee" aria-label="Search" />
                                <button className="btn btn-outline-success " type="submit">Search</button>
                            </form> */}
                            <button className="btn mx-2 btn-outline-danger " type="submit" onClick={handleLogout}>Logout</button>
                            <div style={{cursor:"pointer"}}>
                                <img id='profileimg' src={profile} alt="" />
                            </div>

                        </div>



                    </div>
                </nav>
            </div>
            <hr />

            <div className='justify-content-between beforetable' >
                <div style={{ display: "grid" }}>
                    <p>
                        <h4 style={{ marginBottom: "0" }}>Employees</h4>{" "}
                        <small style={{ display: "block", color: "#7f8a8a", marginTop: "0" }}>
                            Showing data of employee
                        </small>
                        <small style={{ color: "#7f8a8a", marginTop: "0" }}>
                            Total number of employee:{internData.length}
                        </small>
                    </p>
                </div>
                <button
                    id='addemployee' onClick={()=>{
                        navigate('/Form')
                    }}
                >
                    <img style={{ width: "35px" }} src={add} alt="" /> <strong style={{ color: "#FFFFFF" }}>Add Employee</strong>
                </button>
            </div>

            <div style={{ margin: "20px" }}>
                <table id='tableempl' class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email id</th>
                            <th scope="col">College </th>
                            <th scope="col">Phone</th>
                            <th scope="col">Qualification</th>
                            <th scope="col"> Domain</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Approval</th>
                            <th scope="col">Send Gmail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(internData) && internData.length > 0 ? (
                            internData.map((employee, index) => (
                                <tr key={index}>
                                    <td><strong>{index + 1}</strong></td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.collegeName}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.highestqualification}</td>
                                    <td>{employee.internshipDomain}</td>
                                    <td>{employee.internshipDuration}</td>
                                    <td>
                                        
                                        {employee.approved ? (
                                            <>
                                                <img id='verifedimg' src={verified} alt="" />
                                                <img onClick={() => handleViewPdf(employee)} id='verifedimg' src={viewpdf} alt="" />
                                
                                                <img
                                                    onClick={() => handleDelete(employee)}
                                                    id='verifedimg'
                                                    src={deleteuser}
                                                    alt=""
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <img
                                                    onClick={() => handleDelete(employee)}
                                                    id='verifedimg'
                                                    src={reject}
                                                    alt=""
                                                />
                                                <img
                                                    onClick={() => handleApprove(employee)}
                                                    id='verifedimg'
                                                    src={approve}
                                                    alt=""
                                                />




                                            </>
                                        )}
                                        
                                      
                                    </td>

                                    <td><button onClick={() => handleSendEmail(employee)} id='send' style={{ backgroundColor: successRows.includes(employee.id) ? 'yellow' : '#4cef10' }}> {sendingRows.includes(employee.id) ? 'Sending...' : successRows.includes(employee.id) ? 'Successful' : 'Send'}</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="20"><img src={loading} alt="" /></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </>
    )
}
