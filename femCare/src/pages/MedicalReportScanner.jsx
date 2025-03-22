import axios from "axios";
import { useState } from "react";
import Navbar from "../components/navbar";
import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { useNavigate } from "react-router-dom";


const MedicalReportScanner = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { setPrescriptionData } = useContext(GlobalContext);
  const navigate = useNavigate()
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setIsUploading(true);
      setUploadProgress(0);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
        }
      }, 500); 
      
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/reportScanner`,
          formData
        );

        if (response.status === 200) {
          const data = response.data.data;
          setPrescriptionData(data); // Set the response data to global context
          // console.log(data);
          navigate('/chatbot')

        } else {
          console.error("Upload failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center flex-grow bg-gradient-to-r from-teal-50 to-blue-50 p-4">
        <div className="border-2 border-dashed border-teal-300 rounded-2xl p-8 text-center bg-white hover:bg-teal-50 transition-all duration-300 w-full max-w-3xl min-h-[500px] flex flex-col justify-center items-center shadow-2xl">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-teal-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>

          <h3 className="mt-8 text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Medical Report Scanner
          </h3>

          <p className="mt-4 text-lg text-gray-600">
            Upload your medical reports (PDF, JPEG, or PNG) for quick analysis and insights.
          </p>

          <div className="mt-8">
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center px-10 py-5 border border-transparent text-xl font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              Upload Medical Report
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {isUploading && (
            <div className="mt-8 w-full max-w-md">
              <p className="text-lg text-teal-600 mb-4">Scanning your report...</p>
              <div className="w-full bg-teal-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-teal-600 to-blue-600 h-3 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalReportScanner;
