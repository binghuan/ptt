
# PTT Web Application

A web application for browsing PTT (批踢踢實業坊), Taiwan's largest bulletin board system. This application provides a mobile-friendly interface to access PTT content including hot boards, article lists, and individual articles.

## Features

- **Hot Boards**: View trending/popular PTT boards
- **Article Lists**: Browse articles within specific boards with pagination support
- **Article Content**: Read individual PTT articles with full content
- **Mobile Responsive**: Optimized for mobile devices using jQuery Mobile
- **Favorite Boards**: Save and manage favorite boards locally
- **Comment System**: Post comments via MongoDB integration
- **Cross-Origin Support**: CORS enabled for API access

## Technology Stack

- **Backend**: Node.js with Express.js framework
- **Frontend**: HTML5, CSS3, JavaScript with jQuery Mobile
- **Database**: MongoDB (via MongoLab)
- **Web Scraping**: Cheerio for HTML parsing
- **Character Encoding**: iconv-lite for Big5 encoding support
- **Template Engine**: Jade and EJS

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ptt
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
# or
node bin/www
```

The application will run on http://localhost:8080

## API Endpoints

### Public Routes
- `GET /` - Main application interface
- `GET /api/hotboard` - Get list of hot/trending boards
- `GET /api/articlelist/:url/:page` - Get article list for a specific board
- `GET /api/article/:url` - Get individual article content

### Comment System
- `POST /smo/comment` - Submit a comment (requires MongoDB connection)

## Project Structure

```
├── app.js              # Main Express application
├── package.json        # Dependencies and scripts
├── bin/www            # Application server startup
├── routes/            # Express route handlers
│   ├── index.js       # Main page route
│   ├── users.js       # API routes for PTT data
│   ├── smo.js         # Comment system routes
│   └── fetch.js       # PTT web scraping logic
├── views/             # HTML templates
│   ├── index.html     # Main application page
│   ├── pttBoards.html # Board listing page
│   └── pttView.html   # Article view page
├── public/            # Static assets
│   ├── javascripts/   # Client-side JavaScript
│   ├── stylesheets/   # CSS files
│   └── icon/          # Application icons
└── driver.js          # MongoDB connection test
```

## Configuration

### MongoDB Setup
The application uses MongoDB for the comment system. Update the connection string in `routes/smo.js`:

```javascript
var db = yield MongoClient.connect('mongodb://username:password@host:port/database');
```

### Port Configuration
Default port is 8080. Set the `PORT` environment variable to change:

```bash
PORT=3000 npm start
```

## Development

### Running Tests
```bash
node test_rest.js
```

### Database Testing
```bash
node driver.js
```

## Features Overview

### Web Scraping
- Fetches data from PTT's web interface
- Handles Big5 character encoding
- Parses HTML using Cheerio
- Supports pagination for article lists

### Mobile Interface
- jQuery Mobile for responsive design
- Touch-friendly navigation
- Offline capability with application cache
- Custom icons for various device sizes

### Data Management
- Local storage for favorite boards
- JSON API responses
- Cross-origin resource sharing (CORS)

## Browser Support

- Modern mobile browsers (iOS Safari, Android Chrome)
- Desktop browsers with mobile viewport
- Requires JavaScript enabled