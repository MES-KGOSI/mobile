import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";

export default function NavMenu({ activeIndex, setActiveIndex, onClose }) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "6 Months", href: "/sixmonths" },
    { label: "6 Weeks", href: "/sixweeks" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <View style={styles.menuContainer}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {navItems.map(({ label, href }, i) => (
          <Link
            key={label}
            href={href}
            asChild
            onPress={() => {
              setActiveIndex(i);
              if (typeof onClose === "function") onClose();
            }}
          >
            <TouchableOpacity style={styles.navLinkItem} activeOpacity={0.7}>
              <View style={styles.linkRow}>
                {/* Circle is always present, just change color if active */}
                <View
                  style={[
                    styles.circle,
                    activeIndex === i && styles.activeCircle,
                  ]}
                />
                <Text
                  style={[
                    styles.navLinkText,
                    activeIndex === i && styles.activeText,
                  ]}
                >
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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

  navLinkItem: {
    paddingVertical: 8,
  },

  linkRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  navLinkText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 10, // space between circle and text
  },

  activeText: {
    color: "#007AFF",
    fontWeight: "bold",
  },

  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#007AFF",
    marginRight: 8,
  },

  activeCircle: {
    backgroundColor: "#007AFF",
  },
});





