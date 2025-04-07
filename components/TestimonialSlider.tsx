import { View, FlatList, StyleSheet } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    image: require('../assets/fashion-header.jpg'),
    text: "Fashion Avatar a révolutionné ma façon de m'habiller. Les suggestions sont toujours parfaites!",
    author: "- Sophie, 28 ans",
  },
  {
    image: require('../assets/fashion-header1.jpg'),
    text: "Je me sens plus confiant·e en essayant les tenues sur un avatar qui me ressemble.",
    author: "- Marc, 22 ans",
  },
  {
    image: require('../assets/images/fashion-header2.jpg'),
    text: "DressUp, c’est comme avoir un styliste personnel dans ma poche.",
    author: "- Aïcha, 30 ans",
  },
];

const CARD_WIDTH = 300;

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Auto-scroll toutes les 4 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % testimonials.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={testimonials}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
          setIndex(newIndex);
        }}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <TestimonialCard
            image={item.image}
            text={item.text}
            author={item.author}
          />
        )}
        getItemLayout={(_, i) => ({
          length: CARD_WIDTH,
          offset: CARD_WIDTH * i,
          index: i,
        })}
      />

      <View style={styles.dots}>
        {testimonials.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === index ? '#000' : '#ccc' },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  dots: {
    flexDirection: 'row',
    marginTop: 12,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});
