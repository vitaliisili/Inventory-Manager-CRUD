pipeline {
    agent any

    stages {
        stage('Build_React_App')
            steps {
                sh 'cd app-ui'
                sh 'npm install'
                sh 'npm run build'
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