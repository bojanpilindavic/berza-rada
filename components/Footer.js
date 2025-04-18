import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import About from './About';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';
import Contact from './Contact';

const Footer = () => {
  const [visibleModal, setVisibleModal] = useState(null);

  const openModal = (key) => setVisibleModal(key);
  const closeModal = () => setVisibleModal(null);

  const links = [
    { label: 'O nama', key: 'About' },
    { label: 'Uslovi korišćenja', key: 'Terms' },
    { label: 'Politika privatnosti', key: 'Privacy' },
    { label: 'Kontakt', key: 'Contact' },
  ];

  const renderModalContent = () => {
    switch (visibleModal) {
      case 'About':
        return <About />;
      case 'Terms':
        return <TermsOfService />;
      case 'Privacy':
        return <PrivacyPolicy />;
      case 'Contact':
        return <Contact />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.linksWrapper}>
        {links.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => openModal(item.key)}
            style={styles.linkContainer}
          >
            <Text style={styles.linkText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.copyText}>© {new Date().getFullYear()} Berza rada</Text>

      <Modal
        visible={!!visibleModal}
        animationType="slide"
        onRequestClose={closeModal}
        transparent={false}
      >
        <SafeAreaView style={styles.modalWrapper}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {renderModalContent()}
          </ScrollView>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✖ Zatvori</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingVertical: 25,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
    alignItems: 'center',
  },
  linksWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    rowGap: 10,
  },
  linkContainer: {
    marginHorizontal: 8,
  },
  linkText: {
    fontSize: 14,
    color: '#5B8DB8',
    fontWeight: '600',
  },
  copyText: {
    marginTop: 15,
    fontSize: 12,
    color: '#aaa',
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 20,
  },
  closeButton: {
    backgroundColor: '#5B8DB8',
    paddingVertical: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Footer;
