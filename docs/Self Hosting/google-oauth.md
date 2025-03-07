# Google OAuth

Before proceeding, you'll need to set up Google OAuth for user authentication:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google OAuth2 API:
    - Navigate to "APIs & Services" > "Library"
    - Search for "Google OAuth2"
    - Click "Enable"

4. Create OAuth credentials:
    - Go to "APIs & Services" > "Credentials"
    - Click "Create Credentials" > "OAuth client ID"
    - Select "Web application"
    - Set a name for your application
    - Add authorized redirect URIs:
     ```
     http://localhost:4000/auth/google/callback
     https://your-domain.com/auth/google/callback
     ```
    - Click "Create"

5. Save your credentials:
    - Note down the `Client ID` and `Client Secret`
    - You'll need these in the next steps

