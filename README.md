Apartment Management System
A simple apartment management system built with Supabase and Next.js.

Prerequisites
Node.js and npm installed on your machine.
Supabase account: Sign up here.
Getting Started
Set up Supabase:

Create a new project on the Supabase dashboard.
Set up a database and create a table for apartments.
Create a Next.js Project:

bash
Copy code
npx create-next-app my-apartment-management
cd my-apartment-management
Install Dependencies:

bash
Copy code
npm install supabase react-query react-query/devtools swr
Set up Supabase Configuration:
Create a supabase.js file in the lib directory:

javascript
Copy code
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_API_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
Create Pages:
Update the pages/index.js file with your UI components.

Run the Application:

bash
Copy code
npm run dev
Test the Application:
Open your browser and go to http://localhost:3000 to test your Next.js application.
