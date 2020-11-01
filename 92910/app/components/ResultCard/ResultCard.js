import React from "react";
import { View, Text } from "react-native";
import Global from "../../../Globals";
import { Button, Icon } from "native-base";
// import Contacts from "react-native-contacts";

export default function ResultCard(props) {
  const { name, phone, repeat } = props;
  const saveContactToPhone = (name, phone) => {
    var newPerson = {
      phoneNumbers: [
        {
          label: "mobile",
          number: phone,
        },
      ],
      displayName: name,
    };

    Contacts.openContactForm(newPerson, (err, contact) => {
      if (err) throw err;
      // contact has been saved
    });
  };
  return (
    <View
      style={{
        backgroundColor: "#fff",
        paddingVertical: 6,
        paddingHorizontal: 12,
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 4,
        overflow: "hidden",
      }}
    >
      <View>
        <Button
          onPress={() => saveContactToPhone(name, phone)}
          style={{
            backgroundColor: Global.colors.green2,
            borderRadius: 30,
            width: 50,
            height: 50,
            padding: 0,
            display: "none", //TODO add in fucure
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
          {repeat && (
            <Text style={{ color: Global.colors.font3, textAlign: "right" }}>
              التكرار :{repeat}
            </Text>
          )}
          <Text style={{ color: Global.colors.font3, textAlign: "right" }}>
            {"    "}
            {phone}
          </Text>
        </View>
      </View>
    </View>
  );
}
