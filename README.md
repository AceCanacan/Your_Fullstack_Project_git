# Name of the system

**Shopping Cart**

## System Description

A web-based shopping cart interface that allows users to add items, view their cart, and complete a checkout process.

The application allows users to manage a list of items. Users can:

- **Get List**: View all items stored in the database.
- **Create**: Add a new item.
- **Read**: View details of a specific item.
- **Update**: Modify details of an existing item.
- **Delete**: Remove an item from the database.

This system serves as a foundational example of a CRUD application, which can be extended to various use cases such as:

- News Page App
- Simple E-Commerce Platform
- Employee Management System
- Inventory Management System

## Database Structure

The application uses a SQLite database with the following structure:

- **Table Name**: `items`

| Column Name | Data Type | Description             |
|-------------|-----------|-------------------------|
| id          | Integer   | Primary key             |
| name        | Text      | Name of the item        |
| description | Text      | Description of the item |
| created_at  | DateTime  | Timestamp of creation   |
| updated_at  | DateTime  | Timestamp of last update|

## Developer Information

- **Ace Canacan** - [GitHub](https://github.com/AceCanacan)
- **Hidemi Kogachi** - [GitHub](https://github.com/hidemiii)
- **Paulo Urquia** - [GitHub](https://github.com/tuxedocar)
- **Francis De Jesus** - [GitHub](https://github.com/FrancisDeJesus)
