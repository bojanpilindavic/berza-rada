// HomeScreen.js
import React from "react";
import { SafeAreaView, ScrollView, StatusBar } from "react-native";
import Header from "../components/Header";  // Proverite putanju do komponente
import JobCategories from "../components/JobCategories";  // Proverite putanju
import PremiumJobs from "../components/PremiumJobs";  // Proverite putanju
import NajnovijiOglasi from "../components/NajnovijiOglasi";  // Proverite putanju
import PretragaOpstina from "../components/PretragaOpstina";  // Proverite putanju
import JobSearchFilter from "../components/JobSearchFilter";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: StatusBar.currentHeight }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header />
        <JobCategories />
        <PremiumJobs />
        <NajnovijiOglasi />
        <PretragaOpstina />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
