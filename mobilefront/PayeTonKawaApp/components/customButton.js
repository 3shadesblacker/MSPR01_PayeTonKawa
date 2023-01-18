import { Button, StyleSheet } from "react-native";


const CustomButton = (props) =>  {
  return(
    <Button title={props.title} color="#F3D496" styles={styles.button} disabled={props.disabled} />
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: "4px"
  }
})

export default CustomButton