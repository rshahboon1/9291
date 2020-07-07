import React from "react";
import { View, Text, Dimensions, Image } from "react-native";
import silver from "../../assets/2.png";
import gold from "../../assets/1.png";
import Global from "../../../Globals";
import { Icon, Button } from "native-base";

export default function Plan(props) {
  const { type } = props;
  return (
    <View
      style={{
        width: "70%",
        borderRadius: 32,
        borderWidth: 1,
        borderColor: "#eee",
        paddingBottom: 30,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        // height: 400,
      }}
    >
      <Button
        onPress={(_) => alert()}
        transparent
        style={{ position: "absolute", left: 5, top: 5 }}
      >
        <Icon type="MaterialCommunityIcons" name="close" style={{}} />
      </Button>
      <Image
        source={type == "silver" ? silver : gold}
        style={{
          width: 120,
          height: 120,
          marginBottom: 40,
          //   backgroundColor: "green",
        }}
      />
      <Text
        style={{
          color: Global.colors.blue,
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        {type == "silver" ? "النسخة الفضية" : "النسخة الذهبية"}
      </Text>
      <View
        style={{
          flexDirection: "row-reverse",
          //   justifyContent: "center",
          width: "100%",
          //   backgroundColor: "red",
          paddingHorizontal: 30,
        }}
      >
        <Icon
          style={{ color: Global.colors.blue }}
          name="check"
          type="MaterialCommunityIcons"
        />
        <Text
          style={{
            color: Global.colors.font3,
            // backgroundColor: "black",
            marginRight: 10,
            fontSize: 20,
          }}
        >
          خالي من الاعلانات
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row-reverse",
          //   justifyContent: "center",
          width: "100%",
          //   backgroundColor: "red",
          paddingHorizontal: 30,
        }}
      >
        <Icon
          style={{ color: Global.colors.blue }}
          name="check"
          type="MaterialCommunityIcons"
        />
        <Text
          style={{
            color: Global.colors.font3,
            // backgroundColor: "black",
            marginRight: 10,
            fontSize: 20,
          }}
        >
          عرض جميع الاسماء
        </Text>
      </View>
      {type == "gold" && (
        <View
          style={{
            flexDirection: "row-reverse",
            //   justifyContent: "center",
            width: "100%",
            //   backgroundColor: "red",
            paddingHorizontal: 30,
          }}
        >
          <Icon
            style={{ color: Global.colors.blue }}
            name="check"
            type="MaterialCommunityIcons"
          />
          <Text
            style={{
              color: Global.colors.font3,
              // backgroundColor: "black",
              marginRight: 10,
              fontSize: 20,
            }}
          >
            بحث بالاسم
          </Text>
        </View>
      )}
      <Text
        style={{
          color: Global.colors.font3,
          // backgroundColor: "black",
          marginTop: 20,
          marginRight: 10,
          fontSize: 20,
          width: "80%",
          textAlign: "center",
        }}
      >
        تحتاج الي تفعيل الوضع {type == "silver" ? "الفضي" : "الذهبي"} حتي تتمكن
        من عرض جميع الاسماء
      </Text>
      <Button
        onPress={() => props.navigation.navigate("Vip", { type })}
        style={{
          backgroundColor: Global.colors.green2,
          borderRadius: 30,
          width: "80%",
          marginTop: 12,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>
          تفعيل الوضع {type == "silver" ? "الفضي" : "الذهبي"}
        </Text>
      </Button>
    </View>
  );
}
