pipeline {
    agent any

    stages {
        stage('Build'){
            environment {
//                 DATABASE_PASSWORD = credentials('IVENT_DATABASE_PASSWORD')
//                 DATABASE_USERNAME = credentials('INVE_DATABASE_USERNAME')
//                 DATABASE_NAME = credentials('INVE_DATABASE_NAME')
//                 DATABASE_PORT = credentials('INVE_DATABASE_PORT')
//                 DATABASE_HOSTNAME = credentials('INVE_DATABASE_HOSTNAME')
//                 PGADMIN_EMAIL = credentials('INVE_PGADMIN_EMAIL')
//                 PGADMIN_PASSWORD = credentials('INVE_PGADMIN_PASSWORD')
//                 REACT_APP_BACKEND_URL = credentials('REACT_APP_BACKEND_URL')

                 DATABASE_PASSWORD = test
                 DATABASE_USERNAME = test
                 DATABASE_NAME = test
                 DATABASE_PORT = 5433
                 DATABASE_HOSTNAME = postgres-db
                 PGADMIN_EMAIL = test@emai.com
                 PGADMIN_PASSWORD = test
                 REACT_APP_BACKEND_URL = http:localhost:8000
            }
            steps {
                sh 'sudo docker-compose -f docker-compose-prod.yml up -d --build'
            }
        }

        stage('Clear Containers') {
            steps {
                sh 'sudo docker rmi $(sudo docker images -f "dangling=true" -q) &>/dev/null'
            }
        }
    }
}