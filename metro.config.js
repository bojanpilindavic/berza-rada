// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Omogućimo .cjs fajlove (za neke Firebase pakete)
config.resolver.sourceExts.push("cjs");

// KLJUČNA LINIJA koja otklanja grešku “Component auth has not been registered yet”
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
