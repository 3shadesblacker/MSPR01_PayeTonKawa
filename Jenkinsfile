pipeline {
  agent none
  
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
          branches: [[name: "docker"]],
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
    stage("test"){
      steps{
        sh "coucou"
      }
    }
  }
}