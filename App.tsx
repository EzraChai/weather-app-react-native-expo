import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import DisplayImage from "./components/DisplayImage";
import * as Location from "expo-location";
import WeatherInfo from "./components/WeatherInfo";
import UnitsPicker from "./components/UnitsPicker";
import { colors } from "./utils";
import ReloadIcon from "./components/ReloadIcon";
import WeatherDetails from "./components/WeatherDetails";
import { OPEN_WEATHER_API_KEY } from "react-native-dotenv";

export interface CoordinatesInterface {
  longitude: number;
  latitude: number;
}

const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";

const { PRIMARY_COLOR } = colors;

export default function App() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState<"metric" | "imperial">(
    "metric"
  );

  useEffect(() => {
    load();
  }, [unitsSystem]);

  async function load() {
    setCurrentWeather(null);
    setErrorMessage(null);
    try {
      let { status }: any = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMessage("Access to location is needed to run the app.");
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${OPEN_WEATHER_API_KEY}`;

      const response = await fetch(weatherUrl);

      const data = await response.json();

      if (response.ok) {
        setCurrentWeather(data);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  }

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <UnitsPicker
          unitsSystem={unitsSystem}
          setUnitsSystem={setUnitsSystem}
        />
        <ReloadIcon load={load} />
        <View style={styles.main}>
          <WeatherInfo
            currentWeather={currentWeather}
            unitsSystem={unitsSystem}
          />
        </View>
        <WeatherDetails
          currentWeather={currentWeather}
          unitsSystem={unitsSystem}
        />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>{errorMessage}</Text>
        <DisplayImage />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ReloadIcon load={load} />
        <ActivityIndicator size={"large"} color={PRIMARY_COLOR} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    justifyContent: "center",
    flex: 1,
  },
});
