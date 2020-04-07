# Specification


## Registrierung

### Request (volunteer)
POST https://labshare.de/api/v1/registration?role=volunteer
```jsonc
{
    "address": {
        "city": "", // ^[A-Za-zäöüÄÖÜß -]+$
        "zipcode": "58455", // ^[0-9]{5}$
    },
    "contact": {
        "email": "",     // ^[A-Za-z.@]+$
        "phone": "",     // ^[0-9+]+$
        "firstname": "", // ^[A-Za-zäöüÄÖÜß -.]+$
        "lastname": "",  // ^[A-Za-zäöüÄÖÜß -.]+$
    },
    "details": {    // information of the registration form (not final yet)
       "skills": [
           "abc",
           "def"
       ]
    },
    "availability": true,
    "password": "",
    "description": "",
    "organization": "",
    "website": "",
    "consent": {
        "processing": true,
        "publicContact": true,
    }
}
```

### Response (General response format)
```jsonc
{
    "success": true
}
```

```jsonc
{
    "success": false,
    "errorDescription": ""
}
```


### Request (Diagnostic Lab)
POST https://labshare.de/api/v1/registration?role=lab_diag


```jsonc
{
    "address": {
        "city": "", // ^[A-Za-z -]+$
        "zipcode": "58455", // ^[0-9]{5}$
        "street": "" // ^[A-Za-z -.0-9]+$, nur für Labore!! (Datensparsamkeit)
    },
    "contact": {
        "firstname": "",
        "lastname": "",
        "email": "",
        "phone": ""
    },
    "organization": "Laborname",
    "website": "",
    "description": "",
    "password": "",
    "consent": {
        "processing": true,
        "publicContact": true,
    },
    "lookingFor": {
        "volunteerSkills": ["..."], // tbd
        "equipment": ["..."], // tbd
        "advice": ["..."], // tbd
        "equipmentDescription": "",
        "adviceDescription": ""
    },
    "offers": {
        "equipment": ["..."], // tbd
        "advice": ["..."], // tbd
        "equipmentDescription": "",
        "adviceDescription": ""
    }
}
```

### Request (Research Lab)
POST https://labshare.de/api/v1/registration?role=lab_research


```jsonc
{
    "address": {
        "city": "", // ^[A-Za-z -]+$
        "zipcode": "58455", // ^[0-9]{5}$
        "street": "" // ^[A-Za-z -.0-9]+$, nur für Labore!! (Datensparsamkeit)
    },
    "contact": {
        "firstname": "",
        "lastname": "",
        "email": "",
        "phone": ""
    },
    "organization": "Laborname",
    "website": "",
    "description": "",
    "password": "",
    "consent": {
        "processing": true,
        "publicContact": true,
    },
    "offers": {
        "equipment": ["..."], // tbd
        "advice": ["..."], // tbd
        "equipmentDescription": "",
        "adviceDescription": ""
    }
}
```

### Response
```jsonc
{
    "success": true
}
```

```jsonc
{
    "success": false,
    "errorDescription": ""
}
```





## Passwort vergessen/ändern
### Request
POST https://labshare.de/api/v1/forgot-password

Verschickt eine Mail mit Link, der einen Token beinhaltet

```jsonc
{
    "email": ""
}
```

### Request
POST https://labshare.de/api/v1/reset-password?token=token

```jsonc
{
    "newPassword": ""
}
```

### Request
POST https://labshare.de/api/v1/change-password
```jsonc
{
    "oldPassword": "",
    "newPassword": ""
}
```



## User management
GET https://labshare.de/api/v1/profile
POST https://labshare.de/api/v1/profile
DELETE https://labshare.de/api/v1/profile

### GET Request
Returns all information about a profile

### DELETE Request
No body, default response

### POST Request
Same request structure as used for the registration. Not every property of the top level object has to be send.
ALL information must be updateable!! (GDPR)


## Search (not final, depends on registration form)
GET https://labshare.de/api/v1/search

### Get Parameter
* `role`
    * Required: True
    * What type are you searching for?
    * `volunteer|lab_research|lab_diag`
* `zipcode`
    * if unauthenticated, required
    * else optional, uses contact address zipcode as default
* `page`
    * Default: 1
* `volunteerSkills`
    * array of strings (`http://...?paramName[]=a&paramName[]=b`)
* `equipment`
    * array of strings
* `advice`
    * array of string


* `volunteerSkills`, `equipment`, `advice` are optional
* Everyone can search for labs and filter for equipment and advice (in case they have access to equipment)
* Labs can search for:
    * Equipment
    * Humans
    * Advice

### Response
Basically the same structure as used for the registration.
* Person:
    * location
    * address
    * description
    * contact
    * availability

* Contact details are only disclosed to signed in users
* Conact details of volunteers are never disclosed to other volunteers, only to labs and if `volunteer.consent.publicContact == true`
* Users (labs and volunteers) who have `volunteer.consent.processing == false` are never visible in search results

```jsonc
{
    "_embedded": [
        {
            "location": {
                "type": "Point",
                "coordinates": [10.111, 10.2234] // longitude, latitude
            },
            "address": {
                "city": "", // ^[A-Za-z -]+$
                "zipcode": "58455", // ^[0-9]{5}$
                "street": "" // ^[A-Za-z -.0-9]+$, only for labs
            },
            "contact": { // only returned for signed in users
                "firstname": "",
                "lastname": "",
                "email": "",
                "phone": ""
            },
            "name": "Laborname", // when searching for labs
            "description": "",
            "distance": "12km",
            "availability": true, // when searching for volunteers
            "details": { // when searching for volunteers
                "skills": []
            },
            "lookingFor": { // when searching for diagnostic labs
                "volunteerSkills": [],
                "advice": [],
                "equipment": []
            },
            "offers": { // when searching for research labs
                "advice": [],
                "equipment": []
            }
        },
    ],
    "_links": {
        "next": "https://labshare.de/api/v1/search?...&page=3",
        "previous": null
    },
    "totalPages": 3,
    "success": true
}
```

## Session Management
### Session token

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.` (HEADER)  
`eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.` (Payload)  
`SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c` (HMAC über den Payload)

#### Header
```jsonc
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### Payload: 
```jsonc
{
  "sub": "1234567890", // ID
  "iat": 1516239022,
  "name": "email",
  "role": "lab|human"
}
```

### Login
#### Request
POST https://labshare.de/api/v1/login

```jsonc
{
    "email": "",
    "password": ""
}

```

#### Response
```jsonc
{
    "success": true,
    "sessionToken": "JWT (s. unten)"
}
```

```jsonc
{
    "success": false,
    "errorDescription": ""
}
```

