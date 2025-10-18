import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import NavMenu from "../components/NavMenu";
import logoBlack from "../assets/images/logoBlack.png"; // Black logo image

export default function FeesAndForm() {
  const [activeIndex, setActiveIndex] = useState(3); // Contact page active
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      {/* Top Nav */}
      <View style={[styles.topNav, { backgroundColor: "" }]}>
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
            <Ionicons name="search" size={30} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setMenuOpen((prev) => !prev)}>
          <Ionicons name={menuOpen ? "close" : "menu"} size={32} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {menuOpen && (
        <NavMenu
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onClose={() => setMenuOpen(false)}
          menuBackground="#f0f0f0"
          textColor="#000"
          activeTextColor="#007AFF"
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

      {/* Page Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>Fees And Form Page</Text>
        {/* Add your contact page content here */}
      </ScrollView>
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
     marginTop: 20
  },

  logoTouchable: {
    marginLeft: -90,
    marginTop: 20, // push logo down a bit
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: "contain",
  },

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
    backgroundColor: "#535252ff",
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

  content: {
    paddingTop: 120,
    paddingHorizontal: 20,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});