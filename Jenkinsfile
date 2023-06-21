pipeline {
    agent any

    stages {
        stage('Build'){
            environment {
                DATABASE_PASSWORD = 'test'
                DATABASE_USERNAME = credentials('INV_POSTGRES_USERNAME')
                DATABASE_NAME = 'test'
                DATABASE_PORT = '5433'
                DATABASE_HOSTNAME = 'postgres-db'
                PGADMIN_EMAIL = 'test@emai.com'
                PGADMIN_PASSWORD = 'test'
                REACT_APP_BACKEND_URL = 'http:localhost:8000'
            }
            steps {
                sh "env | sort"
//                 sh 'sudo docker-compose -f docker-compose-prod.yml up -d --build'
            }
        }

//         stage('Clear Containers') {
//             steps {
//                 echo "${env.DATABASE_NAME}"
//                 sh 'sudo docker rmi $(sudo docker images -f "dangling=true" -q) &>/dev/null'
//             }
//         }
    }
}