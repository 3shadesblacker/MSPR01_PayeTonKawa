pipeline {
  agent any

  stages {
    stage('Clean Workspace') {
      steps{
        cleanWs()
      }
    }
    stage("Checkout SCM"){
      steps{
        checkout([
          $class: "GitSCM",
          branches: [[name: "cicd"]],
          doGenerateSubmoduleConfigurations: false,
          extensions: [],
          submoduleCfg: [],
          userRemoteConfigs: [[
            credentialsId: "Github",
            url: "https://github.com/3shadesblacker/MSPR01_PayeTonKawa.git"
          ]]
        ])
      }
    }
    stage("Sonarqube"){
      steps{
        script{
          // def scannerHome = tool 'sonarscan';
           withSonarQubeEnv('SonarQubeScanner'){
            sh "${tool("sonarscan")}/bin/sonar-scanner \
                    -Dsonar.projectKey=reactapp \
                    -Dsonar.projectName=reactapp"
          }
        }
      }
    }
    stage("docker"){
      steps{
        sh label: "Docker compose",
        script: '''
          docker system prune -f
          docker-compose up -d --build
        '''
      }
    }
  }
}