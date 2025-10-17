import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
        <NavBar
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onToggleMenu={toggleMenu}
          onToggleSearch={toggleSearch}
          isMenuOpen={menuOpen}
        />

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

        {menuOpen && (
          <NavMenu
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onClose={() => setMenuOpen(false)}
          />
        )}

        <View style={styles.textBlock}>
          <Text style={styles.heading}>EMPOWERING{"\n"}THE NATION</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, position: "relative" },
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
    color: "#000",
  },
  textBlock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 25,
  },
  heading: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 10,
    marginTop: 150,
    marginLeft: 30,
  },
});









