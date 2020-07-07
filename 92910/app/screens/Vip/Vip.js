import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Item,
  Input,
} from "native-base";
import silver from "../../assets/2.png";
import gold from "../../assets/1.png";
import Global from "../../../Globals";

export default class Vip extends Component {
  static navigationOptions = {
    headerStyle: {
      // backgroundColor: '#333',
      display: "none",
    },
  };
  UNSAFE_componentWillMount() {
    this.setState({
      type: this.props.navigation.state.params.type,
    });
  }
  render() {
    return (
      <Container style={{ backgroundColor: Global.colors.bg }}>
        <Header style={{ backgroundColor: Global.colors.pr2 }}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={(_) => this.props.navigation.goBack()}>
              <Icon name="arrow-left" type="MaterialCommunityIcons" />
            </Button>
          </Left>
          <Body
            style={{
              // backgroundColor: "red",
              flex: 4,
              alignItems: "center",
            }}
          >
            <Title>
              الوضع {this.state.type == "silver" ? "الفضي" : "الذهبي"}
            </Title>
          </Body>
          <Right></Right>
        </Header>
        <View
          style={{
            // justifyContent: "center",
            marginTop: "20%",
            alignItems: "center",
            // backgroundColor: "red",
            height: "100%",
          }}
        >
          <Image
            source={this.state.type == "silver" ? silver : gold}
            style={{
              width: 120,
              height: 120,
              marginBottom: 40,
              //   backgroundColor: "green",
            }}
          />
          <Text style={{ color: Global.colors.font2, fontSize: 24 }}>
            كروت لبيانا او مدار
          </Text>
          <Text
            style={{
              color: Global.colors.font3,
              fontSize: 18,
              width: "70%",
              marginTop: 15,
              textAlign: "center",
            }}
          >
            للتفعيل الوضع {this.state.type == "silver" ? "الفضي" : "الذهبي"} يجب
            عليك اضافة كرت تعبئة بقيمة{" "}
            {this.state.type == "silver" ? "5" : "10"} دينار
          </Text>
          <View style={{ width: "70%", marginVertical: 20 }}>
            <Item>
              <Input placeholder="ادخل رقم الكرت 1" />
              {/* <Icon name="checkmark-circle" /> */}
            </Item>
            {this.state.type == "gold" && (
              <Item>
                <Input placeholder="ادخل رقم الكرت 2" />
                {/* <Icon name="checkmark-circle" /> */}
              </Item>
            )}
          </View>
          <Button
            onPress={() => alert()}
            style={{
              backgroundColor: Global.colors.green2,
              borderRadius: 30,
              width: "80%",
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
              الارسال
            </Text>
          </Button>
        </View>
      </Container>
    );
  }
}
