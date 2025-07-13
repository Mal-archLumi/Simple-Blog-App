# Simple Blog App

A simple blog application built with Laravel (backend) and React (frontend). This application allows users to create, read, update, and delete blog posts through a clean and modern interface.

## Features

- **Create Posts**: Add new blog posts with title and content
- **View Posts**: Browse all posts in a clean list view
- **Read Posts**: View individual posts in detail
- **Edit Posts**: Update existing posts
- **Delete Posts**: Remove posts you no longer need
- **Responsive Design**: Works on both desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## Technology Stack

### Backend (Laravel)
- **Laravel 10**: PHP web framework
- **SQLite**: Lightweight database
- **RESTful API**: Clean API endpoints for CRUD operations
- **CORS**: Configured for frontend access

### Frontend (React)
- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful and accessible UI components
- **Lucide Icons**: Modern icon library

## Project Structure

```
blog-app/
├── blog-backend/          # Laravel backend
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   └── PostController.php
│   │   └── Models/
│   │       └── Post.php
│   ├── database/
│   │   ├── migrations/
│   │   └── database.sqlite
│   ├── routes/
│   │   └── api.php
│   └── ...
├── blog-frontend/         # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── public/
│   └── ...
└── README.md
```

## Installation and Setup

### Prerequisites
- PHP 8.1 or higher
- Composer
- Node.js 18 or higher
- npm or pnpm

### Backend Setup (Laravel)

1. Navigate to the backend directory:
   ```bash
   cd blog-backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Copy environment file:
   ```bash
   cp .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Create SQLite database:
   ```bash
   touch database/database.sqlite
   ```

6. Run database migrations:
   ```bash
   php artisan migrate
   ```

7. Start the Laravel development server:
   ```bash
   php artisan serve --host=0.0.0.0 --port=8000
   ```

The backend API will be available at `http://localhost:8000`

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd blog-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev -- --host=0.0.0.0 --port=3000
   # or
   pnpm dev --host=0.0.0.0 --port=3000
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

The Laravel backend provides the following RESTful API endpoints:

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/{id}` - Get a specific post
- `PUT /api/posts/{id}` - Update a specific post
- `DELETE /api/posts/{id}` - Delete a specific post

### Request/Response Examples

#### Create a Post
```bash
POST /api/posts
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my first blog post."
}
```

#### Response
```json
{
  "id": 1,
  "title": "My First Post",
  "content": "This is the content of my first blog post.",
  "created_at": "2025-07-13T08:00:00.000000Z",
  "updated_at": "2025-07-13T08:00:00.000000Z"
}
```

## Usage

1. **Start both servers**: Make sure both the Laravel backend (port 8000) and React frontend (port 3000) are running.

2. **Access the application**: Open your browser and go to `http://localhost:3000`

3. **Create your first post**: Click the "New Post" button to create your first blog post.

4. **Manage posts**: Use the interface to view, edit, and delete posts as needed.

## Development Notes

### Database Configuration
The application is configured to use SQLite for simplicity. The database file is located at `blog-backend/database/database.sqlite`. For production use, you may want to switch to MySQL or PostgreSQL by updating the `.env` file.

### CORS Configuration
CORS is configured to allow all origins for development. For production, update the `config/cors.php` file to restrict origins to your frontend domain.

### Environment Variables
Key environment variables in the Laravel `.env` file:
- `DB_CONNECTION=sqlite`
- `DB_DATABASE=/path/to/database.sqlite`
- `APP_URL=http://localhost:8000`

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the Laravel backend is running and CORS is properly configured.

2. **Database Errors**: Ensure the SQLite database file exists and migrations have been run.

3. **Port Conflicts**: If ports 3000 or 8000 are in use, change them in the startup commands.

4. **PHP Extensions**: Make sure required PHP extensions are installed:
   ```bash
   sudo apt install php-sqlite3 php-mbstring php-xml php-curl
   ```

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!

