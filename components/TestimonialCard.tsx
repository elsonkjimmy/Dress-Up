// components/TestimonialCard.tsx
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

type Props = {
  image: ImageSourcePropType;
  text: string;
  author: string;
};

export default function TestimonialCard({ image, text, author }: Props) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.text}>“{text}”</Text>
        <Text style={styles.author}>{author}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 12,
  },
  text: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#333',
  },
  author: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#777',
  },
});
