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
    "firstname": "", // ^[A-Za-zäöüÄÖÜß -.]+$
    "lastname": "",  // ^[A-Za-zäöüÄÖÜß -.]+$
    "contact": {
        "email": "",     // ^[A-Za-z.@]+$
        "phone": "", // ^[0-9+]+$
    },
    "description": "",
    "details": {
       "RNA-Extraction": 29,
       "RT-PCR": 0,
       "hoursPerWeek": 20,
    },
    "available": true,
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


### Request (Lab)
POST https://labshare.de/api/v1/registration?role=lab

Unique Identifier (kein Labor kann sich 2x registrieren):
* address
* name

```jsonc
{
    "address": {
        "city": "", // ^[A-Za-z -]+$
        "zipcode": "58455", // ^[0-9]{5}$
        "street": "" // ^[A-Za-z -.0-9]+$, nur für Labore!! (Datensparsamkeit)
    },
    "labContact": {
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





## Passwort vergessen
### Request
POST https://labshare.de/api/v1/forgot-password

Verschickt eine Mail mit Link auf Passwort neu setzen

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

Liefert folgende Infos in gleicher Struktur wie bei der Registrierung, die editiert werden können:
* Person:
    * Location
    * Description
    * Contact
    * Available
    * Details
* Lab:
    * Location
    * LabContact
    * Name
    * Description
    * Bedarfsanfrage erstellen/löschen etc.
        ```jsonc
        "lookingFor": {
            "humanRessources": true,
            "devices": {
                "RNA-Exctraction": true,
                "TestingKit": true
            },
            "advice": {
                "RNA-Exctraction": true,
                "testingKit": true,
                "dataEvaluation": true
            }
        }
        ```

### POST Request
Gleiche Struktur wie bei Registrierung

### DELETE Request
Kein Body, Standard Response




## Search
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
    * Kommaseperierte Liste, mögliche Werte abhängig von search_type
    * human_ressources: keine filter
    * device: rnaextraction,testkitrna,testkitrtpcr,rtpcr
    * advice: devicerna,devicertpcr,testkitrna,testkitrtpcr,primerdesign,dataevaluationrtpcr
*   `rtpcr_mincapacity`, `rtpcr_maxcapacity`
    * Zahl


* filter und page sind optional
* Menschen können nach Labore und nach Equipment suchen
* Labore können:
    * Equipment suchen
    * Menschen suchen

### Response
Liefert folgende Infos in gleicher Struktur wie bei der Registrierung, die editiert werden können:
* Person:
    * Location
    * Description
    * Contact
    * Available

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
                "labContact": {
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
        "next": "https://labshare.de/api/v1/search?filter1=""&filter2=true&filter3=21&page=3"
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

