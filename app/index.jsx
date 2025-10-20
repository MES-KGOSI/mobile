import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import NavBar from "../components/NavBar";
import NavMenu from "../components/NavMenu";
import bannerMobile from "../assets/images/bannerMobile.png";

export default function HomeScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchText, setSearchText] = useState("");

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleSearch = () => setSearchOpen((prev) => !prev);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={bannerMobile}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Dark overlay below nav */}
        <View style={styles.overlay} />

        {/* NavBar sits ABOVE overlay */}
        <View style={styles.navWrapper}>
          <NavBar
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onToggleMenu={toggleMenu}
            onToggleSearch={toggleSearch}
            isMenuOpen={menuOpen}
          />

          {searchOpen && (
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#000900" />
              <TextInput
                placeholder="Search..."
                placeholderTextColor="#000900"
                value={searchText}
                onChangeText={setSearchText}
                style={styles.searchInput}
              />
            </View>
          )}

          {menuOpen && (
            <NavMenu
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              onClose={() => setMenuOpen(false)}
            />
          )}
        </View>

        {/* Text content below nav but above overlay */}
        <View style={styles.textBlock}>
          <Text style={styles.heading}>EMPOWERING{"\n"}THE NATION</Text>

          <View style={styles.line} />

          <Text style={styles.paragraph}>
            Empowering the Nation was established in 2022 and offers courses in Johannesburg.
            Hundreds of domestic workers and gardeners have been trained on both the six-months 
            long Learnerships and six-weeks Short Skills Training Programs to empower themselves 
            and can provide more marketable skills. 
          </Text>

          <Link href="/sixmonths" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>GET STARTED</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: "relative",
  },

  /* Overlay stays behind nav */
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 9, 0, 0.5)", // 50% opacity #000900
    zIndex: 1,
  },

  /* Nav wrapper is ABOVE overlay */
  navWrapper: {
    zIndex: 3,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#000900",
  },

  textBlock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 25,
    zIndex: 2, // above overlay, below nav
  },
  heading: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 10,
    marginTop: 180,
    marginLeft: 30,
  },
  line: {
    width: 160,
    height: 2,
    backgroundColor: "#fff",
    marginTop: 10,
    marginLeft: 30,
  },
  paragraph: {
    color: "#fff",
    fontSize: 20,
    marginTop: 15,
    marginLeft: 30,
    marginRight: 15,
    lineHeight: 30,
    textAlign: "left"
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 25,
    marginLeft: 30,
  },
  buttonText: {
    color: "#000900",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});












