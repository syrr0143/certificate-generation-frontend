import React, { useState, useEffect } from 'react';
import { useLocation ,useParams,useNavigate} from 'react-router-dom';
import logo from '../images/logo.gif'
import baseurl from './config'

import sign from '../images/sign.jpg'
import address from '../images/address.jpg'
function Certificate() {
  const navigate= useNavigate();
    const [data, setData] = useState(null);
    const { internId } = useParams();
    const location = useLocation();
    // const internId = location.state.internId;
// Replace this with the actual intern ID
  
    const fetchData = async () => {
      try {
        console.log(internId)
        const response = await fetch(`${baseurl}/certificateData/${internId}`);
        const result = await response.json();
        setData(result);
        navigate(`/Certificate/${internId}`, { state: { internDetails: result.intern } });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const calculateEndDate = (startDate, duration) => {
        const [months, unit] = duration.split(' ');
        const endDate = new Date(startDate);
        
        if (unit === 'months') {
          endDate.setMonth(endDate.getMonth() + parseInt(months, 10));
        }
    
        return endDate;
      };
    useEffect(() => {
      fetchData();
    }, [internId]);
  
    if (!data) {
      return <div>Loading...</div>;
    }
    const { name, internshipDomain, internshipDuration } = data.intern;

      // Calculate end date based on the provided duration
  const startDate = new Date();
  const endDate = calculateEndDate(startDate, internshipDuration);
   // Format the dates
   const formattedStartDate = startDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedEndDate = endDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <div>
       <div id="internship-duration" data-duration="<%= data.internshipDuration %>"></div>

<div class="main-container">
    <div class="header">
        <div style={{height:"100px"}}>
            
            <img src={logo} alt=""/>
            <img src={address}/>
        </div>
        <div 
        style={{fontWeight:"600",fontStyle: "normal",lineHeight: "0.3",fontFamily:  "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}} class="address">
            <p>H.No.1951,W.N.4,Khaperkheda, Saoner,</p>
            <p>Nagpur, Maharashtra, India</p>
            <p>Contact:(+91)08010996763</p>
            <p><a href="mailto:info@suvidhafoundationedutech.Org">info@suvidhafoundationedutech.Org</a></p>
            <a href="https://www.suvidhafoundationedutech.org">www.suvidhafoundationedutech.org</a>
        </div>
    </div>
    <hr/>
    <div class="content">
        <div  class="date-ref ">
        <div style={{justifyContent: "space-between",display: "flex"}} class="date-ref ">
            <div id="datePlaceholder" style={{fontWeight:"700",fontStyle: "normal",fontFamily:  "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}} >Date: {formattedStartDate}</div>
            <div class="ref-no" style={{fontWeight:"700",fontStyle: "normal",fontFamily:  "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}><strong>Ref.No.-to be passed</strong></div>
        </div>
        </div>
        <div style={{margin:"1vh auto"}} class="text-center">
        <strong style={{fontWeight:"700",borderBottom:" 2px solid",fontFamily:"  Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>INTERNSHIP: OFFER LETTER</strong>
        </div>
        <div>
            <p ></p>
            <p> 
  <strong>
    To,<br />
    {data.intern.name},
  </strong>
</p>

          
            <ul style={{fontWeight:"400",fontStyle:"normal",lineHeight:"20px",fontFamily:"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}} >
                With reference to your interview,we are pleased to inform you that you have been selected as <strong>“{data.intern.internshipDomain}”</strong> in our NGO - “Suvidha Mahila Mandal”, with the 
                following
                terms and conditions.
            </ul>
               
            
            <ul
                >
                <li>You will provide the <strong>Web Development services and apart from Web development you have to
                        participate in the
                        fundraising task also at Suvidha Foundation</strong> and deliver the effect of the work.
                </li>
                <li>The internship period will be from <strong id="startperiod">{formattedStartDate}</strong> to <strong
                        id="endperiod">{formattedEndDate}</strong></li> for a duration of
                    <li>Your work base station is work from Home and six days a week.</li>
                    <li> It is an <strong>unpaid internship.</strong> The certificate of completion will be given
                        only
                        if you invest 4 hours daily on all working
                        days. You must participate in the daily team meetings through Google Meet. Also, the letter
                        holds no value without a
                        completion certificate from us with a unique identification number, which can be verified
                        online.</li>
                    <li>During the internship period and thereafter, you will not give out to anyone in writing or
                        by
                        word of mouth or
                        otherwise particulars or details of work process, technical know-how, research carried out,
                        security arrangements
                        and/or matters of confidential or secret nature which you may come across during your
                        service in
                        this organization.</li>
                    <li> In case of any misconduct which causes financial loss to the NGO or hurts its reputation
                        and
                        goodwill of the
                        organization, the management has the right to terminate any intern. In case of termination,
                        the
                        management will not
                        be issuing certificates to the intern.</li>
                    <li>It is necessary for an intern to return all the organization belongings (login credentials,
                        media created, and system) at
                        the time of leaving the organization. A clearance and experience certificate will be given
                        after
                        completing the
                        formalities. If any employee leaves the job/Internship without completing the formality, the
                        organization will take
                        necessary action. All the software/courses/data developed by the interns or any employee for
                        the
                        Suvidha Mahila
                        Mandal are intellectual property of the organization & are protected by Indian Copyright
                        Act.
                        All the data generated
                        during the internship period, is the property right of organization and can be used for any
                        purpose. In case of any
                        piracy, strict legal action will be taken by the organization against erring persons. No
                        information or source codes or
                        course curriculum or business secrets or financial position or other details of organization
                        shall be discussed among
                        friends or relatives or our competitors. Such leakage of information is likely to cause
                        financial loss to the organization.
                        Hence, in such a case, the organization will be terminating the employee immediately and if
                        required, further legal
                        action will be taken against that intern.</li>
            </ul>
        </div>
    </div>
    <div class="footer">
        <strong style={{fontWeight:"700",fontStyle:" normal",fontFamily:"  Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}} >{data.intern.name}
            
                (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
        </strong>
    </div>
    <div style={{margin:" 3% 4%", lineHeight: "0.5"}}>
        <img src={sign} alt=""/>
        <p><strong style={{fontWeight:"700",fontStyle:" normal",fontFamily:  "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif" }}>Mrs. Shobha Motghare</strong></p>
        <p class="position" ><strong style={{fontWeight:"700",fontStyle:" normal",fontFamily:  "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif" }}>Secretary, Suvidha Mahila Mandal</strong></p>
    </div>
</div>
    </div>
  )
}

export default Certificate
