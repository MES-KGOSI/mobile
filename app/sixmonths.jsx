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
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import NavMenu from "../components/NavMenu";
import logoWhite from "../assets/images/logo_white.png";
import WaterGardenMobile from "../assets/images/Water_garden_mobile.png";
import moreDetailsIcon from "../assets/icons/more_details.png"; // Custom arrow icon

export default function SixMonths() {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      {/* HEADER IMAGE WITH OVERLAY */}
      <View style={styles.headerContainer}>
        <Image
          source={WaterGardenMobile}
          style={[styles.headerImage, { width }]}
          resizeMode="cover"
        />
        <View style={styles.overlay} />

        {/* NAV BAR */}
        <View style={styles.topNav}>
          <Link href="/" asChild>
            <TouchableOpacity onPress={() => setActiveIndex(0)}>
              <Image source={logoWhite} style={styles.logo} />
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

        {/* SEARCH BAR ON TOP OF IMAGE */}
        {searchOpen && (
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#000900"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search..."
              placeholderTextColor="#000900"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
            />
          </View>
        )}

        {/* HEADER TITLE */}
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>SIX MONTHS</Text>
          <Text style={styles.headerText}>COURSES</Text>
          <View style={styles.headerUnderline} />
        </View>
      </View>

      {/* MENU OVERLAY */}
      {menuOpen && (
        <NavMenu
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onClose={() => setMenuOpen(false)}
        />
      )}

      {/* SCROLL CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {[
          {
            title: "FIRST AID",
            desc: "Purpose: To provide first aid awareness and basic life support.",
            image: require("../assets/images/firstaid.png"),
          },
          {
            title: "SEWING",
            desc: "Purpose: To provide alterations and new garment tailoring services.",
            image: require("../assets/images/sewing.png"),
          },
          {
            title: "LANDSCAPING",
            desc: "Purpose: To provide landscaping services for new and established gardens.",
            image: require("../assets/images/landscaping.png"),
          },
          {
            title: "LIFE SKILLS",
            desc: "Purpose: To provide skills to navigate basic life necessities.",
            image: require("../assets/images/lifeskills.png"),
          },
        ].map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.cardOverlay} />

            <View style={styles.cardContent}>
              <View style={styles.textWrapper}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardUnderline} />
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </View>

              <Link href="/sixmonthsinfo" asChild>
  <TouchableOpacity
    style={{
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      alignSelf: "flex-start", // aligns with left-aligned text
      marginLeft: 25, // shift right a bit
    }}
  >
    <Text
      style={{
        color: "#fff",
        fontWeight: "600",
        fontSize: 20,
        letterSpacing: 1,
      }}
    >
      MORE DETAILS HERE
    </Text>
    <Image
      source={moreDetailsIcon}
      style={{
        width: 50, // adjust size
        height: 50,
        marginLeft: 30, // move icon slightly to the right
        resizeMode: "contain",
      }}
    />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  headerContainer: {
    position: "relative",
    height: 340,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 9, 0, 0.5)",
  },

  topNav: {
    position: "absolute",
    top: 20,
    left: -80,
    right: 15,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: "contain",
  },
  centerIconContainer: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: 35 }],
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  searchContainer: {
    position: "absolute",
    top: 130,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000900",
    marginLeft: 8,
  },

  headerTextContainer: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  headerUnderline: {
    marginTop: 10,
    width: 100,
    height: 2,
    backgroundColor: "#fff",
  },

  scrollContent: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    gap: 25,
  },

  card: {
    position: "relative",
    borderRadius: 18,
    overflow: "hidden",
    height: 420,
  },
  cardImage: { width: "100%", height: "100%" },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
  },

 // Center text container vertically relative to image
  cardContent: {
    position: "absolute",
    top: "40%", // vertical center
    left: 50,
    right: 50,
    transform: [{ translateY: -90 }], // adjust based on content height
    alignItems: "center",
  },
  textWrapper: {
    width: "85%",
    alignSelf: "center",
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "left",
    letterSpacing: 1,
  },
  cardUnderline: {
    marginTop: 6,
    marginBottom: 8,
    width: 80,
    height: 2,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  cardDesc: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "medium",
    marginBottom: 15,
    textAlign: "left",
    lineHeight: 36,
    letterSpacing: 1,
  },
  moreText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
  moreIcon: {
    width: 20,
    height: 20,
  },
});