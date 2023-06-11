pipeline {
    agent any

    stages {
        stage('Build'){
            environment {
                DATABASE_PASSWORD = credentials('IVENT_DATABASE_PASSWORD')
                DATABASE_USERNAME = credentials('INVE_DATABASE_USERNAME')
                DATABASE_NAME = credentials('INVE_DATABASE_NAME')
                DATABASE_PORT = credentials('INVE_DATABASE_PORT')
                DATABASE_HOSTNAME = credentials('INVE_DATABASE_HOSTNAME')
                PGADMIN_EMAIL = credentials('INVE_PGADMIN_EMAIL')
                PGADMIN_PASSWORD = credentials('INVE_PGADMIN_PASSWORD')
                BACKEND_URL = credentials('BACKEND_URL')
            }
            steps {
                sh 'docker-compose -f docker-compose-prod.yml up -d --build'
            }
        }

        stage('Clear') {
            steps {
                sh 'docker rmi $(sudo docker images -f "dangling=true" -q) &>/dev/null'
//                 sh 'sudo rm -rf /var/www/inventory.vitaliisili.com'
//                 sh 'sudo cp -r ${WORKSPACE}/app-ui/build/ /var/www/inventory.vitaliisili.com'
            }
        }
    }
}