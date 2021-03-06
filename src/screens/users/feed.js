import React from "react";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

import {
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

import colors from "../../styles/colors";
import styles from "../../styles/styles";
import bridge from "../../helpers/bridge";

import {
  AreaSafe,
  IconView,
  TitleBarMenuIcons,
  TitleBarPosition,
  IconIndicatorC,
} from "../../styles/styled";

import Button from "../../accessories/buttons/button";

export default UserFeedScreen = (props) => {
  const { navigation } = props;
  const [user, setUser] = React.useState({});
  const [heardStatus, setHeardStatus] = React.useState(false);
  const [hearText, setHeardText] = React.useState("Buscar a un aliado");

  React.useEffect(() => {
    getItemAsync("token").then((token) => {
      getItemAsync("user").then((user) => {
        console.log("_takePick", JSON.parse(user));
        setUser({ token: JSON.parse(token), data: JSON.parse(user) });
      });
    });
  }, [user.token]);

  const myProfile = () => {
    navigation.navigate("UserProfile");
  };
  const editProfile = () => {
    navigation.navigate("UserEdit");
  };

  const requestToBeHeard = () => {
    setHeardStatus(true);
    bridge
      .changeState(user.token)
      .then((response) => {
        if (response.status) {
          setItemAsync("token", JSON.stringify(response.token));
        }
      })
      .catch((error) => {
        console.log("error", error);
        deleteItemAsync("user")
          .then(() => deleteItemAsync("token"))
          .then(navigation.navigate("Question"));
      });
  };

  React.useEffect(() => {
    if (heardStatus) {
      setHeardText("Buscando a tu aliado");
    } else {
      setHeardText("Buscar a un aliado");
    }
  }, [heardStatus]);

  return (
    <AreaSafe>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <TitleBarPosition
        style={{
          backgroundColor: colors.white
        }}
      >
        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              margin: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/aquiestoy.png")}
              style={{ resizeMode: "contain", width: 130, height: 40 }}
            />
          </View>
        </TouchableOpacity>
        <TitleBarMenuIcons>
          <TouchableOpacity>
            <IconView>
              <SimpleLineIcon
                name="support"
                size={20}
                style={{ marginTop: 7, color: colors.gray }}
              />
            </IconView>
          </TouchableOpacity>
          <TouchableOpacity onPress={myProfile}>
            <IconView>
              <SimpleLineIcon
                name="user"
                size={20}
                style={{
                  marginTop: 7,
                  color: colors.gray,
                }}
              />
            </IconView>
          </TouchableOpacity>
        </TitleBarMenuIcons>
      </TitleBarPosition>
      <View style={{ alignItems: "center" }}>
        <Button disabled={heardStatus} onPress={requestToBeHeard}>
          {hearText}
        </Button>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={editProfile}>
          <View style={{ width: "90%", height: 30, marginTop: 20 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontFamily: "Kastelov--Axiforma-Bold",
                color: colors.green,
                fontSize: 15,
              }}
            >
              Completar mi perfil
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </AreaSafe>
  );
};
