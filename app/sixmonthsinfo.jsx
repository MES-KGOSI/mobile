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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import NavMenu from "../components/NavMenu";
import logoBlack from "../assets/images/logoBlack.png";
import firstAidImg from "../assets/images/firstaid.png";
import sewingImg from "../assets/images/sewing.png";
import landscapingImg from "../assets/images/landscaping.png";
import lifeSkillsImg from "../assets/images/lifeskills.png";

export default function SixMonthsInfo() {
  const { width } = useWindowDimensions();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const courses = [
    {
      id: "01",
      title: "FIRST AID",
      bullets: [
        "Wounds and bleeding.",
        "Burns and fractures.",
        "Emergency scene management.",
        "Cardio-Pulmonary Resuscitation (CPR).",
        "Respiratory distress e.g., Choking, blocked airway.",
      ],
      image: firstAidImg,
    },
    {
      id: "02",
      title: "SEWING",
      bullets: [
        "Types of stitches.",
        "Threading a sewing machine.",
        "Sewing buttons, zips, hems and seams.",
        "Alterations.",
        "Designing and sewing new garments.",
      ],
      image: sewingImg,
    },
    {
      id: "03",
      title: "LANDSCAPING",
      bullets: [
        "Indigenous and exotic plants and trees.",
        "Fixed structures (fountains, statues, benches, tables, built-in braai).",
        "Balancing of plants and trees in a garden.",
        "Aesthetics of plant shapes and colours.",
        "Garden layout",
      ],
      image: landscapingImg,
    },
    {
      id: "04",
      title: "LIFE SKILLS",
      bullets: [
        "Opening a bank account.",
        "Basic labour law (know your rights).",
        "Basic reading and writing literacy.",
        "Basic numeric literacy.",
      ],
      image: lifeSkillsImg,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Top Nav */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.push("/")} style={styles.logoTouchable}>
          <Image source={logoBlack} style={styles.logo} />
        </TouchableOpacity>

        <View style={styles.centerIconContainer}>
          <TouchableOpacity onPress={() => setSearchOpen((prev) => !prev)}>
            <Ionicons name="search" size={30} color="#000900" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setMenuOpen((prev) => !prev)}>
          <Ionicons name={menuOpen ? "close" : "menu"} size={32} color="#000900" />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {menuOpen && (
        <NavMenu
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

      {/* Scrollable Courses */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {courses.map((course) => (
          <View key={course.id} style={styles.card}>
            {/* Number and line */}
            <View style={styles.numberLine}>
              <Text style={styles.courseNumber}>{course.id}</Text>
              <View style={styles.line} />
            </View>

            {/* Heading */}
            <Text style={styles.cardTitle}>{course.title}</Text>

            {/* Bullets */}
            <View style={styles.bulletsContainer}>
              {course.bullets.map((b, i) => (
                <Text key={i} style={styles.bulletText}>
                  • {b}
                </Text>
              ))}
            </View>

            {/* Image with overlay */}
            <View style={styles.imageWrapper}>
              <Image source={course.image} style={styles.cardImage} />
              <View style={styles.cardOverlay} />

              {/* APPLY navigates to feesandform.jsx */}
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => router.push("/feesandform")}
              >
                <Text style={styles.applyText}>APPLY</Text>
              </TouchableOpacity>

              <Text style={styles.priceText}>R 1500</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  topNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    paddingHorizontal: 15,
    zIndex: 10,
    marginTop: 20,
  },
  logoTouchable: { marginLeft: -90 },
  logo: { width: 250, height: 100, resizeMode: "contain" },
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

  scrollContent: { paddingVertical: 30, paddingHorizontal: 20, gap: 25 },
  card: {
    position: "relative",
    borderRadius: 18,
    overflow: "hidden",
    height: 750,
  },
  numberLine: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  courseNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000900",
    marginBottom: 4,
  },
  line: {
    width: "100%",
    height: 2,
    backgroundColor: "#000900",
  },

  cardTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000900",
    letterSpacing: 1,
  },
  bulletsContainer: { marginBottom: 15 },
  bulletText: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 22,
    marginBottom: 10,
  },

  imageWrapper: {
    position: "relative",
    alignItems: "center",
    marginBottom: 15,
    height: "100%",
  },
  cardImage: {
    width: "100%",
    height: "70%",
    borderRadius: 12,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 12,
  },

  applyBtn: {
    position: "absolute",
    top: "30%",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 8,
  },
  applyText: {
    fontWeight: "bold",
    color: "#000900",
    fontSize: 20,
    letterSpacing: 1,
  },
  priceText: {
    position: "absolute",
    top: "45%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },
});




