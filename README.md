# Gourmet Compass 🧭🍽️

Discover nearby restaurants tailored to your taste! **Gourmet Compass** is an intelligent restaurant recommendation application that leverages Google's Gemini AI and Google Maps data to provide personalized restaurant suggestions based on your location, food preferences, dining style, and budget.

## 🌟 Features

- **Personalized Recommendations**: Get AI-powered restaurant suggestions based on your food cravings and location
- **Location-Based Search**: Automatically detect your current location or search by entering a specific area
- **Advanced Filtering**: Filter restaurants by:
  - Cuisine type and food preferences
  - Dining style (casual, fine dining, family-friendly, etc.)
  - Price range (budget-friendly to premium)
- **Detailed Information**: View comprehensive restaurant details including:
  - Restaurant name and bio summary
  - Customer reviews summary
  - Ratings and highlights
  - Sourced information from Google Maps
- **Responsive Design**: Beautiful, mobile-friendly interface with Tailwind CSS
- **Real-time Loading**: Visual feedback with loading spinner during searches
- **Error Handling**: Clear error messages and validation

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **AI Integration**: Google Generative AI (Gemini)
- **Location Services**: Geolocation API
- **Package Manager**: npm

## 📋 Project Structure

```
Gourmet-Compass/
├── App.tsx                 # Main application component
├── index.tsx              # React entry point
├── types.ts               # TypeScript type definitions
├── metadata.json          # AI Studio app metadata
├── components/            # React components
│   ├── SearchForm.tsx     # Search input form
│   ├── ResultsDisplay.tsx # Restaurant results display
│   ├── LoadingSpinner.tsx # Loading indicator
│   ├── ErrorMessage.tsx   # Error notification
│   ├── Header.tsx         # App header
│   └── WelcomeMessage.tsx # Welcome screen
├── services/              # API services
│   └── geminiService.ts   # Gemini API integration
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── index.html             # HTML entry point
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- A Google Gemini API key

### Installation

1. **Clone the repository** (or set up locally)
   ```bash
   git clone https://github.com/Dhanya-Abhirami/Gourmet-Compass.git
   cd Gourmet-Compass
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   - Create a `.env.local` file in the root directory
   - Add your Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_api_key_here
     ```
   - Get your API key from [Google AI Studio](https://ai.studio)

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or another available port)

### Build for Production

```bash
npm run build
```

This generates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📖 Usage

1. **Enable Location Access**: Allow the browser to access your location for nearby restaurant searches
2. **Enter Preferences**:
   - Enter your desired location (or use "my current location")
   - Specify the type of cuisine or food you're craving
   - (Optional) Select dining style and price range
3. **Search**: Click the search button to get recommendations
4. **View Results**: Browse the personalized restaurant recommendations with ratings, reviews, and sourced information

### Near Me Feature

Click the "Near Me" button to automatically use your current location for searching nearby restaurants.

## 🔌 API Integration

### Gemini AI Service

The application uses Google's Gemini API to:
- Understand natural language food and location queries
- Generate intelligent restaurant recommendations
- Provide grounded responses using Google Maps data
- Return structured recommendation data with source attribution

### Type Definitions

Key types used in the application:

```typescript
interface UserLocation {
  latitude: number;
  longitude: number;
}

interface Restaurant {
  name: string;
  bioSummary: string;
  reviewSummary: string;
  rating: string;
  highlight: string;
}

interface GroundingChunk {
  maps: MapSource;
}
```

## 🌐 Live Demo

View the live application: [Gourmet Compass](https://gourmet-compass-ten.vercel.app)

View the app in AI Studio: [AI Studio Project](https://ai.studio/apps/drive/1lFL0glokeGnF-sNI-LuJ3HX3a85JYD4W)

## 📝 Key Components

- **App.tsx**: Main component managing state, geolocation, and search logic
- **SearchForm**: User input interface for location, food type, and filters
- **ResultsDisplay**: Renders restaurant recommendations with details
- **LoadingSpinner**: Visual feedback during API requests
- **ErrorMessage**: User-friendly error notifications
- **geminiService**: Handles Gemini API communication

## 🔐 Security & Permissions

The application requests:
- **Geolocation**: To find restaurants near your current location
- No other sensitive permissions required

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

- Save favorite restaurants
- User reviews and ratings system
- Reservation integration
- Social sharing features
- Multiple language support
- Advanced map visualization

## 💬 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Happy dining! 🍽️**