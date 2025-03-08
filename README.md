# AI Creative Generator

A **two-part** project (React frontend + Flask backend) that generates AI-driven ad creatives from Shopify product URLs using Replicate’s Stable Diffusion model.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Backend](#running-the-backend)
- [Running the Frontend](#running-the-frontend)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [License](#license)

---

## Project Overview

1. **Frontend** (React + Material UI):

   - Provides a UI where users can enter a Shopify product URL.
   - Submits the URL to the Flask backend.
   - Displays the generated AI ad creative.

2. **Backend** (Flask + Replicate):
   - Receives the Shopify product URL.
   - Fetches the product JSON, extracts image URLs, and picks the first one.
   - Calls a custom ML module (`ml_module.py`) to generate an AI creative via the Replicate API.
   - Returns the generated creative image URL to the frontend.

---

## Tech Stack

- **Frontend**:

  - [React](https://reactjs.org/)
  - [Material UI](https://mui.com/)

- **Backend**:
  - [Flask](https://flask.palletsprojects.com/)
  - [Flask-CORS](https://flask-cors.readthedocs.io/)
  - [Requests](https://docs.python-requests.org/)
  - [python-dotenv](https://pypi.org/project/python-dotenv/)
  - [Replicate](https://replicate.com/) for AI image generation

---

## Prerequisites

- **Node.js** (v14+) and **npm** (or **yarn**)
- **Python** (3.7+)
- A [Replicate](https://replicate.com/) account + API token

---

## Setup & Installation

1. **Clone the Repository**

   - git clone https://github.com/anmolvarshney1994/PortalTakeHome.git
   - cd PortalTakeHome

2. **Backend Setup**

   - cd backend
   - python -m venv venv
   - source venv/bin/activate # For Linux/macOS
   - or venv\Scripts\activate for Windows
   - pip install -r requirements.txt

3. **Frontend Setup**
   - cd ../frontend
   - npm install

## Environment Variables

You’ll need a .env file in the backend/ folder with the following (or set them in your environment):

- REPLICATE_API_TOKEN= api_token
- PORT=5000
- REPLICATE_API_TOKEN: Your secret token from Replicate.
- PORT: The port Flask will run on (defaults to 5000 if not specified).

For the frontend, create a .env in the frontend/ directory with:

- REACT_APP_BACKEND_URL=http://127.0.0.1:5000

## Running the Backend

1. **Activate your virtual environment:**

   - cd backend
   - source venv/bin/activate # or venv\Scripts\activate for Windows

2. **Run Flask:**
   - python app.py
     By default, it will start on http://127.0.0.1:5000 (or the port you set in .env).

## Running the Frontend

1. Open a new terminal (so your backend can keep running).
2. Navigate to the frontend/ folder:

   - cd frontend

3. Start the React Dev Server:

   - npm start

4. Open http://localhost:3000 in your browser. You should see the UI.

## Usage

1. Enter a Shopify Product URL (e.g., https://maguireshoes.com/collections/sunglasses/products/bai-denim-sunglasses).
2. Click “Generate Ad.”
   - The frontend sends the URL to the Flask backend.
   - Flask fetches the product JSON, extracts the first image, and calls ml_module.py to generate a creative using Replicate.
   - The resulting creative image URL is returned to the frontend and displayed in the “Generated Ad Preview” section.

## Project Structure

```bash
PortalTakeHome/
├─ backend/
│ ├─ app.py # Flask entry point
│ ├─ ml_module.py # ML logic with Replicate
│ ├─ prompts.json # Contains your prompt text
│ ├─ requirements.txt # Python dependencies
│ ├─ .env # Environment variables (excluded from Git)
│ └─ venv/ # (optional) Python virtual environment
├─ frontend/
│ ├─ src/
│ │ ├─ App.js # Main React component
│ │ ├─ index.js # React entry point
│ │ └─ ...
│ ├─ package.json
│ ├─ package-lock.json
│ └─ .env # Frontend environment variables (excluded from Git)
├─ .gitignore
└─ README.md # This file
```

- backend/app.py: Your main Flask application.
- backend/ml_module.py: Contains the generate_creative function that calls Replicate.
- frontend/src/App.js: The main React component with the form and image display.
