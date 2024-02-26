import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }: any) => {
    const isFocused: any = useIsFocused();
    const [data, setData] = useState<[]>([]);

    useEffect(() => {
        getData()
    }, [isFocused])

    const getData = async () => {
        let data: any = await AsyncStorage.getItem("qrcodes");
        data = JSON.parse(data)
        console.log(typeof (data), data);
        if (data != undefined || data != null) {
            setData(data)
        }
        else {
            setData([])
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 9, backgroundColor: "#171717", padding: 20 }}>
                <Text style={{ color: "#ffffff", fontSize: 25 }}>Recent:</Text>
                {data.length>0?<FlatList
                    data={data}
                    renderItem={({ item }: any) => {
                        return (
                            <TouchableOpacity onPress={()=>{navigation.navigate("Generate",{data:item,from:"saved"})}}>
                                <View style={{ flexDirection: "row", justifyContent: "center", height: 70, alignItems: "center", backgroundColor: "#373737", marginHorizontal: 8, marginVertical: 5, paddingHorizontal: 10, borderRadius: 8 }}>
                                    <View style={{ flex: 3 }}>
                                        <Text style={{ color: "#fafafa" }}>Data:- {item.length>18?item.substring(0,18)+"......":item}</Text>
                                    </View>
                                    <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}>
                                        <QRCode value={item} color="black" size={60} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />:
                <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
                    <Text style={{textAlign:"center",color:"#ababab"}}>No saved QR codes Found !</Text>    
                </View>}
            </View>
            <View style={{ flex: 1, backgroundColor: "#000000", justifyContent: "center" }}>
                <TouchableOpacity style={{ borderRadius: 30, height: 40, alignItems: "center", backgroundColor: "#008b91", width: "90%", alignSelf: "center", justifyContent: "center" }}
                    onPress={() => { navigation.navigate("Scanner") }}>
                    <Text style={{ color: "#ffffff", textAlign: "center", fontSize: 20 }}>
                        Scan QR Code
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Home