import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import bannerMobile from "../assets/bannerMobile.png";
import logoBlack from "../assets/logoBlack.png";

function ResponsiveImage({ source, widthRatio = 0.45, aspectRatio = 3, style = {} }) {
  const { width } = useWindowDimensions();
  const imageWidth = width * widthRatio;
  const imageHeight = imageWidth / aspectRatio;

  return (
    <View style={styles.imageWrapper}>
      <Image
        source={source}
        style={[{ width: imageWidth, height: imageHeight, resizeMode: "contain" }, style]}
      />
    </View>
  );
}

export default function MobileLayout() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [menuVisible, setMenuVisible] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "6 Months", href: "/sixmonths" },
    { label: "6 Weeks", href: "/sixweeks" },
    { label: "Contact", href: "/contact" },
    { label: "Fees & Form", href: "/feesandform" },
  ];

  const searchButtonLeft = Math.round(width / 2 - 16);

  const NavLinks = ({ onClick }) => (
    <View style={styles.navLinksVertical}>
      {navItems.map(({ label, href }, i) => (
        <Link href={href} key={label} asChild>
          <TouchableOpacity
            onPress={() => {
              onClick && onClick();
              setActiveIndex(i);
            }}
            style={styles.navLinkItem}
          >
            <View
              style={[
                styles.navCircle,
                activeIndex === i ? styles.navCircleActive : styles.navCircleInactive,
              ]}
            />
            <Text
              style={[
                styles.navLinkText,
                activeIndex === i && styles.navLinkTextActive,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );

  return (
    <View style={styles.outerContainer}>
      <Image
        source={bannerMobile}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      <View style={styles.container}>
        <View style={styles.mobileNavBar}>
          <TouchableOpacity
            style={styles.logoTouchable}
            onPress={() => router.push("/")}
            accessibilityLabel="Go to Home"
          >
            <ResponsiveImage source={logoBlack} widthRatio={0.45} aspectRatio={3} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.searchButtonMobile, { left: searchButtonLeft }]}
            onPress={toggleSearch}
            accessibilityLabel="Toggle search"
          >
            <Ionicons name="search" size={28} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toggleMenu}
            style={styles.hamburgerButton}
            accessibilityLabel="Menu toggle"
          >
            <Ionicons name="menu" size={32} color="black" />
          </TouchableOpacity>

          <Modal visible={menuVisible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={toggleMenu}
                  style={styles.closeButton}
                  accessibilityLabel="Close menu"
                >
                  <Ionicons name="close" size={32} color="black" />
                </TouchableOpacity>
                <ScrollView>
                  <NavLinks onClick={toggleMenu} />
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>

        {searchOpen && (
          <View style={styles.searchBoxMobile}>
            <TextInput
              placeholder="Search for courses"
              style={styles.searchInput}
              autoFocus={true}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    width: "100%",
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  mobileNavBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  logoTouchable: {
    marginLeft: -80,
  },
  searchButtonMobile: {
    position: "absolute",
  },
  hamburgerButton: {
    marginLeft: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-start",
  },
  modalContent: {
    backgroundColor: "white",
    paddingTop: 40,
    paddingHorizontal: 30,
    paddingBottom: 60,
    minHeight: 300,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  navLinksVertical: {
    flexDirection: "column",
  },
  navLinkItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    marginRight: 20,
    marginBottom: 15,
  },
  navCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: "#000",
    marginRight: 8,
  },
  navCircleInactive: {
    backgroundColor: "transparent",
  },
  navCircleActive: {
    backgroundColor: "#000",
  },
  navLinkText: {
    fontSize: 18,
    color: "#181414ff",
  },
  navLinkTextActive: {
    fontWeight: "bold",
    color: "#000",
  },
  searchBoxMobile: {
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
  },
});
