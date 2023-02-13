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
    stage("docker"){
      steps{
        sh label: "Docker compose",
        script: '''
          docker system prune -f
          docker-compose up -d --build
        '''
      }
    }
    stage("Sonarqube"){
      steps{
        sh label: "Sonarqube",
          script: ''' 
          sonar-scanner -Dsonar.projectKey=payetonkawa -Dsonar.sources=. -Dsonar.host.url=http://51.38.237.216:9000 -Dsonar.login=sqp_031b3aedacafd5df2464a620a6f28f7ae3e56d4b
          '''
    }}
  }
}