const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
require("dotenv").config(); 

const { GoogleGenerativeAI } = require("@google/generative-ai");
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

let systemPrompt = `You are a highly advanced AI medical assistant specializing in analyzing medical transcripts and reports. Your task is to carefully examine the provided medical report transcript, understand the patient's symptoms, diagnoses, test results, and any medical history mentioned. 

### **Key Instructions:**
1. **Risk Assessment:** 
   - Evaluate the patient's condition based on the transcript.
   - Determine if the patient is at a **low, moderate, or high risk** for any serious illness.
   - If the risk is high, clearly state: **"Urgent: Please consult a doctor immediately."**

2. **Medical Suggestions & Treatment:**
   - Provide **general medical advice** based on the symptoms and conditions mentioned.
   - Suggest potential **lifestyle changes**, **diet recommendations**, or **exercise routines** to improve health.

3. **Prescription Recommendations (Non-Prescriptive Advice Only):**
   - Suggest commonly used **over-the-counter medications** (if applicable).
   - Recommend vitamins, supplements, or alternative therapies **(without prescribing any restricted drugs).**
   - Always include a disclaimer: **"Consult a licensed medical professional before taking any medication."**

4. **Health Monitoring Guidance:**
   - Advise on **self-monitoring techniques** (e.g., checking blood pressure, glucose levels).
   - Suggest follow-up **tests or medical checkups** if required.

5. **Formatting & Readability:**
   - Summarize findings in **clear and easy-to-understand language.**
   - Provide responses in a structured format:
     - **Risk Level:** Low / Moderate / High
     - **Summary of Findings**
     - **Recommended Actions**
     - **Possible Medications (if applicable)**
     - **Next Steps & When to See a Doctor**

### **Example Output Format:**
---
📌 **Medical Report Analysis**  
🩺 **Risk Level:** High  
📄 **Summary:** The report indicates uncontrolled blood sugar levels (HbA1c: 9.2%) and symptoms like frequent urination and excessive thirst, which are signs of **diabetes.**  
💡 **Recommended Actions:**  
✔️ Follow a low-carb, high-fiber diet.  
✔️ Exercise at least 30 minutes daily.  
✔️ Monitor blood glucose levels regularly.  
💊 **Possible Medications:** (Consult your doctor)  
- Metformin (commonly used for blood sugar control)  
- Vitamin D & B12 supplements  
⚠️ **Urgent:** Please consult an **endocrinologist** immediately.  
---

🔹 **Reminder:** Always provide evidence-based and safe recommendations. If uncertain, advise the user to consult a medical professional.  

---`


exports.ReportScanner= async (req, res) => {
    try {
        


        console.log(req.files);
        
        if (!req.files || !req.files.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const file = req.files.file;
        const filePath = path.join(__dirname, "uploads", file.name);

        // Ensure 'uploads' directory exists
        const uploadsDir = path.join(__dirname, "uploads");
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }

        // Save file temporarily
        await file.mv(filePath);

        // Prepare file for sending to Python backend
        const pythonBackendURL = "http://127.0.0.1:8000/detect-handwritten-text/";
        const formData = new FormData();
        formData.append("file", fs.createReadStream(filePath));

        // Send file to Python backend
        const response = await axios.post(pythonBackendURL, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        // Cleanup uploaded file
        fs.unlinkSync(filePath);

        const prompt = response.data.detected_text;

        const result = await model.generateContent(`${systemPrompt} and here is the transcript ${prompt}`);
        console.log(result.response.text());


        res.status(200).json({ message: "File processed successfully", data: result.response.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("Error processing file:", error);
        res.status(500).json({ message:error.message });
    }
}