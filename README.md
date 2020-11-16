# LabHive
Increasing test capacity is crucial in the fight against SARS-CoV-2, but many places lack reagents, equipment, and personnel.

LabHive is a digital platform that promotes the development of a strong diagnostic network and facilitates efficient access to resources for diagnostic centers.

We bring together:
- **Qualified volunteers** with training and experience,
- **Diagnostic centers** currently offering SARS-CoV-2 tests, and
- **Research laboratories** with access to reagents, devices, or suitable lab space

Together we unleash the united power of science!

LabHive comprises an interdisciplinary team of scientists, software developers, and data protection experts. The idea for the platform originally emerged from two projects of the #WirVsVirus Hackathon of the German government. Both teams have volunteered their efforts to this initiative, and they have joined forces to help increase test capacity.

What we are currently looking for are:
* Backend developers (Typescript, MongoDB, express)
* Frontend developers (VueJS, bootstrap-vue)
* DevOps experts that have some know-how in operating production applications

Join us on our way to align efforts for more SARS-CoV-2 tests.

_Spread the Test, Beat the Virus!_


## Setup dev environment
* **Requirements:**
    * Docker
    * NodeJS, npm

1. Run `./SetupDevEnv.sh`
1. Start the database
    ```bash
    docker-compose -f docker-compose-mongodb.yml up -d
    ```
1. Start the backend
    ```bash
    npm run backend
    ```
1. Start the frontend
    ```bash
    npm run serve
    ```
1. Following endpoints should be available now:
    * Working application [http://localhost:8080](http://localhost:8080)
    * Backend (RestAPI) [http://localhost:5000](http://localhost:5000)
    * MongoDB [mongodb://localhost:27017](http://localhost:27017)
    * Mongo Express [http://localhost:8081](http://localhost:8081)
