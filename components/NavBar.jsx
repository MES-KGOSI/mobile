import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import logoBlack from "../assets/images/logo_white.png";

const pageToIndexMap = {
  "/": 0,
  "/sixmonths": 1,
  "/sixweeks": 2,
  "/contact": 3,
};

export default function NavBar({
  activeIndex,
  setActiveIndex,
  onToggleMenu,
  onToggleSearch,
  isMenuOpen,
}) {
  const handleSetActiveByHref = (href) => {
    const index = pageToIndexMap[href];
    if (index !== undefined) {
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.topNav}>
      <Link href="/" asChild>
        <TouchableOpacity
          onPress={() => handleSetActiveByHref("/")}
          style={styles.logoTouchable}
        >
          <Image source={logoBlack} style={styles.logo} />
        </TouchableOpacity>
      </Link>

      <View style={styles.centerIconContainer}>
        <TouchableOpacity
          onPress={() => onToggleSearch && onToggleSearch()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="search" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => onToggleMenu && onToggleMenu()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name={isMenuOpen ? "close" : "menu"} size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topNav: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    paddingHorizontal: 15,
    position: "relative",
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
    transform: [{ translateX: 10 }],
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});



