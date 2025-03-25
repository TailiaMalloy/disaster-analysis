# Build the frontend
cd frontend
npm run build
cd ..

# Remove existing build folder if it exists
if (Test-Path "backend/public") { Remove-Item -Recurse -Force "backend/public" }

# Recreate the public folder
New-Item -ItemType Directory -Path "backend/public"

# Copy the frontend build to the backend/public folder
Copy-Item -Recurse -Force "frontend/dist/*" "backend/public"

# Build the backend TypeScript files
cd backend
npm run build