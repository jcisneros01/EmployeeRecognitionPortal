# EmployeeRecognitionPortal

## Users API Documentation

- todo: Update Base URL upon hosting

Base URL: https://localhost:5001/

### Create a New User

Adds a new User to the database.

**Call:** *POST /Users*

**Parameters:**
- “email”: String - email address of user
- “password”: String - password for login
- “name”: “String - User’s name
- “signature”: Byte[] - encoded IMG file representation

**Response:**
Status: 200 OK

```
{
    "id": 1,
    “email” : “someone@somewhere.com”,
    “password”: “password”,
    “name”: “John Doe”,
    “signature”: “/9j/4AA…HSElKU1RVVldYWV”
}
```

### List All Users

Lists all Users currently in the database.

**Call:** *GET /Users*

**Parameters:**

**Response:**  
Status: 200 OK

```
[                
  {
    "id": 1,
    “email” : “someone@somewhere.com”,
    “password”: “password”,
    “name”: “John Doe”,
    “signature”: “/9j/4AA…HSElKU1RVVldYWV”
  },
  {
    "id": 2,
    “email” : “someone2@somewhere.com”,
    “password”: “password2”,
    “name”: “Jane Doe”,
    “signature”: “lKU1…HSElKUfdjlldYWV”
  },    
    ...        
]
```

### List Single User

Lists data for a single User currently in the database.

**Call:** *GET /Users/{id}*

**Parameters:**

**Response:**
Status: 200 OK

```
{
  "id": 1,
  “email” : “someone@somewhere.com”,
  “password”: “password”,
  “name”: “John Doe”,
  “signature”: “/9j/4AA…HSElKU1RVVldYWV”
}
```

### Update User

Edit a User in the database

**Call:** *PUT /Users/{id}*

**Parameters:**
- “email”: String - email address of user
- “password”: String - password for login
- “name”: “String - User’s name
- “signature”: Byte[] - encoded IMG file representation

**Response:**
Status: 200 OK

```
{
    "id": 1,
    “email” : “someone@somewhere.com”,
    “password”: “password”,
    “name”: “John Doe”,
    “signature”: “/9j/4AA…HSElKU1RVVldYWV”
}
```

### Delete a User

Removes a User from the database

**Call:** *DELETE /Users/{id}*

**Parameters:**

**Response:**
Status: 200 OK

### Create a token

Authorizes the user and retrieves a token

**Call:** *Post /auth/token*

**Parameters:**
- “email”: String - email address of user
- “password”: String - password for login

**Response:**  
Status: 200 OK

```             
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDg3MTgwMjksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCJ9.KJefXEk4ACUcoNUULSV1O-IsF6lKGsmXbH3t1Qf6C-s"
}
```
**Token Usage:**  
```             
Set Authorization in Header
Authorization: Bearer [token]
```