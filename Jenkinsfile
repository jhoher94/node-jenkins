pipeline {
    agent any

    stages{
        stage('Clonar el Repositorio'){
            steps {
                git branch: 'main', credentialsId: 'git-jenkins', url:'https://github.com/jhoher94/node-jenkins.git'
            }
        }
        stage('Construir imagen de Docker'){
            steps {
                withcredentials([
                    string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                ]) {
                    docker.build('desacople-api-proyecto:v1', '--build-arg MONGO_URI=${MONGO_URI} .')
                }
                
            }
        }
        stage('Desplegar contenedores Docker'){
            steps {
                script {
                    withcredentials([
                        string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                    ]) {
                        sh  """
                            sed '${MONGO_URI}|${MONGO_URI}' docker-compose.yml > docker-compose-update.yml
                            docker-compose -f docker-compose-update.yml up -d
                        """
                    }
             }
        }
    }
}