pipeline {
  stages {
    stage('Clean Workspace') {
      steps{
        cleanWs()
      }
    }
    stage("Checkout SCM"){
      step{
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
      step{
        sh "coucou"
      }
    }
  }
}