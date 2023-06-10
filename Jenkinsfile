pipeline {
    agent any

    stages {
        stage('Build_React_App'){
            environment {
                DATABASE_PASSWORD = credentials('DATABASE_PASSWORD')

            }
            steps {
                sh docker-compose -f docker-compose-dev.yml -d --build
            }
        }

        stage('Deploy_React_App') {
            steps {
                sh 'echo pass'
//                 sh 'sudo rm -rf /var/www/inventory.vitaliisili.com'
//                 sh 'sudo cp -r ${WORKSPACE}/app-ui/build/ /var/www/inventory.vitaliisili.com'
            }
        }

        stage('Build FastApi Docker Image') {
            steps {
                sh 'echo docker --version'
            }
        }
    }
}