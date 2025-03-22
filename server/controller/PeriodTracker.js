const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

exports.PeriodTracker= async (req, res) => {
    try {
        console.log(req?.files);
        
        if (!req?.files || !req?.files?.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const file = req?.files?.file;
        const filePath = path.join(__dirname, "uploads", file?.name);

        // Ensure 'uploads' directory exists
        const uploadsDir = path.join(__dirname, "uploads");
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }

        // Save file temporarily
        await file.mv(filePath);

        // Prepare file for sending to Python backend
        const pythonBackendURL = "http://127.0.0.1:8000/predict-next-period/";
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

        res.json({ message: "File processed successfully", data: response?.data });
    } catch (error) {
        console.error("Error processing file:", error);
        res.status(500).json({ message:error.message });
    }
}