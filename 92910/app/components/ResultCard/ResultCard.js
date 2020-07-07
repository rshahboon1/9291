import React from "react";
import { View, Text } from "react-native";
import Global from "../../../Globals";
import { Button, Icon } from "native-base";

export default function ResultCard(props) {
  const { name, phone, repeat } = props;
  return (
    <View
      style={{
        backgroundColor: "#fff",
        paddingVertical: 6,
        paddingHorizontal: 12,
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 4,
      }}
    >
      <View>
        <Button
          onPress={(_) => alert("saved")}
          style={{
            backgroundColor: Global.colors.green2,
            borderRadius: 30,
            width: 50,
            height: 50,
            padding: 0,
          }}
        >
          <Icon
            name="content-save"
            style={{ color: "#fff", fontSize: 18 }}
            type="MaterialCommunityIcons"
          />
        </Button>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View>
          <Text
            style={{
              color: Global.colors.font1,
              fontWeight: "bold",
              fontSize: 18,
              //   backgroundColor: "red",
              textAlign: "right",
            }}
          >
            {name}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 3 }}>
          <Text style={{ color: Global.colors.font3, textAlign: "right" }}>
            التكرار :{repeat}
          </Text>
          <Text style={{ color: Global.colors.font3, textAlign: "right" }}>
            {"    "}
            {phone}
          </Text>
        </View>
      </View>
    </View>
  );
}
