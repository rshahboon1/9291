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
import Plans from "../../classes/Plans/Plans";

export default class Vip extends Component {
  static navigationOptions = {
    headerStyle: {
      // backgroundColor: '#333',
      display: "none",
    },
  };
  state = {
    card1: "",
    card2: "",
  };
  UNSAFE_componentWillMount() {
    const { deviceId, encryptedId, type } = this.props.navigation.state.params;
    this.setState({
      type,
      deviceId,
      encryptedId,
    });
  }
  handleActivation = async () => {
    if (this.state.type == "gold") {
      if (this.state.card1.length < 13 || this.state.card2.length < 13) {
        alert("ارجوا التاكد من الارقام");
        return;
      } else {
        const { deviceId, encryptedId } = this.state;
        const plan = new Plans({
          cardOne: this.state.card1,
          CardTwo: this.state.card2,
          deviceId,
          encryptedId,
        });
        const result = await plan.activateGold();
        if (result.state == 200) {
          alert("تم تسجيل طلبك بنجاح");
        } else {
          alert("حدثت مشكلة ما قم بمراسلة صفحة لمزيد من المعلومات");
        }
      }
    } else if (this.state.type == "silver") {
      if (this.state.card1.length < 13) {
        alert("ارجوا التاكد من رقم الكرت");
        return;
      } else {
        const { deviceId, encryptedId } = this.state;
        // alert(deviceId);
        // return;
        const plan = await new Plans({
          cardOne: this.state.card1,
          //  CardTwo: this.state.card2,
          deviceId,
          encryptedId,
        });
        const result = await plan.activateSilver();
        if (result.state == 200) {
          alert("تم تسجيل طلبك بنجاح");
        } else {
          alert("حدثت مشكلة ما قم بمراسلة صفحة لمزيد من المعلومات");
        }
      }
    }
  };
  async handleCard1(card1) {
    // console.log("test");
    if (card1.length <= 13) this.setState({ card1 });
  }
  async handleCard2(card2) {
    if (card2.length <= 13) this.setState({ card2 });
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
              <Input
                onChangeText={(card1) => {
                  this.handleCard1(card1);
                }}
                value={this.state.card1}
                keyboardType="numeric"
                placeholder="ادخل رقم الكرت 1"
              />
              {/* <Icon name="checkmark-circle" /> */}
            </Item>
            {this.state.type == "gold" && (
              <Item>
                <Input
                  onChangeText={(card2) => {
                    this.handleCard2(card2);
                  }}
                  value={this.state.card2}
                  keyboardType="numeric"
                  placeholder="ادخل رقم الكرت 2"
                />
                {/* <Icon name="checkmark-circle" /> */}
              </Item>
            )}
          </View>
          <Button
            onPress={() => this.handleActivation()}
            style={{
              backgroundColor: Global.colors.green2,
              borderRadius: 30,
              width: "80%",
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              الارسال
            </Text>
          </Button>
        </View>
      </Container>
    );
  }
}
