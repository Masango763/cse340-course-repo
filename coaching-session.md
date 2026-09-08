# W02 Coaching Session: Database Retrieval

## 1. Relational Database Design and Structure

### Purpose & Relationships
The database schema uses three main tables to manage community initiatives: organization, category, and project.
- organization: Stores details about partner entities hosting projects.
- category: Stores classification groups for service areas (e.g., Education, Healthcare, Environment).
- project: Represents individual community efforts.

To maintain referential integrity, project serves as the child table containing foreign keys category_id and organization_id. Both foreign keys enforce ON DELETE CASCADE, ensuring that deleting an organization or category automatically cleans up orphaned project records.

### SQL Snippet (src/setup.sql)
```sql
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    category_description TEXT
);

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(100) NOT NULL,
    organization_email VARCHAR(100),
    organization_website VARCHAR(150),
    organization_description TEXT
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(100) NOT NULL,
    project_description TEXT NOT NULL,
    location VARCHAR(100) NOT NULL DEFAULT 'Harare',
    project_date DATE NOT NULL DEFAULT CURRENT_DATE,
    category_id INT REFERENCES category(category_id) ON DELETE CASCADE,
    organization_id INT REFERENCES organization(organization_id) ON DELETE CASCADE
);
```

---

## 2. Server-Side Data Access Logic (Node.js)

### Data Retrieval Flow
Data access logic is isolated inside specialized model modules using PostgreSQL connection pooling (pg). The getAllCategories function asynchronously executes an SQL query (SELECT * FROM category ORDER BY category_name ASC) against the pool. The returned promise resolves to a result object, from which data.rows is extracted and returned to the caller. A try...catch block ensures database errors are caught gracefully.

### Model Snippet (src/models/categories.js)
```javascript
import db from '../database/index.js';

export async function getAllCategories() {
  try {
    const data = await db.query('SELECT * FROM category ORDER BY category_name ASC');
    return data.rows;
  } catch (error) {
    console.error('Error in getAllCategories:', error);
    return [];
  }
}
```

---

## 3. Express Server Logic and Routing

### Route Handler Role & Path Mapping
Express acts as the controller layer, mapping incoming HTTP GET requests to handler functions. When a user navigates to /categories, the controller executes the asynchronous model call getAllCategories(). Upon receiving the raw category data array, res.render() passes this payload to the EJS engine along with the target view name.

### Express Controller & Route Snippet
```javascript
import { getAllCategories } from '../models/categories.js';

export async function getCategoriesPage(req, res) {
  try {
    const categories = await getAllCategories();
    res.render('categories', { 
      title: 'Categories', 
      categories 
    });
  } catch (error) {
    res.status(500).send('Server Error loading categories');
  }
}
```

---

## 4. Client-Side Rendering (EJS Templates)

### EJS Data Flow & Dynamic Rendering
EJS receives the variable payload { categories } passed by Express and dynamically interpolates database data into the DOM structure before sending HTML back to the client. Control flow tags <% %> evaluate loops and conditional checks (e.g., checking if categories exist), while escaped tags <%= %> safely output string variables, protecting against cross-site scripting (XSS).

### EJS Template Snippet (src/views/categories.ejs)
```html
<%- include('partials/header') %>

<main class=content-container>
    <h1 class=page-title>Service Project Categories</h1>

    <ul class=category-list>
        <% if (categories && categories.length > 0) { %>
            <% categories.forEach(category => { %>
                <li class=category-card>
                    <h2><%= category.category_name %></h2>
                    <% if (category.category_description) { %>
                        <p><%= category.category_description %></p>
                    <% } %>
                </li>
            <% }) %>
        <% } else { %>
            <li>No categories found.</li>
        <% } %>
    </ul>
</main>

<%- include('partials/footer') %>
```
