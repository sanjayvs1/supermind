# Soulbuddy - Astrological Prediction & Chat Service

## Overview

Soulbuddy is a full-stack astrological service that provides detailed horoscope readings and chat-based astrology assistance. The backend is built using **Node.js**, **Express**, and **MongoDB**. It integrates **Google Generative AI** for generating horoscope readings based on user inputs such as date of birth, gender, and city.

The frontend (separate repository) allows users to enter personal details (name, gender, date of birth, and city) to receive accurate astrological predictions and interact with an AI-powered chat feature for further insights.

---

## Features

1. **Horoscope Prediction**: 
   - Generate detailed Vedic astrology readings based on user birth details (date, time, city, state).
   - Predictions include career, relationships, personal growth, daily and monthly horoscopes, and personalized recommendations (gemstones, poojas, dos and don’ts).
   
2. **AI-Powered Chat**: 
   - A conversational interface where users can ask questions related to their horoscope, and the AI responds based on their birth details.
   
3. **Generative AI Integration**: 
   - Uses **Google's Generative AI model** (`gemini-1.5-flash`) for generating horoscope content based on user data.

4. **Backend Integration**:
   - Connects to **MongoDB** for storing and managing user information (expandable for future use cases).

5. **Google Geocoding API** (optional):
   - Integration for converting city and state into geographical coordinates for further personalization (commented out for now).

---

## Technologies Used

- **Backend**:
  - **Node.js**: JavaScript runtime for building the server.
  - **Express**: Web framework for routing and API handling.
  - **MongoDB**: Database for storing user data (in future, for storing chat logs, predictions, etc.).
  - **Google Generative AI**: For generating horoscope readings and conversational AI.
  - **Axios**: HTTP client for external API calls.
  - **Cors**: Middleware to allow cross-origin requests.
  - **Datastax DB and Langflow**

- **Frontend**:
  - Built separately (not provided in this repository). Communicates with this backend to send user data (name, gender, date of birth, city) and display the generated horoscope predictions or AI chat responses.

- **Environment Variables**:
  - **GOOGLE_KEY**: API key for Google services such as Geocoding and Generative AI.

---

## Installation

### Backend

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/soulbuddy-backend.git
   cd soulbuddy-backend
   ```

2. **Install dependencies**:
   Ensure you have **Node.js** and **npm** installed.

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root of the project.
   - Add your **Google API Key** in the `.env` file:
     ```
     GOOGLE_KEY=your-google-api-key-here
     ```

4. **Start the server**:
   ```bash
   npm start
   ```

   The server will start running on port **5000** by default.

---

## API Endpoints

### 1. **POST /horoscope**
   Generates a detailed Vedic horoscope reading based on the provided birth details.

   **Request Body**:
   ```json
   {
     "birthDate": "YYYY-MM-DD",
     "city": "City Name",
     "state": "State Name"
   }
   ```

   **Response**:
   ```json
   {
     "career": "Career prediction...",
     "relationships": "Relationship advice...",
     "personal_growth": "Personal growth advice...",
     "family": "Family advice...",
     "social_connections": "Social life prediction...",
     "daily_horoscope": "Today's horoscope...",
     "monthly_horoscope": "This month's horoscope...",
     "recommendations": {
       "gemstones": [
         {
           "name": "Ruby",
           "reason": "Enhances courage..."
         },
         ...
       ],
       "pooja_recommendations": [
         {
           "ritual": "Hanuman Pooja",
           "importance": "Strengthens courage...",
           "benefits": "Enhances willpower..."
         },
         ...
       ],
       "dos_and_donts": {
         "dos": ["Practice mindfulness", "Exercise regularly"],
         "donts": ["Avoid excessive indulgence", "Manage anger effectively"]
       }
     },
     "spiritual_content_delivery": {
       "meditation_and_workout": {
         "meditation": "Guided meditation...",
         "workout": "Yoga and pranayama..."
       },
       "sleep_content": {
         "type": "Guided sleep meditation",
         "recommendation": "Relaxing sounds..."
       }
     }
   }
   ```

### 2. **POST /chat**
   Provides AI-generated responses to user queries based on their astrological data.

   **Request Body**:
   ```json
   {
     "birthDate": "YYYY-MM-DD",
     "city": "City Name",
     "state": "State Name",
     "prompt": "User's question or query"
   }
   ```

   **Response**:
   ```json
   {
     "response": "AI-generated answer to the question..."
   }
   ```

---

## Database (MongoDB)

- **MongoDB Connection**: The backend connects to MongoDB via the `mongoose` package.
- Currently, the database connection is made but not actively used for storing any data.
- Future enhancements can include storing user profiles, past horoscopes, or chat histories.

---

## Frontend

The frontend (separate repository) allows users to input their details (name, gender, date of birth, and city) through a form and displays their generated horoscope prediction. The user can also ask questions in a chat interface and receive astrological advice.

### Setup for Frontend 

1. **Clone the frontend repository**:
   ```bash
   git clone https://github.com/sanjayvs1/supermind
   cd public
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the frontend**:
   ```bash
   npm start
   ```

4. The frontend should now be running on **http://localhost:3000**.

---

## Future Enhancements

- Implement user authentication to track horoscope predictions and chat history.
- Integrate with external APIs for additional astrology-related features (e.g., compatibility analysis, more detailed forecasts).
- Expand the database usage to store and manage users' astrology data and chat logs.
- Improve the AI chat interface with advanced features like image generation or voice support.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

--- 

If you have any questions or need help setting up or extending this service, feel free to open an issue in the repository.
