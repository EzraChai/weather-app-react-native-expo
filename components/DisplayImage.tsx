import { View, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: 108 * 2,
    height: 192 * 2,
    borderRadius: 20,
  },
});

const DisplayImage = () => {
  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: "https://media.graphassets.com/sksh0uwSQniEUE3rydz1",
        }}
      ></Image>
    </View>
  );
};

export default DisplayImage;
