import React, {useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Dimensions,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-reanimated-carousel';

const { width: screenWidth } = Dimensions.get('window');

type ButtonName = 'avatar' | 'wardrobe' | 'explorer';

const HomeScreen = ({ /*navigation */} : any ) => {
  const [activeIndex, setActiveIndex] = useState(0);
  //const carouselRef = useRef(null);

  // Animations séparées pour chaque bouton
  const buttonScales = useRef<Record<ButtonName, Animated.Value>>({
    avatar: new Animated.Value(1),
    wardrobe: new Animated.Value(1),
    explorer: new Animated.Value(1),
  }).current;

  const animatePress = (buttonName: ButtonName) => {
    Animated.sequence([
      Animated.timing(buttonScales[buttonName], {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScales[buttonName], {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Données pour le carousel
  const carouselData = [
    {
      id: 1,
      title: 'Nouvelle Collection Été',
      subtitle: 'Découvrez les dernières tendances',
      image: require('../assets/summer-banner.jpg'),
    },
    {
      id: 2,
      title: 'Style Personnalisé',
      subtitle: 'Créez des looks uniques',
      image: require('../assets/personal-style-banner.jpg'),
    },
    {
      id: 3,
      title: 'Promotions Exclusives',
      subtitle: "Jusqu'à -50% sur les articles sélectionnés",
      image: require('../assets/sale-banner.jpg'),
    },
  ];

  const renderCarouselItem = ({ item }: { item: Record<string, any> }) => {
    return (
      <View style={styles.carouselItem}>
        <ImageBackground
          source={item.image}
          style={styles.carouselImage}
          resizeMode="cover"
        >
          <View style={styles.carouselTextContainer}>
            <Text style={styles.carouselTitle}>{item.title}</Text>
            <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <ImageBackground
          source={require('../assets/fashion-header.jpg')}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <View style={styles.headerOverlay}>
            <Text style={styles.title}>Fashion Avatar</Text>
            <Text style={styles.subtitle}>Créez votre style unique</Text>
          </View>
        </ImageBackground>
      </View>

      {/* Carousel */}
      <View style={styles.carouselWrapper}>
  <Carousel
    width={screenWidth}
    height={200}
    data={carouselData}
    autoPlay
    autoPlayInterval={5000}
    loop
    scrollAnimationDuration={1000}
    onSnapToItem={(index) => setActiveIndex(index)}
    renderItem={renderCarouselItem}
  />
  <View style={styles.pagination}>
    {carouselData.map((_, index) => (
      <View
        key={index}
        style={[
          styles.paginationDot,
          activeIndex === index ? styles.activeDot : null,
        ]}
      />
    ))}
  </View>
</View>

      {/* Boutons Principaux */}
       <View style={styles.buttonsContainer}>
        <Animated.View style={{ transform: [{ scale: buttonScales.avatar }] }}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => {
              animatePress('avatar');
              //navigation.navigate('AvatarCreator');
            }}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <Icon name="face" size={28} color="#fff" style={styles.buttonIcon} />
              <View>
                <Text style={styles.buttonText}>Créer mon Avatar</Text>
                <Text style={styles.buttonSubtext}>Personnalisez votre apparence</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: buttonScales.wardrobe }] }}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => {
              animatePress('wardrobe');
              //navigation.navigate('Wardrobe');
            }}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <Icon name="checkroom" size={28} color="#fff" style={styles.buttonIcon} />
              <View>
                <Text style={styles.buttonText}>Ma Garde-Robe</Text>
                <Text style={styles.buttonSubtext}>Vos vêtements favoris</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: buttonScales.explorer }] }}>
          <TouchableOpacity
            style={[styles.button, styles.accentButton]}
            onPress={() => {
              animatePress('explorer');
              //navigation.navigate('StyleExplorer');
            }}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <Icon name="explore" size={28} color="#fff" style={styles.buttonIcon} />
              <View>
                <Text style={styles.buttonText}>Explorer les Styles</Text>
                <Text style={styles.buttonSubtext}>Découvrez les tendances</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Fonctionnalités */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Nos Fonctionnalités</Text>

        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <View style={[styles.featureIconWrapper, { backgroundColor: '#FF6B6B20' }]}>
              <Icon name="style" size={24} color="#FF6B6B" />
            </View>
            <Text style={styles.featureTitle}>10 000+ vêtements</Text>
            <Text style={styles.featureDescription}>Collection exhaustive pour tous les styles</Text>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIconWrapper, { backgroundColor: '#4ECDC420' }]}>
              <Icon name="trending-up" size={24} color="#4ECDC4" />
            </View>
            <Text style={styles.featureTitle}>Tendances 2024</Text>
            <Text style={styles.featureDescription}>Restez à jour avec les dernières modes</Text>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIconWrapper, { backgroundColor: '#FFA07A20' }]}>
              <Icon name="lightbulb" size={24} color="#FFA07A" />
            </View>
            <Text style={styles.featureTitle}>Suggestions intelligentes</Text>
            <Text style={styles.featureDescription}>Recommandations personnalisées</Text>
          </View>
        </View>
      </View>

      {/* Témoignage */}
      <View style={styles.testimonialSection}>
        <Text style={styles.sectionTitle}>Ce qu'ils disent de nous</Text>

        <View style={styles.testimonialCard}>
          <Image
            source={require('../assets/user-testimonial.jpg')}
            style={styles.testimonialImage}
          />
          <View style={styles.testimonialContent}>
            <Text style={styles.testimonialText}>
              "Fashion Avatar a révolutionné ma façon de m'habiller. Les suggestions sont toujours parfaites!"
            </Text>
            <Text style={styles.testimonialAuthor}>- Sophie, 28 ans</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    height: 250,
  },
  headerBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 5,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  carouselWrapper: {
    marginTop: -30,
    marginBottom: 20,
  },
  carouselItem: {
    width: screenWidth - 40,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  carouselImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  carouselTextContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  carouselSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FF6B6B',
    width: 20,
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  primaryButton: {
    backgroundColor: '#FF6B6B',
  },
  secondaryButton: {
    backgroundColor: '#4ECDC4',
  },
  accentButton: {
    backgroundColor: '#FFA07A',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  featureIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
  },
  testimonialSection: {
    paddingHorizontal: 20,
  },
  testimonialCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  testimonialImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  testimonialContent: {
    flex: 1,
  },
  testimonialText: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  testimonialAuthor: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
});

export default HomeScreen;