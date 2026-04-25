# NextGen CRM Application

A full-stack Customer Relationship Management (CRM) application with a modern frontend and robust backend API, featuring client management and chatbot integration.

## Features

- **Client Management**: Create, view, and manage client information
- **Authentication**: User login and signup functionality
- **Chatbot Integration**: AI-powered chatbot for customer interactions
- **RESTful API**: Complete API for backend operations
- **Cross-Origin Support**: CORS enabled for seamless frontend-backend communication
- **Database Persistence**: PostgreSQL database for reliable data storage

## Project Structure

```
NextGen/
├── back-end/                 # Flask API backend
│   ├── app.py               # Main Flask application
│   ├── db.py                # Database models and configuration
│   ├── routes.py            # API routes and endpoints
│   ├── init_db.py           # Database initialization
│   ├── test.py              # Test suite
│   ├── chatbot/             # Chatbot module
│   │   ├── __init__.py      # Chatbot blueprint initialization
│   │   └── routes.py        # Chatbot routes
│   └── venv/                # Python virtual environment
│
└── front-end/               # Frontend application
    ├── index.html           
    ├── index.css            
    ├── index.js             
    ├── acceuil/             # Welcome/dashboard page
    │   ├── acceuil.html     # Main page (login/signup)
    │   ├── acceuil.css      # Main styles
    │   └── acceuil.js       # Main scripts
    └── pics/                # Static images and assets
```

## Tech Stack

### Backend
- **Framework**: Flask
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **CORS**: Flask-CORS
- **Python Version**: 3.11+

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

## Prerequisites

- Python 3.11 or higher
- PostgreSQL database
- Node.js (optional, for frontend development)

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd NextGen
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd back-end
```

Create and activate virtual environment:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

### 3. Database Configuration

Update the database connection string in `app.py`:
```python
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://username:password@localhost/crm_db"
```

Initialize the database:
```bash
python init_db.py
```

### 4. Frontend Setup

The frontend is a static HTML/CSS/JS application and doesn't require installation. Simply open `front-end/index.html` in a web browser or use a local server.

## Running the Application

### Start Backend Server

From the `back-end` directory:
```bash
python app.py
```

The API will be available at: `http://127.0.0.1:3001`

### Start Frontend

Using a simple HTTP server (Python):
```bash
cd front-end
python -m http.server 5500
```

Then open `http://localhost:5500` in your browser.

## API Documentation

### Client Endpoints

#### Add Client
- **Method**: POST
- **URL**: `/client`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "12345678"
  }
  ```
- **Response**: 
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "12345678"
  }
  ```

#### List All Clients
- **Method**: GET
- **URL**: `/client`
- **Response**: Array of client objects

#### Get Single Client
- **Method**: GET
- **URL**: `/client/<id>`
- **Response**: Single client object

### Chatbot Endpoints

- **URL Prefix**: `/chatbot`
- Routes available in `back-end/chatbot/routes.py`

## Environment Configuration

Create a `.env` file in the `back-end` directory for sensitive configuration:
```
DATABASE_URL=postgresql://username:password@localhost/crm_db
FLASK_ENV=development
DEBUG=True
```

## Testing

Run the test suite:
```bash
python back-end/test.py
```

## CORS Configuration

The application is configured to accept requests from:
- `http://127.0.0.1:5500` (local frontend)
- `null` (for development)

Modify the CORS settings in `app.py` for production use:
```python
CORS(app, origins=["your-frontend-url"])
```

## Key Features Details

### Client Management
- Add new clients with validation
- Prevent duplicate emails and phone numbers
- Retrieve all clients or specific client by ID

### Database Schema
**Clients Table**
- `id` (Primary Key)
- `name` (String, required)
- `email` (String, unique, required)
- `phone` (String, unique, required)

## Development

### Adding New Routes

1. Add route function in `back-end/routes.py`
2. Restart the Flask server
3. Test using Postman or similar API testing tool

### Frontend Updates

1. Modify HTML files in `front-end/`
2. Update CSS in corresponding `.css` files
3. Add JavaScript functionality in corresponding `.js` files
4. No build process required - changes are immediate

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Verify database credentials in `app.py`
- Check if database `crm_db` exists

### CORS Error
- Verify frontend URL in CORS configuration
- Check that backend is running on `http://127.0.0.1:3001`

### Port Already in Use
- Backend: Change port in `app.run()` from 3001 to another port
- Frontend: Use different port with `python -m http.server <port>`

## Contributing

1. Create a new branch for features
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

[Add your license here]

## Support

For issues and questions, please open an issue in the repository.

## Future Enhancements

- User authentication and authorization
- More advanced chatbot capabilities
- Client interaction history
- Analytics and reporting dashboard
- Email notifications
- API documentation with Swagger/OpenAPI
