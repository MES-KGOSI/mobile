import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Image,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import NavMenu from "../components/NavMenu";
import logoBlack from "../assets/images/logoBlack.png";

export default function FeesAndForm() {
  const [activeIndex, setActiveIndex] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showTotal, setShowTotal] = useState(false); // 👈 Controls visibility of total

  // Course checkboxes
  const [courses, setCourses] = useState({
    firstAid: false,
    sewing: false,
    landscaping: false,
    lifeSkills: false,
    childMinding: false,
    cooking: false,
    garden: false,
  });

  // Calculator states
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [vat, setVat] = useState(0);
  const [total, setTotal] = useState(0);

  // Venue dropdown
  const [venue, setVenue] = useState("");

  // Update subtotal and VAT automatically
  useEffect(() => {
    let totalAmount = 0;

    // 6 Months courses (R1500 each)
    if (courses.firstAid) totalAmount += 1500;
    if (courses.sewing) totalAmount += 1500;
    if (courses.landscaping) totalAmount += 1500;
    if (courses.lifeSkills) totalAmount += 1500;

    // 6 Weeks courses (R750 each)
    if (courses.childMinding) totalAmount += 750;
    if (courses.cooking) totalAmount += 750;
    if (courses.garden) totalAmount += 750;

    const discountValue = parseFloat(discount) || 0;
    const vatValue = (totalAmount - discountValue) * 0.15;
    const finalTotal = totalAmount - discountValue + vatValue;

    setSubtotal(totalAmount);
    setVat(vatValue);
    setTotal(finalTotal);
  }, [courses, discount]);

  const toggleCourse = (course) => {
    setCourses((prev) => ({ ...prev, [course]: !prev[course] }));
    setShowTotal(false); // Hide total again when selections change
  };

  const handleGetQuote = () => {
    setShowTotal(true); // 👈 Show total when button pressed
  };

  return (
    <View style={styles.container}>
      {/* Top Nav */}
      <View style={styles.topNav}>
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
            <Ionicons name="search" size={30} color="#000900" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setMenuOpen((prev) => !prev)}>
          <Ionicons
            name={menuOpen ? "close" : "menu"}
            size={32}
            color="#000900"
          />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {menuOpen && (
        <NavMenu
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
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

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* SECTION 01 - DETAILS */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>01</Text>
          <View style={styles.line} />
          <Text style={styles.sectionTitle}>DETAILS</Text>
          

          <Text style={styles.label}>NAME</Text>
          <TextInput style={styles.input} />

          <Text style={styles.label}>PHONE NUMBER</Text>
          <TextInput style={styles.input} keyboardType="phone-pad" />

          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <TextInput style={styles.input} keyboardType="email-address" />

          <Text style={styles.label}>You can select more than one course</Text>

          {/* 6 Months Courses */}
          <Text style={[styles.label, { marginTop: 10 }]}>SIX MONTHS COURSES</Text>
          {[
            ["firstAid", "First Aid – R1500"],
            ["sewing", "Sewing – R1500"],
            ["landscaping", "Landscaping – R1500"],
            ["lifeSkills", "Life Skills – R1500"],
          ].map(([key, label]) => (
            <TouchableOpacity
              key={key}
              style={styles.checkboxContainer}
              onPress={() => toggleCourse(key)}
            >
              <Ionicons
                name={courses[key] ? "checkbox" : "square-outline"}
                size={24}
                color="#000900"
              />
              <Text style={styles.checkboxLabel}>{label}</Text>
            </TouchableOpacity>
          ))}

          {/* 6 Weeks Courses */}
          <Text style={[styles.label, { marginTop: 10 }]}>SIX WEEKS COURSES</Text>
          {[
            ["childMinding", "Child Minding – R750"],
            ["cooking", "Cooking – R750"],
            ["garden", "Garden Maintenance – R750"],
          ].map(([key, label]) => (
            <TouchableOpacity
              key={key}
              style={styles.checkboxContainer}
              onPress={() => toggleCourse(key)}
            >
              <Ionicons
                name={courses[key] ? "checkbox" : "square-outline"}
                size={24}
                color="#000900"
              />
              <Text style={styles.checkboxLabel}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* SECTION 02 - CALCULATION OF QUOTE */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>02</Text>
          <View style={styles.line} />
          <Text style={styles.sectionTitle}>CALCULATION OF QUOTE</Text>
          

          <Text style={styles.label}>SUBTOTAL</Text>
          <TextInput
            style={styles.input}
            value={`R${subtotal.toFixed(2)}`}
            editable={false}
          />

          <Text style={styles.label}>DISCOUNT</Text>
          <TextInput
            style={styles.input}
            value={discount.toString()}
            onChangeText={setDiscount}
            keyboardType="numeric"
          />

          <Text style={styles.label}>VAT (15%)</Text>
          <TextInput
            style={styles.input}
            value={`R${vat.toFixed(2)}`}
            editable={false}
          />

          {/* 👇 Show only when "GET A QUOTE" is pressed */}
          {showTotal && (
            <>
              <Text style={styles.label}>TOTAL QUOTE</Text>
              <TextInput
                style={styles.input}
                value={`R${total.toFixed(2)}`}
                editable={false}
              />
            </>
          )}

          {/* APPLY BUTTON */}
          <TouchableOpacity style={styles.applyBtn}>
            <Text style={styles.applyText}>APPLY</Text>
          </TouchableOpacity>

          {/* GET A QUOTE BUTTON */}
          <TouchableOpacity style={styles.quoteBtn} onPress={handleGetQuote}>
            <Text style={styles.quoteText}>GET A QUOTE</Text>
          </TouchableOpacity>
        </View>

        {/* SECTION 03 - CONTACT FORM */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>03</Text>
          <View style={styles.line} />
          <Text style={styles.sectionTitle}>CONTACT FORM</Text>
          

          <Text style={styles.label}>NAME</Text>
          <TextInput style={styles.input} />

          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <TextInput style={styles.input} keyboardType="email-address" />

          <Text style={styles.label}>SELECT A VENUE</Text>
          <View style={styles.dropdown}>
            <Picker selectedValue={venue} onValueChange={(value) => setVenue(value)}>
              <Picker.Item label="-- Please choose an option --" value="" />
              <Picker.Item label="Alexandra" value="Alexandra" />
              <Picker.Item label="Sharpeville" value="Sharpeville" />
              <Picker.Item label="Soweto" value="Soweto" />
            </Picker>
          </View>

          <Text style={styles.label}>MESSAGE</Text>
          <TextInput multiline numberOfLines={4} style={[styles.input, styles.messageInput]} />

          <TouchableOpacity style={styles.submitBtn} onPress={() => setShowModal(true)}>
            <Text style={styles.submitText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              Thank you for your message, we will get back to your request at our earliest convenience.
            </Text>
            <Link href="/" asChild>
              <TouchableOpacity
                style={styles.homeBtn}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.homeBtnText}>CONTINUE TO HOME</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </Modal>
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
  },
  searchInput: { 
    flex: 1, 
    color: "#fff", 
    fontSize: 16 
  },
  scrollContent: { 
    paddingVertical: 30, 
    paddingHorizontal: 20, 
    gap: 50 
  },
  section: { 
    marginBottom: 30 
  },
  sectionNumber: { 
    fontSize: 32, 
    fontWeight: "bold", 
    color: "#000900" 
  },
  sectionTitle: { 
    fontSize: 32,
    letterSpacing:1, 
    fontWeight: "bold", 
    color: "#000900" 
  },
  line: { 
    width: "100%", 
    height: 2, 
    backgroundColor: "#000900", 
    marginVertical: 10 
  },
  label: { 
    fontSize: 18,
    fontWeight: "bold",
    color: "#000900", 
    marginBottom: 5, 
    marginTop: 8, 
    fontWeight: "600" 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  messageInput: { 
    height: 120, 
    textAlignVertical: "top" 
  },
  checkboxContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginVertical: 4 
  },
  checkboxLabel: { 
    color: "#000900", 
    fontSize: 16,
    fontWeight:"bold", 
    marginLeft: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  applyBtn: {
    backgroundColor: "#000900",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  applyText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 18,
    letterSpacing: 1,
  },
  quoteBtn: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  quoteText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 18,
    letterSpacing: 1,
  },
  submitBtn: {
    backgroundColor: "#000900",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 18,
    letterSpacing: 1, 
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
  },
  modalText: { 
    color: "#000900", 
    fontSize: 16, 
    textAlign: "center", 
    marginBottom: 20 
  },
  homeBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  homeBtnText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16,
    letterSpacing: 1,
  },
});




