import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Image,
  useWindowDimensions,
  Modal,
  Linking,
  Platform,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import NavMenu from "../components/NavMenu";
import logoBlack from "../assets/images/logoBlack.png"; // Black logo image

export default function Contact() {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(3); // Contact page active
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Modal states & data
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(""); // "phone" or "email"
  const [modalValue, setModalValue] = useState("");

  // Opens modal with type and value (phone/email)
  const openConfirmModal = (type, value) => {
    setModalType(type);
    setModalValue(value);
    setModalVisible(true);
  };

  // Trigger the phone or email action, close modal
  const handleConfirmLink = async () => {
    setModalVisible(false);
    if (modalType === "phone") {
      Linking.openURL(`tel:${modalValue}`);
    } else if (modalType === "email") {
      const email = modalValue;
      // Gmail web and Outlook web compose URLs (works on Android, progressive fallback)
      const gmailURL = `https://mail.google.com/mail/?view=cm&to=${email}`;
      const outlookURL = `https://outlook.live.com/mail/0/deeplink/compose?to=${email}`;
      try {
        // Try Gmail web
        const supportedGmail = await Linking.canOpenURL(gmailURL);
        if (supportedGmail) {
          return Linking.openURL(gmailURL);
        }
      } catch(e) {}
      try {
        // Try Outlook web
        const supportedOutlook = await Linking.canOpenURL(outlookURL);
        if (supportedOutlook) {
          return Linking.openURL(outlookURL);
        }
      } catch(e) {}
      // Fallback: open mail client
      Linking.openURL(`mailto:${email}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Nav */}
      <View style={styles.topNav}>
        <Link href="/" asChild>
          <TouchableOpacity
            onPress={() => setActiveIndex(0)}
            style={styles.logoTouchable}
          >
            <Image source={logoBlack} style={styles.logo} />
          </TouchableOpacity>
        </Link>

        <View style={styles.centerIconContainer}>
          <TouchableOpacity onPress={() => setSearchOpen((prev) => !prev)}>
            <Ionicons name="search" size={30} color="#000900" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setMenuOpen((prev) => !prev)}>
          <Ionicons
            name={menuOpen ? "close" : "menu"}
            size={32}
            color="#000900"
          />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {menuOpen && (
        <NavMenu
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onClose={() => setMenuOpen(false)}
          menuBackground="#f0f0f0"
          textColor="#000900"
          activeTextColor="#007AFF"
        />
      )}

      {/* Search Bar */}
      {searchOpen && (
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#ffffff" />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#ffffff"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
        </View>
      )}

      {/* Page Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Big "01" */}
        <Text style={styles.number}>01</Text>

        {/* Horizontal Line - section divider */}
        <View style={styles.sectionDivider} />

        {/* Heading "CONTACT" below the line */}
        <Text style={styles.pageTitle}>CONTACT</Text>

        {/* Section: Contact Details */}
        <View style={styles.section}>
          {/* Phone */}
          <TouchableOpacity
            style={styles.row}
            onPress={() => openConfirmModal("phone", "+27734567891")}
          >
            <Image
              source={require("../assets/icons/phone.png")}
              style={styles.icon}
            />
            <Text style={styles.infoText}>+27 73 456 7891</Text>
          </TouchableOpacity>

          {/* Location */}
          <View style={styles.row}>
            <Image
              source={require("../assets/icons/location.png")}
              style={styles.icon}
            />
            <Text style={styles.infoText}>
              Sharpeville | Soweto | Alexandra
            </Text>
          </View>

          {/* Email */}
          <TouchableOpacity
            style={styles.row}
            onPress={() => openConfirmModal("email", "info@empoweringthenation.com")}
          >
            <Image
              source={require("../assets/icons/email.png")}
              style={styles.icon}
            />
            <Text style={styles.infoText}>info@empoweringthenation.com</Text>
          </TouchableOpacity>
        </View>

        {/* Button: Fill Out Contact Form */}
        <Link href="/feesandform" asChild>
          <TouchableOpacity style={styles.formButton}>
            <Text style={styles.formButtonText}>FILL OUT OUR CONTACT FORM</Text>
          </TouchableOpacity>
        </Link>

        {/* Button: View Institution Credentials */}
        <TouchableOpacity style={styles.formButton}>
          <Text style={styles.formButtonText}>VIEW INSTITUTION CREDENTIALS</Text>
        </TouchableOpacity>

        {/* Section: Find Us/Google Map */}
        <View style={styles.findUsSection}>
          <Text style={styles.findUsTitle}>FIND US</Text>
          <View style={styles.mapContainer}>
            <Image
              source={require("../assets/icons/maps.png")}
              style={[styles.map, { width: width - 20 }]}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Social Icons Row with active links */}
        <View style={styles.socialRow}>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.facebook.com")}
          >
            <Image
              source={require("../assets/icons/fb.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://twitter.com")}
          >
            <Image
              source={require("../assets/icons/twitter.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.instagram.com")}
          >
            <Image
              source={require("../assets/icons/ig.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.linkedin.com")}
          >
            <Image
              source={require("../assets/icons/linkedin.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              Would you like to get in contact with Empowering The Nation?
            </Text>
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={[styles.modalButtonText, { color: "#000900" }]}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmLink}
                style={[styles.modalButton, styles.confirmButton]}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    paddingHorizontal: 15,
    zIndex: 10,
    marginTop: 20,
  },
  logoTouchable: {
    marginLeft: -90,
    marginTop: 20,
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: "contain",
  },
  centerIconContainer: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: 10 }],
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000900",
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    zIndex: 20,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#ffffff",
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  number: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionDivider: {
    borderTopWidth: 1,
    borderColor: "#000900",
    width: "100%",
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8,
    resizeMode: "contain",
  },
  infoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000900",
  },
  formButton: {
    backgroundColor: "#000900",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  formButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  findUsSection: {
    marginBottom: 20,
  },
  findUsTitle: {
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 10,
  },
  mapContainer: {
    alignItems: "center",
  },
  map: {
    height: 500,
    borderRadius: 10,
    maxWidth: 430,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 40,
  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
  },
  modalText: {
    color: "#000900",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: "#007AFF",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
