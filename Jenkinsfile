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
          branches: [[name: "main"]],
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
    stage("docker"){
      steps{
        sh label: "Docker compose",
        script: '''
          docker system prune -f
          docker-compose up -d --build
        '''
      }
    }
    stage("SonarQube analysis"){
      environment {
        scannerHome = tool 'SonarQubeScanner';
      }
      steps{
        withSonarQubeEnv('sonar_qube_server'){ 
          sh "${scannerHome}/bin/sonar-scanner -X"
        }
      }
    }
    stage("Test apiwebshop"){
      steps{
        sh label: "Test apiwebshop",
        script: '''
          docker exec apiwebshop npm run test
        '''
      }
    }
  }
}