import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F3D496",
    padding: "10"
  }
});

export default CustomButton;