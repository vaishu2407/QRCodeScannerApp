import React from "react";
import { View } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';

const Scanner = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View style={{ flex: 1, backgroundColor: "#000000" }}></View>
      <View style={{ flex: 4 }}>
        <QRCodeScanner
          onRead={(e: any) => {
            navigation.navigate("Generate", { data: e.data,from:"scanned" })
          }}
          reactivate={true}
          reactivateTimeout={100}
          fadeIn={true}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: "#000000" }}></View>
    </View>
  )
}
export default Scanner;