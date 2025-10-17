import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Import images
import bannerMobile from "../assets/images/bannerMobile.png";
import logoBlack from "../assets/images/logo_white.png";

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWeb = width >= 768;

  const [menuVisible, setMenuVisible] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchText, setSearchText] = useState("");

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "6 Months", href: "/SixmonthsScreen" },
    { label: "6 Weeks", href: "/SixweeksScreen" },
    { label: "Contact", href: "/ContactScreen" },
  ];

  const NavLinks = ({ onClick }) => (
    <View style={styles.navLinksVertical}>
      {navItems.map(({ label, href }, i) => (
        <TouchableOpacity
          key={label}
          onPress={() => {
            setActiveIndex(i);
            onClick && onClick();
            router.push(href);
          }}
          style={styles.navLinkItem}
        >
          <View
            style={[
              styles.navCircle,
              activeIndex === i
                ? styles.navCircleActive
                : styles.navCircleInactive,
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
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={bannerMobile}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Dark overlay behind nav and text only */}
        <View style={styles.partialOverlay} />

        {/* Top Navigation */}
        {!isWeb && (
          <View style={styles.topNav}>
            <Link href="/" asChild>
              <TouchableOpacity
                onPress={() => {
                  setActiveIndex(0);
                  router.push("/");
                }}
                style={styles.logoTouchable}
              >
                <Image source={logoBlack} style={styles.logo} />
              </TouchableOpacity>
            </Link>

            <View style={styles.centerIconContainer}>
              <TouchableOpacity onPress={toggleSearch}>
                <Ionicons name="search" size={30} color="#fff" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={toggleMenu}>
              <Ionicons name="menu" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        {/* Search Bar */}
        {searchOpen && (
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#555" />
            <TextInput
              placeholder="Search..."
              placeholderTextColor="#777"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
            />
          </View>
        )}

        {/* Dropdown Menu */}
        {menuVisible && (
          <View style={styles.menuContainer}>
            <NavLinks onClick={() => setMenuVisible(false)} />
          </View>
        )}

        {/* Main Content */}
        <View style={styles.textBlock}>
          <Text style={styles.heading}>EMPOWERING{"\n"}THE NATION</Text>
          <View style={styles.divider} />
          <Text style={styles.paragraph}>
            Empowering the Nation was established in 2022 and offers courses in
            Johannesburg. Hundreds of domestic workers and gardeners have been
            trained on both the six-months long Learnerships and six-weeks Short
            Skills Training Programs to empower themselves and provide more
            marketable skills.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/SixmonthsScreen")}
          >
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, position: "relative" },

  /** Partial transparent overlay behind nav + text **/
  partialOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    zIndex: 1,
  },

  /** NAVIGATION BAR **/
  topNav: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    paddingHorizontal: 15,
    zIndex: 2,
  },
  logoTouchable: {
    marginLeft: -90,
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: "contain",
  },
  centerIconContainer: {
    position: "absolute",
    left: "50%",
    height: 100,
    justifyContent: "center",
    transform: [{ translateX: -0 }],
  },

  /** MENU **/
  menuContainer: {
    position: "absolute",
    top: 120,
    left: 15,
    right: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
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
    color: "#000",
  },

  /** MAIN CONTENT **/
  textBlock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 25,
    zIndex: 2,
  },
  heading: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "left",
    letterSpacing: 10,
    marginTop: 150,
    marginLeft: 30,
  },
  divider: {
    width: 150,
    height: 2,
    backgroundColor: "#fff",
    marginVertical: 10,
    marginLeft: 30,
  },
  paragraph: {
    color: "#fff",
    fontSize: 16,
    textAlign: "left",
    lineHeight: 24,
    paddingRight: 20,
    marginBottom: 25,
    marginLeft: 30,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginLeft: 30,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },

  /** MENU LINKS **/
  navLinksVertical: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },
  navLinkItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  navCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  navCircleActive: { backgroundColor: "#007AFF" },
  navCircleInactive: { backgroundColor: "#ccc" },
  navLinkText: { fontSize: 16, color: "#000" },
  navLinkTextActive: { fontWeight: "bold", color: "#007AFF" },
});







