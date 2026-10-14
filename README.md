# Nursing Graduate Portfolio

A responsive BSN graduate personal portfolio with a React + Vite frontend and Laravel REST API backend. Personal details, school, graduation year, values, philosophy, learning areas, photos, and favorites are editable placeholders; replace them with accurate details before publishing. The site does not imply nursing licensure or current practice.

## Requirements

- Node.js 20.19+ or 22.12+ and npm
- PHP 8.2+, Composer, and MySQL 8+

On Windows, install Node.js LTS from [nodejs.org](https://nodejs.org/en/download/), PHP from [windows.php.net](https://windows.php.net/download/), Composer from [getcomposer.org](https://getcomposer.org/download/), and MySQL from [dev.mysql.com](https://dev.mysql.com/downloads/installer/). During setup, make sure `node`, `npm`, `php`, and `composer` are available on `PATH`; reopen Command Prompt after installing them. PHP also needs the `pdo_mysql`, `mbstring`, and `openssl` extensions enabled.

## Setup

1. Create a MySQL database, for example `personal_portfolio`.
2. Open Command Prompt at the project root and initialize the API:

   ```bat
   cd /d "C:\New folder\backend"
   copy .env.example .env
   composer install
   php artisan key:generate
   php artisan migrate --seed
   php artisan serve
   ```

   Edit `backend\.env` first if your MySQL database name or credentials differ from the defaults.

3. In a second Command Prompt, start the frontend:

   ```bat
   cd /d "C:\New folder\frontend"
   copy .env.example .env
   npm install
   npm run dev
   ```

4. Open the Vite URL shown in the terminal. The frontend API base defaults to `http://127.0.0.1:8000/api`.

## Development Notes

- The public website requires no login. Only the contact form submits data to the API; content has local fallback placeholders so the page remains usable if the backend is offline.
- Netlify deployment is configured in `netlify.toml` to build the Vite app from `frontend/`. Set `VITE_API_URL` in the Netlify site environment variables to the deployed Laravel API URL ending in `/api` to enable live portfolio content and contact submissions.
- Nursing philosophy, values, skills, and learning examples are prompts, not claims about personal beliefs, clinical experience, certifications, or licensure. Update the profile seed/database values before publishing.
- Never include identifiable patient photographs or confidential healthcare information in the gallery.
- Use official Spotify, YouTube, or Quran.com pages for external listening/reading links. The project does not host copyrighted audio or unverified Qur'anic text.
- The `backend/` folder includes the Laravel application shell and API source. Install its dependencies with `composer install`; never commit `.env` or private credentials.
- For local cross-origin requests, `backend/config/cors.php` permits the Vite development origin. Restrict this to your real domain in production.
- An admin dashboard and authentication are intentionally omitted from the first usable version; the public API and contact workflow are the initial scope.

## API

- `GET /api/profile`
- `GET /api/songs`
- `GET /api/destinations`
- `GET /api/surahs`
- `GET /api/gallery`
- `GET /api/quotes`
- `POST /api/contact`

## Troubleshooting

- If `npm`, `composer`, or `php` is not recognized, install that tool, verify it is on `PATH`, and open a new terminal.
- If the frontend shows fallback content, confirm Laravel is running on port 8000 and that the `VITE_API_URL` value ends in `/api`.
- If MySQL connection fails, check the database name, username, password, host, and port in `backend/.env`.
