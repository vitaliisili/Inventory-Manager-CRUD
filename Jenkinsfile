pipeline {
    agent any
    options {
        skipDefaultCheckout(true)
    }
    stages {
        stage('Clean workspace'){
            steps {
                cleanWs()
            }
        }

        stage('Checkout'){
            steps {
                checkout scm
                echo "Building ${env.JOB_NAME}..."
            }
        }

        stage('Build'){
            environment {
                DATABASE_PASSWORD = credentials('INV_POSTGRES_PASSWORD')
                DATABASE_USERNAME = credentials('INV_POSTGRES_USERNAME')
                DATABASE_NAME = credentials('INV_POSTGRES_DATABASE_NAME')
                DATABASE_PORT = '5432'
                DATABASE_PORT_T = '5444'
                DATABASE_HOSTNAME = credentials('INV_DATABASE_HOSTNAME')
                PGADMIN_EMAIL = credentials('INV_PGADMIN_EMAIL')
                PGADMIN_PASSWORD = credentials('INV_PGADMIN_PASSWORD')
                REACT_APP_BACKEND_URL = 'https://inventoryapi.vitaliisili.com'
            }
            steps {
                sh 'echo DATABASE_PORT=$DATABASE_PORT > .env'
                sh 'echo DATABASE_PORT_TEST=$DATABASE_PORT_T >> .env'
                sh 'echo DATABASE_USERNAME=$DATABASE_USERNAME >> .env'
                sh 'echo DATABASE_NAME=$DATABASE_NAME >> .env'
                sh 'echo DATABASE_PASSWORD=$DATABASE_PASSWORD >> .env'
                sh 'echo DATABASE_HOSTNAME=$DATABASE_HOSTNAME >> .env'
                sh 'echo PGADMIN_EMAIL=$PGADMIN_EMAIL >> .env'
                sh 'echo PGADMIN_PASSWORD=$PGADMIN_PASSWORD >> .env'
                sh 'echo REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL >> .env'
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