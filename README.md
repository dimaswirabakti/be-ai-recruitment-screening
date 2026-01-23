# AI Recruitment Screening API

![Node.js](https://img.shields.io/badge/Node.js-v.20%2B-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Admin-FFCA28?logo=firebase&logoColor=black)
![Google Cloud Run](https://img.shields.io/badge/Google_Cloud-Run-4285F4?logo=google-cloud&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google%20Gemini-8E75B2?logo=google&logoColor=white)

## Description

The **AI Recruitment Screening API** is a powerful microservice designed to streamline the hiring process. By leveraging the advanced capabilities of the **Gemini 2.5 Flash Lite** model, this service automates the initial screening of candidates. It accepts job requirements and candidate CVs (in PDF format), analyzes them for relevance, extracts key skills, and scores candidates based on their fit for the role—all in the background. This ensures HR teams focus only on the best talent, saving countless hours of manual review.

## API Documentation

The project includes full Swagger/OpenAPI documentation.

- **Local Development**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **Production**: [https://ai-recruitment-api-60312089512.asia-southeast2.run.app/api-docs](https://ai-recruitment-api-60312089512.asia-southeast2.run.app/api-docs)

## Key Features

- **Secure Authentication**: Protected endpoints using Firebase Auth Middleware ensuring only authorized personnel can post jobs.
- **PDF Text Extraction**: Seamlessly parses PDF CVs to be understood by the AI model.
- **Asynchronous AI Processing**: Uses "fire-and-forget" background processing to handle multiple CVs simultaneously without blocking the API response.
- **Structured Data Storage**: Stores all job details and candidate analysis results securely in Cloud Firestore.
- **Auto-generated API Docs**: Full, interactive API documentation provided via Swagger/OpenAPI.

## Tech Stack

- **Runtime Environment**: Node.js (v20+), TypeScript
- **Framework**: Express.js
- **Cloud & Database**:
  - Firebase Firestore (NoSQL Database)
  - Firebase Storage (File Storage)
  - Firebase Authentication (Security)
  - Google Cloud Run (Serverless Computing)
- **AI Model**: Google Generative AI (Gemini 2.5 Flash Lite)
- **Tools**:
  - **Swagger/OpenAPI** (Documentation)
  - **Morgan** (HTTP Request Logging)

## Getting Started

Follow these steps to set up the project locally for development.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- npm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/dimaswirabakti/be-ai-recruitment-screening.git
    cd be-ai-recruitment-screening
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env` file in the root directory and add the following required variables.

    _Note: You will need a `serviceAccountKey.json` file from your Firebase Project settings for local development._

    ```env
    # Google AI Studio API Key
    GEMINI_API_KEY=your_gemini_api_key_here

    # Path to your Firebase Service Account JSON file (Relative to root)
    # OR raw JSON content string for production
    GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Deployment

This service is containerized and deployed on **Google Cloud Run**. Continuous deployment is configured (e.g., via GitHub Actions or Cloud Build) to auto-deploy changes from the `main` branch.
