pipeline {
    agent any

    stages {
        stage('Build_React_App'){
            steps {
//                 sh 'ls -a'
//                 sh 'cd app-ui'
//                 sh 'ls -a'
                sh 'npm install --prefix ./app-ui'
                sh 'npm --prefix ./app-ui run build'
            }
        }

        stage('Deploy_React_App') {
            steps {
                sh 'sudo rm -rf /var/www/inventory.vitaliisili.com'
                sh 'sudo cp -r ${WORKSPACE}/app-ui/build/ /var/www/inventory.vitaliisili.com'
            }
        }

        stage('Build FastApi Docker Image') {
            steps {
                sh 'echo docker --version'
            }
        }
    }
}