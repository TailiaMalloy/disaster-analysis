import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConsentPage: React.FC = () => {
  const [consentGiven, setConsentGiven] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = async () => {
    if(consentGiven){
      navigate('/Task')
    }
  };

  return (
    <body className="bg-gray-100">
        <div id="root"></div>
        <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-60/100 w-full bg-white p-2 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Carnegie Mellon University</h1>
        <h2 className="text-2xl font-bold text-center mb-4">Online Consent Form</h2>
        <p className="text-gray-700 text-left mb-6">
        This interview is part of the research study STUDY2025_00000028 (Understanding and  Modeling Decision-making Practices of Emergency Managers) conducted by Hoda  Heidari and Aarti Singh at Carnegie Mellon University, funded by the National Science  Foundation. 

        <h3 className="text-center">Summary:</h3> We would like to interview you as a part of a research project aiming to understand real world decision-making scenarios in disaster response and Emergency  Management. Your contributions will help us to further our knowledge of the decision making challenges faced by Emergency Managers in their work and potential  opportunities to improve those challenges. 

        <h3 className="text-center">Purpose:</h3>The purpose of the research is to identify common decision-making scenarios in Emergency Management, particularly in settings where decisions are constrained  somehow. Ultimately, this research seeks to identify opportunities where Artificial  Intelligence (AI) could help facilitate real-world Emergency Management decisions. 
        
        <h3 className="text-center">Procedures:</h3>
        If you would like to participate, we will ask you to complete a short (8- minute) onboarding survey and schedule a virtual interview with you. The virtual  interview will last up to one hour and thirty minutes, but you can stop anytime you want. 

        <h3 className="text-center">Participant Requirements:</h3>
        Participation in this study is limited to individuals aged 18  and older and individuals with at least 2 years of work experience in the field of  Emergency Management in the United States of America. 
        
        <h3 className="text-center">Risks:</h3>
        The risks and discomfort associated with participation in this study are no greater than  those ordinarily encountered in daily life or during other online activities. There is a  potential risk of a breach of information, however, all data will be stored in a de identified manner and kept in a secure, online location, and all researchers’ accounts  are validated by two-factor authentication. 
            
        <h3 className="text-center">Benefits:</h3>
        There may be no personal benefit from your participation in the study. However,  possible benefits include informing research that could lead to the creation of resources  that facilitate more effective decision-making during emergency management and  disaster response efforts.

        <h3 className="text-center">Compensation & Costs:</h3> 
        We will provide a $100 Amazon gift card by email at the end of your interview if you  agree to receive compensation. 
        There will be no cost to you if you participate in this study.

        <h3 className="text-center">Future Use of Information :</h3>
        Data Collected in Onboarding and Interest Forms 
        With your permission, we plan to use the information we collect in the interest & onboarding forms in the following ways:  
        • Your contact information will only be used to contact you about this study. 
        • Your availability to meet for an interview will only be used to schedule the virtual interview for this study. After we successfully complete the interview, we will  delete all records of your availability. 
        • We plan to use the occupational, demographic, and opinion data collected to  contextualize your interview responses. 
        
        <h3 className="text-center">Data Collected During the Interview:</h3>
        With your permission, we would like to make an audio recording to transcribe and  supplement our notes, using the annotation service Otter AI. We will never release or  distribute the audio recording files. After we complete the transcription of the recorded audio, we will permanently delete the audio recordings and remove all identifiable  information from the transcripts. We will not release any transcript created from the  audio recording without deidentification. 

        <h3 className="text-center">All Collected Data:</h3>
        This research is being done in collaboration with other researchers from the National  Science Foundation’s AI Institute for Societal Decision-Making (AI-SDM). Your research  data may be shared with them. If data is shared with these collaborators, it will not contain any identifying information about you. 

        In the future, once we have removed all identifiable information from the interview transcript and your form responses, we may use the de-identified data for our future  research studies, or we may distribute it to other researchers (potentially outside AI SDM) for their research studies. We would do this without getting additional informed  consent from you. Sharing of the data with other researchers will only be done in such a  manner that you will not be identified. 

        <h3 className="text-center">Confidentiality:</h3>
        By participating in this research, you understand and agree that Carnegie Mellon may be required to disclose your consent form, data, and other personally identifiable  information as required by law, regulation, subpoena or court order. Otherwise, your  confidentiality will be maintained in the following manner: 
        Each participant will be assigned a study ID number. Data and participant responses  will be coded using their study ID number to de-identify data. A separate, secure linking  file will be maintained that links the identifiers to the study IDs for the purposes of  contacting participants and linking together data from multiple sources. At the  conclusion of the study, the linking file will be destroyed and only de-identified data will  be analyzed.
        
        Your data and consent form will be kept separate. Your research data will be stored in a  secure location on CMU property or via secure electronic means and in the control of  CMU and will not be disclosed to third parties.  
        By participating, you understand and agree that the data and information gathered  during this study may be used by Carnegie Mellon and published and/or disclosed by  Carnegie Mellon to others outside of Carnegie Mellon. However, your name, address,  contact information and other direct personal identifiers will not be mentioned in any  such publication or dissemination of the research data and/or results by Carnegie  Mellon. Note that per regulation all research data must be kept for a minimum of 3  years. 
        The sponsor may have access to research records. 

        <h3 className="text-center">Right to Ask Questions & Contact Information:</h3>
        If you have any questions about this study, you should feel free to ask them by  contacting the research team at hheidari@andrew.cmu.edu. If you have questions later,  desire additional information, or wish to withdraw your participation please contact the  research team email in accordance with the contact information listed above. 
        If you have questions pertaining to your rights as a research participant; or to report  concerns to this study, you should contact the Office of Research integrity and  Compliance at Carnegie Mellon University. Email: irb-review@andrew.cmu.edu . Phone:  412-268-4721. 

        <h3 className="text-center"> Voluntary Participation :</h3>
        Your participation in this research is voluntary. You may discontinue participation at any  time during the research activity. You may print a copy of this consent form for your records. 
        </p>
        <div className="flex items-center">
            I am 18 
            <input checked id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
        </div>

        <div className="flex justify-center">
            <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow transition duration-150"
            >
            Confirm Consent
            </button>
        </div>
      </div>
    </div>
    </body>
  );
};

export default ConsentPage;
