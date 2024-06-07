# task-management-system for Marketing Team

Welcome to the Task Management System designed for the marketing team at our fast-growing startup. This system provides an intuitive and efficient solution to manage the marketing team's workload transparently.



## -------------------------------------Installation Guid of project-------------------------------------

### Prerequisites
- Node.js and npm installed on your machine
(node version : v18.17.1)

- Java Development Kit (JDK) installed
(
java version "17.0.6" 2023-01-17 LTS
Java(TM) SE Runtime Environment (build 17.0.6+9-LTS-190)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.6+9-LTS-190, mixed mode, sharing)

)
- MySQL database server running locally or accessible via network connection
(Server version: 5.5.50 MySQL Community Server (GPL))



### Project Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/KasunNiluminda/task-management-system.git


### Database Setup
-Create a MySQL database named "tms_db".

-Update the database configuration in backend/src/main/resources/application.properties with your MySQL credentials.

        spring.datasource.username=root
        spring.datasource.password=123

      change above in "application.properties" file according your details.  

-The application will automatically create the necessary tables upon startup.


### Baclkend Setup

 2. Navigate to the backend directory:
        cd task-management-system/backend
        install dependencies
        Start the Spring Boot application


        OR

        Open Project from Intelij IDEA tool.
        Run Project(Using Main methos or Run button)

   3.The backend server should now be running at http://localhost:8080     
   


### Frontend  Setup

1. Navigate to the frontend directory:

for Exmpale - 
 C:\My_files\React_Springboot_web\task-management-system\frontend> 

 2. Install dependencies:
        npm install

for Exmpale - 
  C:\My_files\React_Springboot_web\task-management-system\frontend> npm install

3. Start the React development server:
        npm start

for Exmpale - 
  C:\My_files\React_Springboot_web\task-management-system\frontend>  npm start


4. The frontend application should now be running at http://localhost:3000



