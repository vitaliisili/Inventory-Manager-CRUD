pipeline {
    agent any

    stages {
        stage('Build_React_App')
            steps {
                sh 'cd app-ui'
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}