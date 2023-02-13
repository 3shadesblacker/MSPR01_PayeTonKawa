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
        sh label: "Sonarqube",
          script: '''
           docker exec apireseller bash -c "sonar-scanner \
  -Dsonar.projectKey=payetonkawa \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=sqp_f5e6fd28c60733d6719520dcb75057f0c53fa970"
          '''
    }}
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