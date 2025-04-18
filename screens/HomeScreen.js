// HomeScreen.js
import React from "react";
import { SafeAreaView, ScrollView, StatusBar } from "react-native";
import Header from "../components/Header";  // Proverite putanju do komponente
import JobCategories from "../components/JobCategories";  // Proverite putanju
import NajnovijiOglasi from "../components/NajnovijiOglasi";  // Proverite putanju
import PretragaOpstina from "../components/PretragaOpstina";  // Proverite putanju
import Footer from "../components/Footer";
import NajtrazenijiOglasi from "../components/NajtrazenijiOglasi";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: StatusBar.currentHeight }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header />
        <JobCategories />
        <NajtrazenijiOglasi />
        <NajnovijiOglasi />
        <PretragaOpstina />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
