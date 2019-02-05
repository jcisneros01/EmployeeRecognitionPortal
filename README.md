Employee Recognition Portal - By Team Fulu
======================

# Table of Contents

- [API Calls](#api-calls)
    - [Users](#users-api)
    - [Auth](#auth-api)
    - [Admins](#admins-api)
    - [Employee of the Year](#employee-of-the-year-api)
    - [Employee of the Month](#employee-of-the-month-api)



## API Calls

todo: Update Base URL upon hosting

Base URL: https://localhost:5001/

## Users API

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
    “password”: “hAsHeDpAsSwOrD”,
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
    “password”: “hAsHeDpAsSwOrD”,
    “name”: “John Doe”,
    “signature”: “/9j/4AA…HSElKU1RVVldYWV”
  },
  {
    "id": 2,
    “email” : “someone2@somewhere.com”,
    “password”: “hAsHeDpAsSwOrD”,
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
  “password”: “hAsHeDpAsSwOrD”,
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
    “password”: “hAsHeDpAsSwOrD”,
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

## Auth API

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

## Admins API

### Create a New Admin

Adds a new Admin to the database.

**Call:** *POST /Admins*

**Parameters:**
- “email”: String - email address of admin
- “password”: String - password for login

**Response:**
Status: 200 OK

```
{
    "id": 1,
    “email” : “someone@somewhere.com”,
    “password”: “hAsHeDpAsSwOrD”
}
```

### List All Admins

Lists all Admins currently in the database.

**Call:** *GET /Admins*

**Parameters:**

**Response:**  
Status: 200 OK

```
[                
  {
    "id": 1,
    “email” : “someone@somewhere.com”,
    “password”: “hAsHeDpAsSwOrD”
  },
  {
    "id": 2,
    “email” : “someone2@somewhere.com”,
    “password”: “hAsHeDpAsSwOrD”
  },    
    ...        
]
```

### List Single Admin

Lists data for a single Admin currently in the database.

**Call:** *GET /Admins/{id}*

**Parameters:**

**Response:**
Status: 200 OK

```
{
  "id": 1,
  “email” : “someone@somewhere.com”,
  “password”: “hAsHeDpAsSwOrD”
}
```

### Update Admin

Edit a Admin in the database

**Call:** *PUT /Admins/{id}*

**Parameters:**
- “email”: String - email address of Admin
- “password”: String - password for login
- “name”: “String - Admin’s name
- “signature”: Byte[] - encoded IMG file representation

**Response:**
Status: 200 OK

```
{
    "id": 1,
    “email” : “someone@somewhere.com”,
    “password”: “hAsHeDpAsSwOrD”
}
```

### Delete Admin

Removes Admin from the database

**Call:** *DELETE /Admins/{id}*

**Parameters:**

**Response:**
Status: 200 OK

## Employee of the Year API

### Create a New EOY Award

Adds a new EOY to the database.

**Call:** *POST /EmpOfYear*

**Parameters:**
- "employeeName": String - employee receiving award name
- "employeeEmail": String - employee receiving award email
- "dateAwarded" : DateTime - date employee receives award
- "awardCreatorId" : Int - UserId of User who created award

**Response:**
Status: 200 OK

```
{
    "id": 1,
    "employeeName": "Joe Schmoe",
    "employeeEmail": "schmojo@oregonstate.edu",
    "dateAwarded": "2018-04-02T17:15:45",
    "awardCreatorId": 5,
    "laTexFile": "%========import ...            \\end{document}"
}
```

### List All EOY Awards

Lists all EOYs currently in the database.

**Call:** *GET /EmpOfYear*

**Parameters:**

**Response:**  
Status: 200 OK

```
[                
{
    "id": 1,
    "employeeName": "Joe Schmoe",
    "employeeEmail": "schmojo@oregonstate.edu",
    "dateAwarded": "2018-04-02T17:15:45",
    "awardCreatorId": 5,
    "laTexFile": "%========import ...            \\end{document}"
},
{
    "id": 2,
    "employeeName": "Gary Gergich",
    "employeeEmail": "gergiga@oregonstate.edu",
    "dateAwarded": "2018-04-02T17:15:45",
    "awardCreatorId": 3,
    "laTexFile": "%========import ...            \\end{document}"
},    
    ...        
]
```

### List Single EOY

Lists data for a single EOY currently in the database.

**Call:** *GET /EmpOfYear/{id}*

**Parameters:**

**Response:**
Status: 200 OK

```
{
    "id": 1,
    "employeeName": "Joe Schmoe",
    "employeeEmail": "schmojo@oregonstate.edu",
    "dateAwarded": "2018-04-02T17:15:45",
    "awardCreatorId": 5,
    "laTexFile": "%========import ...            \\end{document}"
}
```

### Delete EOY

Removes EOY from the database

**Call:** *DELETE /EmpOfYear/{id}*

**Parameters:**

**Response:**
Status: 200 OK

## Employee of the Month API

### Create a New EOM Award

Adds a new EOM to the database.

**Call:** *POST /EmpOfMonth*

**Parameters:**
- "employeeName": String - employee receiving award name
- "employeeEmail": String - employee receiving award email
- "dateAwarded" : DateTime - date employee receives award
- "awardCreatorId" : Int - UserId of User who created award

**Response:**
Status: 200 OK

```
{
    "id": 1,
    "employeeName": "Joe Schmoe",
    "employeeEmail": "schmojo@oregonstate.edu",
    "dateAwarded": "2018-04-02T17:15:45",
    "awardCreatorId": 5,
    "laTexFile": "%========import ...            \\end{document}"
}
```

### List All EOM Awards

Lists all EOMs currently in the database.

**Call:** *GET /EmpOfMonth*

**Parameters:**

**Response:**  
Status: 200 OK

```
[                
{
    "id": 1,
    "employeeName": "Joe Schmoe",
    "employeeEmail": "schmojo@oregonstate.edu",
    "dateAwarded": "2018-04-02T17:15:45",
    "awardCreatorId": 5,
    "laTexFile": "%========import ...            \\end{document}"
},
{
    "id": 2,
    "employeeName": "Gary Gergich",
    "employeeEmail": "gergiga@oregonstate.edu",
    "dateAwarded": "2018-04-02T17:15:45",
    "awardCreatorId": 3,
    "laTexFile": "%========import ...            \\end{document}"
},    
    ...        
]
```

### List Single EOM

Lists data for a single EOM currently in the database.

**Call:** *GET /EmpOfMonth/{id}*

**Parameters:**

**Response:**
Status: 200 OK

```
{
    "id": 1,
    "employeeName": "Joe Schmoe",
    "employeeEmail": "schmojo@oregonstate.edu",
    "dateAwarded": "2018-04-02T17:15:45",
    "awardCreatorId": 5,
    "laTexFile": "%========import ...            \\end{document}"
}
```

### Delete EOM

Removes EOM from the database

**Call:** *DELETE /EmpOfMonth/{id}*

**Parameters:**

**Response:**
Status: 200 OK
