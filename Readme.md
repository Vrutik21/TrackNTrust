# Track&Trust - Prototype logistics system

**Track & Trust: Where Packages Find Their Way, Every Step of the Journey!**

## Problem Statement

Customers face challenges in tracking packages, leading to package loss and trust issues within the supply chain. Additionally, issues arise when customers fail to pick up parcels even after two delivery attempts.

### Identified Sub-problems:

1. **Tracking package due to loss**
2. **Trust Issues between Customers and Delivery Personnel**
3. **Unclaimed parcels after 2 delivery attempts**

## Location Tracking Law - UK/Canada

In both the United Kingdom and Canada, location tracking for employee monitoring falls under the regulations of the GDPR and the Personal Information Protection and Electronic Documents Act, respectively. Key points include:

- **United Kingdom (GDPR):** Location tracking is considered employee monitoring, requiring employee consent and ensuring unrestricted access to private data. Organizations must adhere to GDPR guidelines, including transparency about tracked data, having a legal basis for processing employee information, and using it in a way that benefits staff.
- **Canada (PIPEDA):** Monitoring regulations emphasize the importance of employee consent and informed policy disclosure.

## Product Features

- **Real-time Tracking:**

  - Our MVP shows the last updated location for the package, helping inventory managers track the status of packages.
  - Real-time tracking via Google Maps is supported.

- **Geofencing:**

  - Location-based technology that creates virtual boundaries around geographic areas, triggering specific actions when a device enters or exits these boundaries.
  - Commonly used for marketing, asset tracking, and security applications.

- **Unclaimed Parcels Solution:**
  - After two delivery attempts, parcels are sent to a facility.
  - Customers can select a specific date and time for delivery according to their convenience.

## Project Breakdown

### Problem: Tracking Packages Due to Loss

- **Research & Solution:**
  - Research identified a real-time tracking solution that scans products at every stop, updating locations conveniently.
- **Tasks Identified:**
  - **Database Handling**
  - **Backend Development**
  - **Frontend/UI Development**
  - **Integration**

### Problem: Trust Issues Between Customers and Delivery Personnel

- **Research & Solution:**
  - Research led to the adoption of geofencing to track delivery personnel within a specified radius of the customer's home.
  - Real-time notifications are provided when delivery partners are in proximity.
- **Tasks Identified:**
  - **Geofencing Integration**

### Problem: Unclaimed Parcels After 2 Delivery Attempts

- **Solution:**
  - The parcel is sent to a facility, and the customer is given the option to select a delivery time at their convenience.
- **Tasks Identified:**
  - **Backend Development**
  - **Login/Signup Page**
  - **Role-Based Management**

## Getting Started

### Prerequisites

- **Node.js:** Make sure Node.js is installed on your system.
  - Download and install from: [Node.js Official Website](https://nodejs.org/en)

### Installation

#### Clone the Repository

```bash
git clone https://github.com/Vrutik21/TrustNTrack.git
```

#### Backend Setup

1. Navigate to the Backend directory:

```bash
cd Backend
```

2. Install the required dependencies:

```bash
npm install
```

3. If there is any database migration error, run prisma commands:

```bash
npm run migrate
npm run generate
```

4. To run the backend server:

```bash
npm run start:dev
```

### Frontend Setup:

1. Navigate to the Frontend directory:

```bash
cd Frontend
```

2. Install the required dependencies:

```bash
npm install
```

3. To run the fronend server:

```bash
npm run start
```

Open `http://localhost:3000` to view it in your browser.

## Project Structure

- **Backend**: Contains the Nest.js application.
- **Frontend**: Contains the React.js application.

## Project Submission

### This project is submitted as part of the COMP-8117:Advanced Software Engineering course for the Winter 2024 session. It involves demonstrating the project during a scheduled slot.
