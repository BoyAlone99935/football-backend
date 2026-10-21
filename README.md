# LiveScore — Sports Scores Application ⚽

LiveScore is a sports application that integrates with an external LiveScore API to retrieve and display sports data.

This was one of my first projects after learning backend development. Building it gave me practical experience with authentication, third-party API integration, and caching strategies to improve backend performance.

## ✨ Features

- **Sports Data Integration:** Retrieve sports data from an external API.
- **JWT Authentication:** Implement token-based authentication.
- **API Integration:** Connect the backend to a third-party sports data service.
- **In-Memory Caching:** Temporarily cache retrieved data to reduce repeated API requests.
- **Backend Development:** Handle server-side logic and API communication.

## 🛠️ Tech Stack

- **Language:** JavaScript
- **Runtime:** Node.js
- **Backend Framework:** Express.js
- **Authentication:** JSON Web Tokens (JWT)
- **External Services:** LiveScore API
- **Caching:** Node.js in-memory caching

## ⚡ Technical Highlights

### 🔐 JWT Authentication

The application uses JSON Web Tokens (JWT) for authentication.

Implementing this functionality provided practical experience with token-based authentication and protecting application functionality for authenticated users.

### 🌐 Third-Party API Integration

The application integrates with an external LiveScore API to retrieve sports data.

This provided experience working with external APIs, processing responses, and incorporating third-party data into a backend application.

### ⚡ In-Memory Caching

The application uses Node.js in-memory caching to temporarily store retrieved data and reuse it across requests.

This helps reduce repeated requests to the external API and can improve response times when cached data is available.

Because the cache is stored in memory, its contents are temporary and may be lost when the server restarts.

## 📚 What I Learned

Building this project helped me gain practical experience with:

- Developing backend applications using Node.js and Express.js.
- Implementing JWT-based authentication.
- Integrating third-party APIs.
- Working with external data sources.
- Applying caching techniques to reduce unnecessary API requests.
- Understanding backend performance considerations.

## 🚀 Getting Started

### Prerequisites

Before running the project, ensure you have:

- Node.js installed.
- npm installed.
- Access to the required LiveScore API.
- Any API credentials required by the external service.

### Installation

**1. Clone the repository**

```bash
git clone YOUR_REPOSITORY_URL
```

**2. Navigate into the project directory**

```bash
cd YOUR_PROJECT_DIRECTORY
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env` file and configure the environment variables required by the application.

Use your project's existing configuration as a reference. Do not commit API keys, JWT secrets, or other sensitive credentials.

**5. Start the application**

Use the appropriate start command defined in your `package.json`.

For example, if your project defines a `start` script:

```bash
npm start
```

## 👨‍💻 Developer

**GitHub:** [@BoyAlone99935](https://github.com/BoyAlone99935)

---

*Built as part of my journey into backend development, with a focus on authentication, API integration, and performance optimization.*
