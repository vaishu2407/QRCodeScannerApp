import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, ToastAndroid } from "react-native";
import QRCode from "react-native-qrcode-svg";

const Generate = ({ navigation, route }: any) => {

  const [qrcodetext, setQrcodetext] = useState(route?.params?.data);
  const [from,setFrom]=useState(route?.params?.from)

  const saveData = async () => {
    let data: any = await AsyncStorage.getItem("qrcodes");
    data = JSON.parse(data);
    if (data == null || data == undefined) {
      let newArr: any = [];
      newArr.push(qrcodetext);
      await AsyncStorage.setItem("qrcodes", JSON.stringify(newArr))
    }
    else {
      data.push(qrcodetext)
      await AsyncStorage.setItem("qrcodes", JSON.stringify(data))
    }
    navigation.navigate("Home")
  }

  const deleteQr=async ()=>{
    let data: any = await AsyncStorage.getItem("qrcodes");
    data = JSON.parse(data);
    if (data == null || data == undefined) {
      data.splice(data.indexOf(qrcodetext),1)
      await AsyncStorage.setItem("qrcodes", JSON.stringify(data))
    }
    else {
      data.splice(data.indexOf(qrcodetext),1)
      await AsyncStorage.setItem("qrcodes", JSON.stringify(data))
    }
    ToastAndroid.show("QR Code with data has been deleted sucessfully !",ToastAndroid.LONG);
    navigation.navigate("Home");
  }

  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      <View style={{ flex: 9, backgroundColor: "#000000" }}>
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <Text style={{ color: "#008b91", fontSize: 20 }}>Scanned QR Code:</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#373737", padding: 30 }}>
          <QRCode
            value={qrcodetext}
            size={300}
            color="black"
            enableLinearGradient={false}
          />
        </View>
        <View style={{ margin: 20, borderColor: "#f0f0f0", borderWidth: 0.5, padding: 10 }}>
          <Text style={{ fontSize: 20, color: "#008b91" }}>QR Code Data:</Text>
          <Text style={{ color: "#fafafa", fontSize: 16, margin: 10 }}>{qrcodetext}</Text>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: "#000000", justifyContent: "space-around", flexDirection: "row" }}>
        <TouchableOpacity style={{ borderRadius: 30, height: 40, alignItems: "center", backgroundColor: "#272727", width: "40%", alignSelf: "center", justifyContent: "center" }}
          onPress={() => { navigation.goBack() }}>
          <Text style={{ color: "#ffffff", textAlign: "center", fontSize: 20 }}>
            Cancel
          </Text>
        </TouchableOpacity>
        {from == "scanned" ?<TouchableOpacity style={{ borderRadius: 30, height: 40, alignItems: "center", backgroundColor: "#008b91", width: "40%", alignSelf: "center", justifyContent: "center" }}
          onPress={() => { saveData() }}>
          <Text style={{ color: "#ffffff", textAlign: "center", fontSize: 20 }}>
            Save
          </Text>
        </TouchableOpacity>:
        <TouchableOpacity style={{ borderRadius: 30, height: 40, alignItems: "center", backgroundColor: "#fc2c03", width: "40%", alignSelf: "center", justifyContent: "center" }}
            onPress={() => { deleteQr() }}>
            <Text style={{ color: "#ffffff", textAlign: "center", fontSize: 20 }}>
              Delete
            </Text>
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}
export default Generate;
