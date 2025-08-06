# Quotify

A private, minimal, and modern web app that starts as a simple "Quote of the Day" site but secretly expands into a full friends-based pinging system once logged in.

## Features

- **Guest Mode**: Minimal quote display with frosted glass effects
- **Hidden Login**: Access the full communication system
- **Mood-Based Pinging**: Green (casual), Yellow (important), Red (urgent)
- **Encrypted Local Storage**: Zero-server architecture
- **Responsive Design**: Works on all devices
- **Privacy Focused**: No public search, encrypted data

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Run `npm start` to develop locally
4. Run `npm run build` to create production build
5. Run `npm run deploy` to deploy to GitHub Pages

## Usage

1. Visit the site to see the quote display
2. Click the settings cog in bottom-right
3. Navigate to Miscellaneous > Login
4. Enter username and passphrase (min 6 characters)
5. Start pinging friends and sharing quotes!

## Security Features

- Duress passphrase instantly wipes account
- Panic shortcut: Ctrl + Alt + Q
- Exponential backoff for failed login attempts
- All data encrypted in localStorage
