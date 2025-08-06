# Quotify

A premium, minimal web app disguised as a simple "Quote of the Day" generator, featuring a hidden friend list and ping system accessible only after authentication.

## Features

### Public Features
- **Quote of the Day**: Beautiful, inspirational quotes with smooth animations
- **Liquid Glass UI**: Modern glassmorphism design with subtle 3D effects
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **PWA Support**: Installable as a progressive web app

### Hidden Features (After Login)
- **Friend List**: Add and manage friends privately
- **Ping System**: Three-level ping system (Green/Casual, Yellow/Important, Red/Urgent)
- **Stealth Mode**: Login buried deep in settings menu
- **Panic Logout**: Emergency clear with Ctrl + Alt + Q

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Storage**: LocalStorage (encrypted in production)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Deploy to GitHub Pages**:
   ```bash
   npm run export
   ```

## Usage

### Public Access
- Visit the site to see daily quotes
- Click "New Quote" for fresh inspiration
- Access settings via the gear icon (top right)

### Private Access
1. Click Settings → More → Miscellaneous → Access Account
2. Enter any username and passphrase (6+ characters)
3. Access the hidden friend list and ping system

### Emergency Features
- **Panic Logout**: Press `Ctrl + Alt + Q` to instantly clear all data and logout
- **Duress Mode**: Special passphrase that silently wipes account data (future feature)

## Design Philosophy

Quotify follows "apple-level design aesthetics" with:
- Meticulous attention to detail
- Intuitive user experience
- Clean, sophisticated visual presentation
- Thoughtful micro-interactions and animations
- Premium liquid glass effects

## Privacy & Security

- No public sign-up or discovery
- Login deeply buried in settings
- All data stored locally (encrypted in production)
- Emergency logout capabilities
- No tracking or analytics

## Future Enhancements

- Voice message pings
- Encrypted cloud storage via GitHub API
- Steganography for hidden messages
- Advanced haptic feedback
- GIF reactions and visual effects

## License

Private project - All rights reserved