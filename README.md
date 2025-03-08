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
   git clone https://github.com/anmolvarshney1994/PortalTakeHome.git
   cd PortalTakeHome
