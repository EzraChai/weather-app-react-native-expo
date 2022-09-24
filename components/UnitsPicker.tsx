import { View, StyleSheet, Platform } from "react-native";
import React from "react";
import { Picker } from "@react-native-community/picker";

const UnitsPicker = ({ unitsSystem, setUnitsSystem }: any) => {
  return (
    <View style={styles.unitsSystem}>
      <Picker
        selectedValue={unitsSystem}
        onValueChange={(item) => setUnitsSystem(item)}
        mode="dropdown"
        style={{ fontSize: 12 }}
        itemStyle={{ fontSize: 12 }}
      >
        <Picker.Item label="°C" value={"metric"} />
        <Picker.Item label="F" value={"imperial"} />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  unitsSystem: {
    position: "absolute",
    ...Platform.select({
      ios: {
        top: -20,
      },
      android: {
        top: 50,
      },
    }),
    left: 20,
    width: 100,
  },
});

export default UnitsPicker;
