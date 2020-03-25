# Specification


## Registrierung

### Request (Human)
POST https://labshare.de/api/v1/registration?role=human
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
    "description": "",
    "details": {    // information of the registration form (not final yet)
       "rnaExtraction": 29,
       "rtPcr": 0,
       "hoursPerWeek": 20,
    },
    "availability": true,
    "password": ""
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


### Request (Lab)
POST https://labshare.de/api/v1/registration?role=lab

Unique Identifier (a laboratory should only exists once):
* address
* name

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
    "name": "Laborname",
    "description": "",
    "password": ""
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
Basicially the same structure as used for the registration.
But only the following information can be changed.

* Person:
    * Address
    * Description
    * Contact
    * Availability
    * Details
* Lab:
    * Address
    * Contact
    * Name
    * Description
    * Description what the lab can search for
        ```jsonc
        "lookingFor": { // not final yet 
            "humanRessources": true,
            "humanSkills": {
                "rnaExtraction": true,
                "rtPcr": 0,
            },
            "devices": {
                "rnaExtraction": true,
                "TestingKit": true
            },
            "advice": {
                "rnaExtraction": true,
                "testingKit": true,
                "dataEvaluation": true
            }
        }
        ```



## Search (not final, depends on registration form)
GET https://labshare.de/api/v1/search?role="human|lab"&search_type="equipment|human_ressources|advice"&filter=""&page=2

### Get Parameter
* `type`
    * Required: True
    * `human|lab`    
* `search_type`
    * `equipment|human_ressources|advice`
* `page`
    * Default : 1
*  `filter`
    * colon seperated list of filter
    * human_ressources: keine filter
    * device: rnaextraction,testkitrna,testkitrtpcr,rtpcr
    * advice: devicerna,devicertpcr,testkitrna,testkitrtpcr,primerdesign,dataevaluationrtpcr
*   `rtpcr_mincapacity`, `rtpcr_maxcapacity`
    * Zahl


* filter and page are optional
* Humans can search for labs and equipment (maybe they have access to equipment)
* Labs can search for:
    * Equipment
    * Humans

### Response
Basicially the same structure as used for the registration.
* Person:
    * location
    * address
    * description
    * contact
    * availability

```jsonc
{
    "_embedded": [
        {
            "data": {
                "location": {
                    "type": "Point",
                    "coordinates": [10.111, 10.2234] // longitude, latitude
                },
                "address": {
                    "city": "", // ^[A-Za-z -]+$
                    "zipcode": "58455", // ^[0-9]{5}$
                    "street": "" // ^[A-Za-z -.0-9]+$, nur bei Laboren vorhanden
                },
                "contact": {
                    "firstname": "",
                    "lastname": "",
                    "email": "",
                    "phone": ""
                },
                "name": "Laborname",
                "description": "",
            },
            "distance": "12km",
            
        }
    ],
    "_links": {
        "next": "https://labshare.de/api/v1/search?...&page=3"
    }
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

