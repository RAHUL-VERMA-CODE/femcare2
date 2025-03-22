
from fastapi import FastAPI, UploadFile
import os
from dotenv import load_dotenv
from google.cloud import vision
from prophet import Prophet
import pandas as pd
import io
app = FastAPI()


# Load environment variables
load_dotenv()
credentials_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credentials_path

@app.post("/detect-handwritten-text/")
async def detect_handwritten_text(file: UploadFile):
    try:
        # Initialize the client
        client = vision.ImageAnnotatorClient()

        # Read the uploaded file
        content = await file.read()

        # Create an image object
        image = vision.Image(content=content)

        # Perform handwritten text detection
        response = client.document_text_detection(image=image)
        text = response.full_text_annotation.text

        if response.error.message:
            return {"error": response.error.message}

        return {"detected_text": text}
    except Exception as e:
        return {"error": str(e)}


@app.post("/predict-next-period/")
async def predict_next_period(file: UploadFile):
    try:
        # Read the uploaded CSV file
        content = await file.read()
        data = pd.read_csv(io.StringIO(content.decode("utf-8")))
        data.rename(columns={"start_date": "ds", "cycle_length": "y"}, inplace=True)

        # Train Model
        model = Prophet()
        model.fit(data)

        # Predict next period
        future = model.make_future_dataframe(periods=30)
        forecast = model.predict(future)
        next_period_date = forecast.iloc[-1]['ds']

        return {"next_predicted_period_start_date": str(next_period_date)}
    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)



