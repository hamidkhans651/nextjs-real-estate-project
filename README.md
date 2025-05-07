# Next.js Real Estate Project

A modern real estate platform built with Next.js, featuring property listings, user authentication, and advanced search capabilities.

# Full documentation of this project

https://docs.google.com/document/d/1MmFTF8dsSs-UNtZP1WYt43bkHuU26yQvh8CowxaQTck/edit?usp=sharing

## Project Screenshot

![Real Estate Platform Screenshot](public/assets/screenshots/homepage.png)

## Features
xsd

- 🏠 Property Search & Listings
- 👥 User Authentication
- 💼 Agent/Realtor Profiles
- 📱 Responsive Design
- 🔍 Advanced Search Filters
- 📝 Property Management

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- NextUI
- Drizzle ORM
- PostgreSQL
- NextAuth.js

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nextjs-real-estate-project.git
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# test user details
username: usertest
Email: usertest@gmail.com
Password: Password34343@

jj



# test user details
username: usertest232
Email: usertest2323@gmail.com
Password: Password342323343@
g

@facebook authenticaion
@twetter verification 
@google
@discord
docume


final year project 

fina




final test user common
asiyakahn232@gmail.com
asiya32323@H



adding 

second admin test
admin232test22@gmail.com
admin232lahre34@@


#doc

Next.js Project DocumentationOverviewThis document provides comprehensive documentation for your Next.js project, which utilizes Drizzle ORM for database management with Neon, NextAuth for user authentication, Zod for validation, NextUI and Tailwind CSS for the user interface, and ImageKit for image management. The application features separate dashboards for users and administrators, with user access limited to properties added by administrators. Administrators have full CRUD (Create, Read, Update, Delete) capabilities for property management. The project is hosted on Vercel and connected to your GitHub repository (pinelnie).  The project is built using TypeScript and React Hooks.Table of ContentsProject ArchitectureTechnologies UsedDatabase Setup (Neon & Drizzle ORM)Neon SetupDrizzle ORM SetupDatabase SchemaMigrationsAuthentication (NextAuth)ConfigurationUser Roles and Access ControlDashboard AccessFeaturesUser DashboardAdmin DashboardProperty Management (CRUD)Deployment (Vercel)Vercel ConfigurationGitHub IntegrationGetting StartedPrerequisitesInstallationConfigurationRunning the ApplicationFolder StructureAPI EndpointsCode HighlightsZod Validation ExampleNextUI Component ExampleImageKit UsageTroubleshootingFuture ImprovementsConclusion1. Project ArchitectureThe project follows a full-stack architecture, leveraging Next.js for both frontend and backend functionalities.Frontend: Next.js handles the user interface, routing, and component rendering.  NextUI and Tailwind CSS are used for styling. React Hooks are used for state management and component logic.Backend: Next.js API routes manage server-side logic, including database queries (via Drizzle ORM), authentication (via NextAuth), and data validation (via Zod).Database: Neon provides the PostgreSQL database, and Drizzle ORM is used as the ORM to interact with the database.Authentication: NextAuth handles user authentication, with different roles (user and admin) defined for access control.Image Management: ImageKit is used for storing and optimizing images.Deployment: Vercel is used to host the application, with continuous deployment enabled through GitHub integration.2. Technologies UsedNext.js: A React framework for building server-side rendered web applications.Drizzle ORM: A TypeScript ORM for interacting with SQL databases.Neon: A serverless PostgreSQL database platform.NextAuth: An authentication library for Next.js.Vercel: A cloud platform for hosting and deploying web applications.GitHub: A version control and code collaboration platform.TypeScript: A superset of JavaScript that adds static typing.React Hooks:  A feature in React that lets you use state and other React features in functional components.Zod: A TypeScript-first schema declaration and validation library.NextUI: A UI library for Next.js that uses Tailwind CSS.Tailwind CSS: A utility-first CSS framework.ImageKit: A cloud-based image and video management service.3. Database Setup (Neon & Drizzle ORM)Neon SetupCreate a Neon account: Sign up at https://neon.tech/.Create a new project: Follow the Neon documentation to create a new PostgreSQL database project.Obtain database connection URL: Retrieve the database connection URL from your Neon project dashboard. This URL will be used to connect Drizzle ORM to your Neon database. It typically looks like: postgresql://<user>:<password>@<host>/<database>Drizzle ORM SetupInstall Drizzle ORM: Install the necessary Drizzle ORM packages using npm, yarn, or pnpm.Configure Drizzle: Create a drizzle.config.ts file to configure Drizzle ORM, specifying the schema file and database connection.Define schema: Create your database schema using Drizzle's TypeScript syntax. This defines the structure of your database tables.Generate migrations: Use Drizzle Kit to generate SQL migration files based on your schema.Apply migrations: Apply the generated migrations to your Neon database to create or update the database schema.Database SchemaDetailed database schema will be present in a schema.ts or similar file. Here's a conceptual outline:Users Table: Stores user information (ID, name, email, etc.), managed by NextAuth.Properties Table: Stores property details (ID, title, description, price, location, etc.).(Optional) User-Property Relationship Table: If needed, to explicitly link which user added which property. This might be implicit in your current setup, but an explicit table can be useful for more complex relationships.MigrationsDrizzle ORM uses migration files to manage database schema changes. These files are located in a migrations directory.When you change your schema, you generate a new migration file.When you deploy your application, you run the migrations to update the database schema to the latest version.To generate migrations, use the command: npm run generateTo apply migrations, use the command: npm run migrateThis ensures that your database schema is always in sync with your application's code.4. Authentication (NextAuth)ConfigurationNextAuth is configured in the pages/api/auth/[...nextauth].js file (or in app/api/auth/[...nextauth]/route.ts if you're using the App Router).You'll need to configure:Providers: Specify the authentication providers (e.g., Google, GitHub, email/password).Database Adapter: Configure NextAuth to use Drizzle ORM to store user data in your Neon database. This involves installing the @auth/drizzle-adapter package.Secret: Set a secure NEXTAUTH_SECRET environment variable.Callbacks: (Optional) Define callbacks to customize the authentication process, such as handling user sign-in or session data.User Roles and Access ControlYour application uses a role-based access control system with two roles:User: Can view properties added by administrators.Admin: Can manage all properties (create, read, update, delete) and potentially other administrative tasks.User roles are typically managed within the database (e.g., a role field in the users table) and checked during authentication and authorization. NextAuth callbacks are used to add the user's role to the session object.  This information is then available in your components and API routes.Dashboard AccessAccess to the user and admin dashboards is controlled based on the user's role.Middleware or route guards are used to protect the dashboard routes and ensure that only authorized users can access them.For example, you might have:/dashboard/user - Accessible only to users with the "user" role./dashboard/admin - Accessible only to users with the "admin" role.5. FeaturesUser DashboardDisplays a list of properties added by administrators.Users can typically view property details.May include search or filtering functionality.Functionality is limited to viewing.Admin DashboardProvides an interface for managing properties.Administrators can perform CRUD operations on properties.May include additional administrative tools or reports.Property Management (CRUD)Create: Administrators can add new properties to the database, including details such as title, description, price, and location.  Input validation is handled by Zod.Read: Both users and administrators can view property details.Update: Administrators can modify existing property information.  Input validation is handled by Zod.Delete: Administrators can remove properties from the database.6. Deployment (Vercel)Vercel ConfigurationYour project is deployed on Vercel.A vercel.json file (or project settings in the Vercel dashboard) configures how your application is built and deployed.This configuration includes settings such as:Next.js build settings.Environment variables (including the database connection URL and ImageKit credentials).Routing rules.GitHub IntegrationYour Vercel project is connected to your GitHub repository ("pinelnie").This enables continuous deployment:When you push changes to your GitHub repository, Vercel automatically builds and deploys your application.This streamlines the deployment process and ensures that your live application is always up-to-date with your code.7. Getting StartedPrerequisitesNode.js installed on your development machine.A Neon account and database set up (see Database Setup).Git installed on your development machine.A GitHub account (to clone the repository).Vercel CLI (optional, for local development with Vercel).InstallationClone the repository:git clone https://github.com/pinelnie/<your-repo-name>.git
cd <your-repo-name>
Install dependencies:npm install # or yarn install or pnpm install
ConfigurationSet up environment variables:Create a .env.local file in the root of your project.Add the following environment variables, replacing the values with your actual configuration:DATABASE_URL=your_neon_database_url
NEXTAUTH_SECRET=your_nextauth_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
# Add any other necessary environment variables
Important:DATABASE_URL: Your Neon database connection URL.NEXTAUTH_SECRET: A long, random string used to secure NextAuth. Generate a secure secret using openssl rand -base64 32 on Linux/macOS or a similar method.IMAGEKIT_PRIVATE_KEY: Your ImageKit private key.IMAGEKIT_URL_ENDPOINT: Your ImageKit URL endpoint.Running the ApplicationStart the development server:npm run dev # or yarn dev or pnpm dev
Open the application: Open your browser and navigate to http://localhost:3000.8. Folder Structureproject-root/
├── app/                      # Next.js App Router (if used)
│   ├── api/                  # API routes
│   │   └── auth/             # NextAuth API routes
│   ├── dashboard/            # Dashboard pages
│   │   ├── admin/            # Admin dashboard components/pages
│   │   └── user/             # User dashboard components/pages
│   ├── components/           # React components
│   ├── lib/                  # Utility functions and modules
│   │   ├── db/             # Drizzle ORM setup (schema.ts, etc.)
│   │   └── utils.ts          # Utility functions (e.g., for Tailwind CSS)
│   ├── types/                # TypeScript types
│   └── layout.tsx            # Root layout
├── pages/                    # Next.js Pages Router (if used)
│   ├── api/                  # API routes
│   │   └── auth/             # NextAuth API routes
│   ├── dashboard/            # Dashboard pages
│   │   ├── admin/            # Admin dashboard components/pages
│   │   └── user/             # User dashboard components/pages
│   ├── components/           # React components
│   ├── lib/                  # Utility functions and modules
│   │   └── db/             # Drizzle ORM setup (schema.ts, etc.)
│   ├── types/                # TypeScript types
├── public/                   # Static assets (images, etc.)
├── .env.local                # Environment variables (local development)
├── drizzle.config.ts          # Drizzle ORM configuration
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── vercel.json               # Vercel deployment configuration
9. API Endpoints/api/auth/*: NextAuth API endpoints for handling authentication (sign in, sign out, etc.)./api/properties: (Example) API endpoints for managing properties. This might include:GET /api/properties: Get all properties.Response:[
  { id: "1", title: "Property 1", description: "Description 1", price: 100000 },
  { id: "2", title: "Property 2", description: "Description 2", price: 200000 }
]
POST /api/properties: Create a new property (admin only).Request Body:{
  "title": "New Property",
  "description": "New Description",
  "price": 150000
}
Response:{ id: "3", title: "New Property", description: "New Description", price: 150000 }
PUT /api/properties/:id: Update a property (admin only).Request Body:{
  "title": "Updated Property",
  "description": "Updated Description",
  "price": 250000
}
Response:{ id: "1", title: "Updated Property", description: "Updated Description", price: 250000 }
DELETE /api/properties/:id: Delete a property (admin only).Response: {"message": "Property deleted successfully"}You'll define API routes in the pages/api/ directory (or app/api/ with the App Router).  All inputs to these routes should be validated using Zod.10. Code HighlightsDrizzle ORM Schema: The schema.ts file defines your database tables using TypeScript, providing type safety and an intuitive way to interact with your database.NextAuth Configuration: The pages/api/auth/[...nextauth].js file configures NextAuth, integrating it with Drizzle ORM and defining authentication providers.Role-Based Access Control:  Code within your components or API routes checks the user's role (obtained from the NextAuth session) to determine access to specific features or data.Vercel Deployment: The vercel.json file automates the deployment process, ensuring seamless updates when you push changes to your GitHub repository.Zod Validation Example:import { z } from "zod";
const propertySchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
});

// In your API route:
const validatedData = propertySchema.parse(req.body);
// Use validatedData to create/update property in database
NextUI Component Example:import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PropertyCard = ({ property }: { property: any }) => { // Replace 'any' with your actual property type
  return (
    <Card>
      <CardHeader>
        <CardTitle>{property.title}</CardTitle>
        <CardDescription>{property.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{property.description}</p>
        <p>Price: ${property.price}</p>
        <Button>View Details</Button>
      </CardContent>
    </Card>
  );
};
ImageKit Usage:import { Image } from "@nextui-org/image";
// Assumes you have the ImageKit URL endpoint
const imageUrl = `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/your-image-path.jpg`;

const MyComponent = () => {
  return (
    <Image
      src={imageUrl}
      alt="Property Image"
      width={400}  // Example width
      height={300} // Example height
    />
  );
};
11. TroubleshootingDatabase connection errors: Double-check your DATABASE_URL in your .env.local file. Ensure that the URL is correct and that your Neon database is running.Authentication issues: Verify your NextAuth configuration, including the NEXTAUTH_SECRET and provider settings. Check the NextAuth logs for any error messages.Deployment problems: Check your Vercel project dashboard for build and deployment logs. Ensure that your vercel.json file is correctly configured.Migrations errors: If you have any errors related to migrations, ensure that your drizzle.config.ts file is configured correctly and that you have the necessary dependencies installed. You can use drizzle-kit generate to create new migrations and drizzle-kit push to apply them.500 Internal Server Error: Check the server logs for detailed error messages. This could be due to a variety of issues, including database errors, API route errors, or problems with your Next.js code.401 Unauthorized Error: This usually indicates an issue with authentication. Make sure your NextAuth configuration is correct, and that you are checking user roles appropriately in your server-side logic.ImageKit errors:  Check your ImageKit credentials (IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT) in your .env.local file and ensure they are correct.  Also, verify that your images have been uploaded to your ImageKit account.12. Future ImprovementsImplement more robust error handling: Add more detailed error logging and user-friendly error messages.Add more tests: Write unit and integration tests to ensure the application's stability and prevent regressions.Optimize database queries: Analyze database queries and optimize them for performance.Enhance the user interface: Improve the design and user experience of the application.Implement input validation: Add validation for user inputs in both the frontend and backend to prevent data integrity issues.  (Zod is already implemented, ensure it's used consistently)Add features: Implement new features, such as property search, filtering, and user profiles.13. ConclusionThis documentation provides a comprehensive overview of your Next.js project, covering its architecture, technologies, setup, and features. By following this guide, you should be able to understand the project's structure, set up the development environment, and deploy the application successfully. If you have any further questions, feel free to ask.
  @media print {
    .ms-editor-squiggler {
        display:none !important;
    }
  }
  .ms-editor-squiggler {
    all: initial;
    display: block !important;
    height: 0px !important;
    width: 0px !important;
  }

@
