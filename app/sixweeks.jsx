import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import NavMenu from "../components/NavMenu";
import logoBlack from "../assets/images/logo_white.png";
import WaterGardenMobile from "../assets/images/Water_garden_mobile.png";

export default function SixWeeks() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(2);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState(""); // <-- declare state

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={WaterGardenMobile}
        style={[styles.navBackground, { width: width }]}
        resizeMode="contain"
        pointerEvents="none"
      />

      {/* Top Nav */}
      <View style={styles.topNav}>
        <Link href="/" asChild>
          <TouchableOpacity onPress={() => setActiveIndex(0)} style={styles.logoTouchable}>
            <Image source={logoBlack} style={styles.logo} />
          </TouchableOpacity>
        </Link>

        <View style={styles.centerIconContainer}>
          <TouchableOpacity onPress={() => setSearchOpen((prev) => !prev)}>
            <Ionicons name="search" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setMenuOpen((prev) => !prev)}>
          <Ionicons name={menuOpen ? "close" : "menu"} size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {menuOpen && (
        <NavMenu
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onClose={() => setMenuOpen(false)}
        />
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

      {/* Page content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>Six Weeks Page</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  navBackground: {
    position: "absolute",
    top: -480,
    left: 0,
    width: "100%",
  },

  topNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    paddingHorizontal: 15,
    marginTop: 20,
    zIndex: 10,
  },

  logoTouchable: { 
    marginLeft: -90

   },
  logo: { width: 250,
    height: 100,
    resizeMode: "contain" },

  centerIconContainer: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: 0 }],
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    zIndex: 20,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#000",
  },

  content: {
    paddingTop: 120,
    paddingHorizontal: 20,
  },

  pageTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});