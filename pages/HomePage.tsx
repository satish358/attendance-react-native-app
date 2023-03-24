import React, { useEffect, useState } from "react";
import { Appbar, Button, Text } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet, View } from "react-native";
import { getAuth } from "../services/api.service";

const HomePage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    getAuth(`/student/makeAttendance/${data}`)
      .then((res) => {
        if (res.status === 201) alert("Your attendance added");
        else alert("Something went wrong");
      })
      .catch((err) => {
        alert(err);
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button onPress={() => setScanned(false)}>Tap to Scan Again</Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default HomePage;
