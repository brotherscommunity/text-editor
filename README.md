## Brothers International Community Frontend Documentation

This documentation provides an overview of the Brothers International Community Frontend application.

---

### 1. Introduction

- **Built using**: TypeScript, Next.js (App Router), Tailwind CSS

---

### 2. Running the Application

#### a. Clone the Repository

```bash
git clone https://github.com/brotherscommunity/second_plus.git
cd second_plus/frontend
```

#### b. Install Dependencies

```bash
npm install
```

#### Backend Setup

Refer to the Backend Repository Documentation for instructions on running the backend server.

---

### 3. Styling

The application utilizes a combination of pre-built UI components and utility-first CSS for a consistent and customizable user interface:

- **ShadCN UI Components**: Offer pre-built and customizable components for a consistent UI.
- **Tailwind CSS**: Provides utility-first classes with custom configurations for styling flexibility.

---

### 4. API Integration

#### Server Actions

- Used for submitting forms and modifying data.
- Include a function to attach the user's access token to the request for secure communication.

#### TanStack React Query

- Employed for fetching data within client components.

#### Request Flow

1. Client components refrain from directly sending requests to the backend.
2. Requests are sent to the Next.js server.
3. The Next.js server acts as an intermediary, forwarding the request and response between the client and backend.

This approach enhances security by preventing direct client-to-backend communication.

---

### 5. Authentication

- **NextAuth.js Library**: Manages user authentication.
  - **Sign-in**:
    - Upon successful sign-in, user profile data and access tokens are retrieved from the server.
    - This information is encrypted and stored in a JSON Web Token (JWT).
  - **Token Management**:
    - When the access token expires, a refresh token request is automatically sent to the server to obtain a new access token.
  - **Profile Updates**:
    - User profile updates trigger a refresh of user data from the server to ensure the application reflects the latest information.

---

### 6. Implementation Details

#### Text Editor

- Built with the Tiptap library.
- A custom extension facilitates image uploads.
- When an image is dropped or pasted:
  - The extension processes the image data.
  - The image is uploaded to the server.
  - Upon successful upload, the server returns the image URL, which replaces the placeholder image in the editor.
- Deleting an image from the editor sends a request to the server to remove it from storage.
- A "mini" editor variant is available, lacking image handling and supporting a limited set of text formatting options.

#### Functions Page

- Displays forms based on user roles and permissions.
- This information is embedded within the JWT issued during user authentication.
- The system dynamically determines which forms to present to a user by analyzing their roles and permissions from the JWT.

---

### 7. Page Visits

- Upon visiting a page, a component retrieves a unique key associated with that page from a JavaScript object.
- This key, along with the user's access token, is included in a request sent to the Next.js server.
- The server utilizes the key to track and update the visitor count for the specific page.
