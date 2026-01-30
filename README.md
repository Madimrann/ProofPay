# ProofPay 🧾

ProofPay is a mobile application designed to resolve peer-to-peer payment disputes by providing a streamlined interface for uploading, verifying, and tracking transaction receipts. Built with **React Native** and **Expo**, it features a premium design system and a focus on user trust.

## 🚀 Overview

This is a **personal project** exploring modern mobile development patterns, focusing on:
- **Premium UI/UX**: Custom design system with clean typography and glassmorphism elements.
- **Form & Validation**: Robust receipt upload and verification flows.
- **Visual Storytelling**: Interactive transaction timelines and status tracking.

## ✨ Key Features

- **Dashboard**: Real-time overview of active cases and recent transactions.
- **Receipt Analysis**: Upload receipts via camera or gallery with simulated AI verification.
- **Dispute Timeline**: Track the lifecycle of a payment dispute from "Under Review" to "Resolved".
- **Design System**: A custom-built UI library including `Cards`, `Buttons`, and `Inputs` tailored for a cohesive look.

## 📱 System Workflow

The ProofPay system is designed to handle payment disputes with a structured metadata-first approach:

1.  **Case Initialization**: Users create a new "Case" for a specific transaction value.
2.  **Evidence Capture**: Receipts are captured via camera or selected from the gallery.
3.  **Intelligent Analysis (Simulated)**: The app simulates an OCR process to extract:
    - Transaction Date (`Apr 24, 2024`)
    - Amount (`$150.00`)
    - Recipient (`Sarah Tan`)
4.  **Verification Loop**: The user validates the extracted data against the claim.
5.  **Immutable Timeline**: Once verified, the proof is hashed into a visual timeline, tracking the status from "Under Review" to "Resolved".

## 🛠️ Tech Stack

- **Framework**: React Native (Expo Go)
- **Language**: TypeScript
- **Navigation**: Expo Router (File-based routing)
- **Styling**: Custom StyleSheet with Reactive Theme Tokens
- **Icons**: Lucide React Native

## 📸 Screenshots

<div style="display: flex; gap: 10px; overflow-x: auto;">
  <img src="assets/screenshots/screen1.png" alt="Home Screen" width="200" />
  <img src="assets/screenshots/screen2.png" alt="Upload Flow" width="200" />
  <img src="assets/screenshots/screen3.png" alt="Verification" width="200" />
</div>

## 🏁 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Madimrann/ProofPay.git
    cd ProofPay
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the app**
    ```bash
    npx expo start
    ```

## 📝 License

This project is for educational and portfolio purposes.
