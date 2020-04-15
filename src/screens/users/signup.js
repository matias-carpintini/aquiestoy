import { setItemAsync } from "expo-secure-store";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Picker,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import countries from "../../assets/strings/countries";
import jobs from "../../assets/strings/jobs";
import languages from "../../assets/strings/languages";
import bridge from "../../helpers/bridge";
import colors from "../../styles/colors";
import styles from "../../styles/styles";

export default UserSignUpScreen = (props) => {
  const [buttonText, setButtonText] = React.useState("Crear cuenta");
  const [buttonStatus, setButtonStatus] = React.useState(true);
  const [validateTerms, setValidateTerms] = React.useState(false);
  const [formData, setFormData] = React.useState({
    full_name: "",
    level_of_studies: "",
    profession: "",
    is_health_professional: true,
    phone: "",
    email: "",
    birthdate: "",
    gender: "",
    lang: "",
    dni: "",
    home: "",
    country: "Argentina",
    nationality: "Argentina",
    help_reasson: "",
    password: "",
    resume: "",
    courses: "",
    workspace: "",
    position: "",
    childs: "",
    marital_status: "",
    people_live_with_you: "",
    dependents: "",
  });

  const submit = () => {
    setButtonStatus(true);
    setButtonText("Creando cuenta");
    bridge.createUser(formData).then((response) => {
      if (response.status) {
        setItemAsync("user", JSON.stringify(response.User))
          .then(() => setItemAsync("token", JSON.stringify(response.token)))
          .then(() => props.navigation.navigate("VolunteerFeed"));
      } else {
        setButtonText("Crear cuenta");
        setButtonStatus(!validateTerms);
        console.log("error", response);
      }
    });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.smoke,
        flexDirection: "column",
        flex: 1,
      }}
    >
      <KeyboardAvoidingView>
        <StatusBar backgroundColor={colors.smoke} barStyle="dark-content" />
        <ScrollView>
          <View
            style={{
              backgroundColor: colors.white,
              margin: 20,
              marginBottom: 0,
              borderRadius: 50,
              flex: 1,
              paddingBottom: 0,
            }}
            overflow="hidden"
          >
            <View
              style={{
                height: 90,
                flexDirection: "row",
                margin: 0,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/aquiestoy.png")}
                style={{
                  resizeMode: "contain",
                  width: 150,
                  marginLeft: 20,
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: "Kastelov--Axiforma-Medium",
                margin: 20,
                marginTop: -25,
                color: colors.lightGray,
              }}
            >
              Crea tu cuenta, ¡es fácil!
            </Text>

            <View style={{ alignItems: "center" }}>
              <View style={{ width: "90%" }}>
                <Text style={[styles.label]}>Nombre y Apellido:</Text>
              </View>
              <TextInput
                placeholderTextColor={colors.darkWhite}
                style={[
                  styles.loginInput,
                  {
                    backgroundColor: colors.smoke,
                    marginTop: 10,
                    marginBottom: 20,
                  },
                ]}
                value={formData.full_name}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    full_name: event.nativeEvent.text,
                  })
                }
                placeholder="Matias Carpintini"
              />
              <View style={{ width: "90%" }}>
                <Text style={[styles.label]}>Correo electrónico:</Text>
              </View>
              <TextInput
                placeholderTextColor={colors.darkWhite}
                style={[
                  styles.loginInput,
                  {
                    backgroundColor: colors.smoke,
                    marginTop: 10,
                    marginBottom: 20,
                  },
                ]}
                placeholder="carpintinimatias@gmail.com"
                value={formData.email}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    email: event.nativeEvent.text,
                  })
                }
                keyboardType="email-address"
              />
              <View style={{ width: "90%" }}>
                <Text style={[styles.label]}>Dirección:</Text>
              </View>
              <TextInput
                placeholderTextColor={colors.darkWhite}
                style={[
                  styles.loginInput,
                  {
                    backgroundColor: colors.smoke,
                    marginTop: 10,
                    marginBottom: 20,
                  },
                ]}
                placeholder="Calle siempre viva 123"
                value={formData.home}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    home: event.nativeEvent.text,
                  })
                }
              />
              <View style={{ width: "90%" }}>
                <Text style={[styles.label]}>Documento de identidad:</Text>
              </View>
              <TextInput
                placeholderTextColor={colors.darkWhite}
                style={[
                  styles.loginInput,
                  {
                    backgroundColor: colors.smoke,
                    marginTop: 10,
                    marginBottom: 20,
                  },
                ]}
                placeholder="12.345.678"
                value={formData.dni}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    dni: event.nativeEvent.text,
                  })
                }
                keyboardType="number-pad"
              />
              <View style={{ flex: 1, flexDirection: "row", width: "90%" }}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label]}>Nacimiento:</Text>
                  <TextInput
                    placeholderTextColor={colors.darkWhite}
                    style={[
                      styles.loginInput,
                      {
                        backgroundColor: colors.smoke,
                        marginTop: 10,
                        marginBottom: 20,
                      },
                    ]}
                    placeholder="12/10/2001"
                    value={formData.birthday}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        birthday: event.nativeEvent.text,
                      })
                    }
                  ></TextInput>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={[styles.label]}>Sexo:</Text>
                  <View
                    style={{
                      marginTop: 10,
                      marginBottom: 20,
                      justifyContent: "center",
                      backgroundColor: colors.smoke,
                      borderRadius: 10,
                      height: 48,
                    }}
                  >
                    <Picker
                      mode={Picker.MODE_DROPDOWN}
                      selectedValue={formData.gender}
                      onValueChange={(value) => {
                        setFormData({ ...formData, gender: value });
                      }}
                    >
                      <Picker.Item label="Hombre" value="H" />
                      <Picker.Item label="Mujer" value="M" />
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={{ width: "90%" }}>
                <Text style={[styles.label]}>Idioma:</Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 20,
                  justifyContent: "center",
                  backgroundColor: colors.smoke,
                  borderRadius: 10,
                  height: 48,
                  width: "90%",
                }}
              >
                <Picker
                  selectedValue={formData.lang}
                  onValueChange={(value) => {
                    setFormData({ ...formData, lang: value });
                  }}
                >
                  {languages.map((lang, index) => (
                    <Picker.Item
                      key={`lang-item-${index}`}
                      label={lang.label}
                      value={lang.value}
                    />
                  ))}
                </Picker>
              </View>

              <View style={{ width: "90%" }}>
                <Text style={[styles.label]}>Teléfono de contacto:</Text>
              </View>
              <TextInput
                placeholderTextColor={colors.darkWhite}
                style={[
                  styles.loginInput,
                  {
                    backgroundColor: colors.smoke,
                    marginTop: 10,
                    marginBottom: 20,
                  },
                ]}
                placeholder="+54 11-12345678"
                value={formData.phone}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    phone: event.nativeEvent.text,
                  })
                }
                keyboardType="phone-pad"
              />
              <View style={{ width: "90%" }}>
                <Text style={[styles.label]}>Nacionalidad:</Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  width: "90%",
                  justifyContent: "center",
                  backgroundColor: colors.smoke,
                  borderRadius: 10,
                  height: 48,
                  marginTop: 10,
                  marginBottom: 20,
                }}
              >
                <Picker
                  selectedValue={formData.nationality}
                  onValueChange={(value) => {
                    setFormData({ ...formData, nationality: value });
                  }}
                >
                  {countries.map((nationality, index) => (
                    <Picker.Item
                      key={`nationality-item-${index}`}
                      label={nationality.label}
                      value={nationality.value}
                    />
                  ))}
                </Picker>
              </View>
              <View style={{ width: "90%" }}>
                <Text style={[styles.label]}>País actual de residencia:</Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  width: "90%",
                  justifyContent: "center",
                  backgroundColor: colors.smoke,
                  borderRadius: 10,
                  height: 48,
                  marginTop: 10,
                  marginBottom: 20,
                }}
              >
                <Picker
                  mode={Picker.MODE_DROPDOWN}
                  selectedValue={formData.country}
                  onValueChange={(value) => {
                    setFormData({ ...formData, country: value });
                  }}
                >
                  {countries.map((country, index) => (
                    <Picker.Item
                      key={`country-item-${index}`}
                      label={country.label}
                      value={country.value}
                    />
                  ))}
                </Picker>
              </View>
              <View style={{ width: "90%" }}>
                <Text style={[styles.label]}>Nivel de estudios:</Text>
              </View>
              <TextInput
                placeholderTextColor={colors.darkWhite}
                style={[
                  styles.loginInput,
                  {
                    backgroundColor: colors.smoke,
                    marginTop: 10,
                    marginBottom: 20,
                  },
                ]}
                placeholder="Secundario completo"
                value={formData.level_of_studies}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    level_of_studies: event.nativeEvent.text,
                  })
                }
              />
              <View style={{ width: "90%" }}>
                <Text style={[styles.label]}>Profesión:</Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  width: "90%",
                  justifyContent: "center",
                  backgroundColor: colors.smoke,
                  borderRadius: 10,
                  height: 48,
                  marginTop: 10,
                  marginBottom: 20,
                }}
              >
                <Picker
                  mode={Picker.MODE_DROPDOWN}
                  selectedValue={formData.profession}
                  onValueChange={(value) => {
                    setFormData({ ...formData, profession: value });
                  }}
                >
                  {jobs.map((job, index) => (
                    <Picker.Item
                      key={`job-item-${index}`}
                      label={job.label}
                      value={job.value}
                    />
                  ))}
                </Picker>
              </View>
              <View style={{ width: "90%" }}>
                <Text style={[styles.label]}>
                  Razón por la que buscas ayuda:
                </Text>
              </View>
              <TextInput
                placeholderTextColor={colors.darkWhite}
                style={[
                  styles.loginInput,
                  {
                    backgroundColor: colors.smoke,
                    textAlignVertical: "top",
                    marginTop: 10,
                    marginBottom: 20,
                  },
                ]}
                placeholder="Describe tu situación acá (opcional)"
                collapsable={true}
                multiline
                numberOfLines={3}
                value={formData.help_reasson}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    help_reasson: event.nativeEvent.text,
                  })
                }
              ></TextInput>

              <View style={{ width: "90%" }}>
                <Text style={[styles.label]}>Un breve resúmen:</Text>
              </View>
              <TextInput
                placeholderTextColor={colors.darkWhite}
                style={[
                  styles.loginInput,
                  {
                    backgroundColor: colors.smoke,
                    textAlignVertical: "top",
                    marginTop: 10,
                    marginBottom: 20,
                  },
                ]}
                placeholder="Háblanos un poco de vos :)"
                collapsable={true}
                multiline
                numberOfLines={3}
                value={formData.resume}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    resume: event.nativeEvent.text,
                  })
                }
              ></TextInput>

              <View style={{ width: "90%" }}>
                <Text style={[styles.label]}>Lugar de trabajo:</Text>
              </View>
              <TextInput
                placeholderTextColor={colors.darkWhite}
                style={[
                  styles.loginInput,
                  {
                    backgroundColor: colors.smoke,
                    marginTop: 10,
                    marginBottom: 20,
                  },
                ]}
                placeholder="Hospital X..."
                value={formData.workspace}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    workspace: event.nativeEvent.text,
                  })
                }
              />

              <View style={{ width: "90%" }}>
                <Text style={[styles.label]}>Puesto/Rol:</Text>
              </View>
              <TextInput
                placeholderTextColor={colors.darkWhite}
                style={[
                  styles.loginInput,
                  {
                    backgroundColor: colors.smoke,
                    marginTop: 10,
                    marginBottom: 20,
                  },
                ]}
                placeholder="Camillero"
                value={formData.position}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    position: event.nativeEvent.text,
                  })
                }
              />

              <View style={{ flex: 1, flexDirection: "row", width: "90%" }}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label]}>Estado civil:</Text>
                  <View
                    style={{
                      marginTop: 10,
                      marginBottom: 20,
                      justifyContent: "center",
                      backgroundColor: colors.smoke,
                      borderRadius: 10,
                      height: 48,
                      width: "90%",
                    }}
                  >
                    <Picker
                      mode={Picker.MODE_DROPDOWN}
                      selectedValue={formData.marital_status}
                      onValueChange={(value) => {
                        setFormData({ ...formData, marital_status: value });
                      }}
                    >
                      <Picker.Item label="Solter@" value="Solter@" />
                      <Picker.Item label="Comprometid@" value="Comprometid@" />
                      <Picker.Item label="En Relación" value="En Relación" />
                      <Picker.Item label="Casad@" value="Casad@" />
                      <Picker.Item label="Separad@" value="Separad@" />
                      <Picker.Item label="Divorciad@" value="Divorciad@" />
                      <Picker.Item label="Viud@" value="Viud@" />
                      <Picker.Item label="Noviazgo" value="Noviazgo" />
                    </Picker>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label]}>Hij@s:</Text>
                  <TextInput
                    placeholderTextColor={colors.darkWhite}
                    style={[
                      styles.loginInput,
                      {
                        backgroundColor: colors.smoke,
                        marginTop: 10,
                        marginBottom: 20,
                        width: "100%",
                      },
                    ]}
                    placeholder="0"
                    value={formData.childs}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        childs: event.nativeEvent.text,
                      })
                    }
                    keyboardType="number-pad"
                  ></TextInput>
                </View>
              </View>

              <View style={{ flex: 1, flexDirection: "row", width: "90%" }}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label]}>Convivo con:</Text>
                  <TextInput
                    placeholderTextColor={colors.darkWhite}
                    style={[
                      styles.loginInput,
                      {
                        backgroundColor: colors.smoke,
                        marginTop: 10,
                        marginBottom: 20,
                      },
                    ]}
                    placeholder="0 personas"
                    value={formData.people_live_with_you}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        people_live_with_you: event.nativeEvent.text,
                      })
                    }
                    keyboardType="number-pad"
                  ></TextInput>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label]}>Dependen de mi:</Text>
                  <TextInput
                    placeholderTextColor={colors.darkWhite}
                    style={[
                      styles.loginInput,
                      {
                        backgroundColor: colors.smoke,
                        marginTop: 10,
                        marginBottom: 20,
                      },
                    ]}
                    placeholder="0 personas"
                    value={formData.dependents}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        dependents: event.nativeEvent.text,
                      })
                    }
                    keyboardType="number-pad"
                  ></TextInput>
                </View>
              </View>

              <View style={{ width: "90%" }}>
                <Text style={[styles.label]}>Contraseña:</Text>
              </View>
              <TextInput
                placeholderTextColor={colors.darkWhite}
                secureTextEntry
                style={[
                  styles.loginInput,
                  { backgroundColor: colors.smoke, marginTop: 10 },
                ]}
                placeholder="********"
                collapsable={true}
                value={formData.password}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    password: event.nativeEvent.text,
                  })
                }
              />
              <TouchableOpacity
                onPress={() => {
                  setValidateTerms((previous) => {
                    setValidateTerms(!previous);
                    setButtonStatus(previous);
                  });
                }}
              >
                <Text
                  style={{
                    fontFamily: "Kastelov--Axiforma-Bold",
                    color: colors.darkWhite,
                    marginTop: 30,
                  }}
                >
                  Acepto los{" "}
                  <Text
                    style={
                      validateTerms
                        ? {
                            color: colors.green,
                            textDecorationLine: "underline",
                          }
                        : {
                            color: colors.gray,
                          }
                    }
                  >
                    términos y condiciones
                  </Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  validateTerms && !buttonStatus
                    ? styles.signUpButton
                    : styles.diasbledSignUpButton,
                  { marginBottom: 30, marginTop: 10 },
                ]}
                onPress={submit}
                disabled={buttonStatus}
              >
                <Text
                  style={{
                    fontFamily: "Kastelov--Axiforma-Bold",
                    color: "white",
                    textAlign: "center",
                    fontSize: 15,
                    color: colors.white,
                  }}
                >
                  {buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginVertical: 10 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
