pipeline {
    agent any

    stages {
        stage('Build'){
            environment {
                DATABASE_PASSWORD = credentials('INV_POSTGRES_PASSWORD')
                DATABASE_USERNAME = credentials('INV_POSTGRES_USERNAME')
                DATABASE_NAME = credentials('INV_POSTGRES_DATABASE_NAME')
                DATABASE_PORT = '5433'
                DATABASE_HOSTNAME = 'postgres-db'
                PGADMIN_EMAIL = credentials('INV_PGADMIN_EMAIL')
                PGADMIN_PASSWORD = credentials('INV_PGADMIN_PASSWORD')
                REACT_APP_BACKEND_URL = 'http:localhost:8000'
            }
            steps {
                sh 'echo "DATABASE_PASSWORD=${credentials('INV_POSTGRES_PASSWORD')}" > .env'
                sh 'cat .env'
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