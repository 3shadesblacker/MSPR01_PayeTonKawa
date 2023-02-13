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
          script: '''
            docker run \
            --rm \
            -e SONAR_HOST_URL="http://localhost:9000" \
            -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=${squ_a63964f425ab9948667550dfd80f7be1a70f8363}" \
            -e SONAR_LOGIN="sqp_f5e6fd28c60733d6719520dcb75057f0c53fa970" \
            -v "${YOUR_REPO}:/usr/src" \
            sonarsource/sonar-scanner-cli 
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