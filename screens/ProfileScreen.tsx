import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';

const ProfileScreen = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    style: '',
    size: '',
    bio: '',
    phone: '',
  });
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editable, setEditable] = useState(false);

  // Simuler le chargement des données utilisateur existantes
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile({
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        style: 'Streetwear',
        size: 'M',
        bio: 'Amateur de mode et de design',
        phone: '+33 6 12 34 56 78',
      });
      setIsLoading(false);
    };

    loadUserData();
  }, []);

  const handleChange = (name: string, value: string | number) => {
    setProfile((prev) => ({ ...prev, [name]: value }));
  };


  const handleSave = async () => {
    setIsLoading(true);
    // Simuler une requête API pour sauvegarder
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setEditable(false);
    Alert.alert('Succès', 'Votre profil a été mis à jour avec succès');
    console.log('Profil sauvegardé:', { ...profile, avatar });
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Permission d'accès à la caméra",
            message: "L'application a besoin d'accéder à votre caméra",
            buttonNeutral: 'Demander plus tard',
            buttonNegative: 'Annuler',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission refusée', 'Nous avons besoin de la permission pour accéder à votre appareil photo.');
      return;
    }

    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.8,
    }).then(image => {
      setAvatar(image.path);
    }).catch(err => {
      console.log(err);
    });
  };

  if (isLoading && !editable) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FF6F61" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Icon name="person" size={50} color="#fff" />
            </View>
          )}
          {editable && (
            <View style={styles.editAvatarIcon}>
              <Icon name="edit" size={18} color="#fff" />
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.title}>{profile.name || 'Profil Utilisateur'}</Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setEditable(!editable)}
        >
          <Icon name={editable ? 'close' : 'edit'} size={24} color="#FF6F61" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations Personnelles</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nom complet</Text>
          {editable ? (
            <TextInput
              style={styles.input}
              placeholder="Votre nom complet"
              value={profile.name}
              onChangeText={(text) => handleChange('name', text)}
            />
          ) : (
            <Text style={styles.value}>{profile.name}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          {editable ? (
            <TextInput
              style={styles.input}
              placeholder="Votre email"
              keyboardType="email-address"
              value={profile.email}
              onChangeText={(text) => handleChange('email', text)}
            />
          ) : (
            <Text style={styles.value}>{profile.email}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Téléphone</Text>
          {editable ? (
            <TextInput
              style={styles.input}
              placeholder="Votre numéro de téléphone"
              keyboardType="phone-pad"
              value={profile.phone}
              onChangeText={(text) => handleChange('phone', text)}
            />
          ) : (
            <Text style={styles.value}>{profile.phone}</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Préférences de Mode</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Style préféré</Text>
          {editable ? (
            <TextInput
              style={styles.input}
              placeholder="Votre style vestimentaire"
              value={profile.style}
              onChangeText={(text) => handleChange('style', text)}
            />
          ) : (
            <Text style={styles.value}>{profile.style}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Taille</Text>
          {editable ? (
            <TextInput
              style={styles.input}
              placeholder="Votre taille vestimentaire"
              value={profile.size}
              onChangeText={(text) => handleChange('size', text)}
            />
          ) : (
            <Text style={styles.value}>{profile.size}</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>À propos</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bio</Text>
          {editable ? (
            <TextInput
              style={[styles.input, styles.bioInput]}
              placeholder="Décrivez-vous en quelques mots..."
              multiline
              numberOfLines={4}
              value={profile.bio}
              onChangeText={(text) => handleChange('bio', text)}
            />
          ) : (
            <Text style={styles.value}>{profile.bio || 'Aucune description'}</Text>
          )}
        </View>
      </View>

      {editable && (
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
          )}
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FF5046',
    marginBottom: 20,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
  editButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FF6F61',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  editAvatarIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF6F61',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F61',
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  value: {
    fontSize: 16,
    paddingVertical: 10,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;