![HealthIS Overview](./banner.png)

### Overview

It's built on:

- Next.js 15.x
- React 19
- TypeScript
- Tailwind CSS V4


### Live link
- Available on https://healthis-preview.vercel.app/

### HealthIS Application Overview

HealthIS is a comprehensive health information system designed to manage clients, health programs, enrollments, and analytics. Here's a page-by-page overview of the application:

## Authentication Pages

### Sign In Page (`/signin`)

- Allows existing users to authenticate with email and password
- Includes "Remember me" functionality and password recovery option
- Redirects authenticated users to the dashboard


### Sign Up Page (`/signup`)

- Enables new users to create an account
- Collects basic information (name, email, password)
- Includes terms of service agreement
- Redirects to dashboard upon successful registration


## Dashboard

### Dashboard Overview (`/dashboard`)

- Serves as the main landing page after authentication
- Displays key performance indicators (KPIs):

- Total clients count with growth percentage
- Active programs count with growth percentage
- Recent enrollments with growth percentage



- Features a monthly enrollments chart showing trends over time
- Includes program distribution visualization (bar and area charts)
- Shows recent activity feed with system events
- Provides quick access to all main system functions


## Clients Management

### Clients List Page (`/dashboard/clients`)

- Displays a searchable, paginated table of all registered clients
- Allows filtering and sorting of client records
- Provides quick access to client details
- Includes functionality to enroll clients in programs
- Features a button to register new clients


### Client Registration Page (`/dashboard/clients/register`)

- Form to add new clients to the system
- Collects personal information, contact details, and location data
- Uses Kenya-specific location data (counties, sub-counties)
- Validates input and provides feedback on submission


### Client Details Page (`/dashboard/clients/[uuid]`)

- Shows comprehensive client information:

- Personal details (name, gender, date of birth)
- Location information (county, sub-county)
- Programs the client is enrolled in
- Activity timeline showing client-related events



- Includes API access section for exposing client data to external systems
- Allows navigation back to the clients list


## Programs Management

### Programs List Page (`/dashboard/programs`)

- Displays all health programs in a searchable table
- Allows creation of new programs
- Provides editing functionality for existing programs
- Shows program details including enrollment counts
- Features pagination for navigating through multiple programs


### Program Details Page (`/dashboard/programs/[uuid]`)

- Shows comprehensive program information:

- Program name and description
- Creation date and last update
- List of enrolled clients



- Allows editing program details
- Provides functionality to add clients to the program
- Shows enrollment statistics


## Profile & Settings

### Profile Page (`/dashboard/profile`)

- Displays user profile information with sidebar navigation
- Sections include:

- Personal information (name, email, profile picture)
- Professional details (role, department, specialization)
- Security settings (password change, two-factor authentication)
- Activity history (login events, system actions)


## Search Functionality

### Search Page (`/dashboard/search`)

- Provides global search functionality across the application
- Shows search suggestions as you type
- Displays categorized results (clients, programs, activities)
- Allows quick navigation to search result items


## API Access

### API Access Page (`/dashboard/api-access`)

- Provides documentation for the system's API endpoints
- Shows authentication methods and example requests
- Lists available endpoints with parameters and response formats


## Additional Features

- **Responsive Design**: All pages adapt to different screen sizes (desktop, tablet, mobile)
- **Real-time Analytics**: Dashboard charts and statistics update with real data from the backend
- **Data Export**: Functionality to export client and program data to CSV
