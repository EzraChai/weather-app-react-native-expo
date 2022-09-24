import { View, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils";

const { PRIMARY_COLOR } = colors;

const ReloadIcon = ({ load }: any) => {
  const reloadIconName = Platform.OS === "ios" ? "ios-refresh" : "md-refresh";
  return (
    <View style={styles.reloadIcon}>
      <Ionicons
        onPress={() => load()}
        name={reloadIconName}
        size={24}
        color={PRIMARY_COLOR}
      ></Ionicons>
    </View>
  );
};

const styles = StyleSheet.create({
  reloadIcon: {
    position: "absolute",
    top: 60,
    right: 20,
  },
});

export default ReloadIcon;
