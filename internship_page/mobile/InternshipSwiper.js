// React Native Tinder-style Swipe Card Component
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanGestureHandler,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { State } from 'react-native-gesture-handler';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SwipeCard = ({ internship, onSwipe, style }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const rotate = translateX.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: ['-30deg', '0deg', '30deg'],
    extrapolate: 'clamp',
  });

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX } = event.nativeEvent;
      const threshold = screenWidth * 0.3;

      if (Math.abs(translationX) > threshold) {
        const direction = translationX > 0 ? 'right' : 'left';

        Animated.timing(translateX, {
          toValue: direction === 'right' ? screenWidth : -screenWidth,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onSwipe(direction, internship);
        });
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[
          styles.card,
          style,
          {
            transform: [
              { translateX },
              { translateY },
              { rotate },
            ],
          },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardHeader}>
            <Image source={{ uri: internship.logo }} style={styles.logo} />
            <View style={styles.matchBadge}>
              <Text style={styles.matchText}>{internship.matchPercentage}% Match</Text>
            </View>
          </View>

          <Text style={styles.companyName}>{internship.company}</Text>
          <Text style={styles.roleName}>{internship.role}</Text>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>📍</Text>
              <Text style={styles.detailText}>{internship.location}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>💰</Text>
              <Text style={styles.detailText}>{internship.stipend}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>⏱️</Text>
              <Text style={styles.detailText}>{internship.duration}</Text>
            </View>
          </View>

          <Text style={styles.description}>{internship.description}</Text>

          <View style={styles.skillsContainer}>
            <Text style={styles.skillsLabel}>Required Skills:</Text>
            <View style={styles.skillsList}>
              {internship.skills.map((skill, index) => (
                <View key={index} style={styles.skillTag}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.passButton]}
            onPress={() => onSwipe('left', internship)}
          >
            <Text style={styles.actionText}>✕</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.applyButton]}
            onPress={() => onSwipe('right', internship)}
          >
            <Text style={styles.actionText}>♥</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const InternshipSwiper = () => {
  const [internships, setInternships] = useState([
    {
      id: 1,
      company: "TechCorp Solutions",
      role: "Machine Learning Intern",
      location: "Bangalore",
      stipend: "₹25,000/month",
      duration: "3 months",
      skills: ["Python", "Machine Learning", "TensorFlow"],
      description: "Work on AI models for recommendation systems and contribute to cutting-edge machine learning projects.",
      matchPercentage: 95,
      logo: "https://via.placeholder.com/100x100/007bff/ffffff?text=TC"
    },
    {
      id: 2,
      company: "WebDev Studios",
      role: "Frontend Developer Intern",
      location: "Mumbai",
      stipend: "₹20,000/month",
      duration: "4 months",
      skills: ["React.js", "JavaScript", "HTML/CSS"],
      description: "Build responsive web applications using modern technologies and collaborate with design teams.",
      matchPercentage: 88,
      logo: "https://via.placeholder.com/100x100/28a745/ffffff?text=WD"
    },
    {
      id: 3,
      company: "DataFlow Analytics",
      role: "Data Science Intern",
      location: "Hyderabad",
      stipend: "₹22,000/month",
      duration: "6 months",
      skills: ["Python", "Data Analysis", "SQL"],
      description: "Analyze large datasets and create predictive models for business intelligence solutions.",
      matchPercentage: 92,
      logo: "https://via.placeholder.com/100x100/17a2b8/ffffff?text=DF"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction, internship) => {
    console.log(`Swiped ${direction} on ${internship.company}`);

    if (direction === 'right') {
      applyForInternship(internship.id);
    }

    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const applyForInternship = async (internshipId) => {
    try {
      const response = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          internship_id: internshipId,
          action: 'like'
        })
      });

      const result = await response.json();
      if (result.success) {
        console.log('Application submitted successfully!');
      }
    } catch (error) {
      console.error('Error applying for internship:', error);
    }
  };

  const currentInternship = internships[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover Internships</Text>
      <Text style={styles.subtitle}>Swipe right to apply, left to pass</Text>

      {currentInternship ? (
        <View style={styles.cardContainer}>
          <SwipeCard
            internship={currentInternship}
            onSwipe={handleSwipe}
          />
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>🎉</Text>
          <Text style={styles.emptyTitle}>All done!</Text>
          <Text style={styles.emptySubtitle}>You've reviewed all internships</Text>
          <TouchableOpacity 
            style={styles.reloadButton}
            onPress={() => setCurrentIndex(0)}
          >
            <Text style={styles.reloadText}>Start Over</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${(currentIndex / internships.length) * 100}%` }
          ]} 
        />
      </View>

      <Text style={styles.progressText}>
        {currentIndex} of {internships.length} reviewed
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  cardContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 350,
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    height: screenHeight * 0.65,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
    position: 'relative',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  matchBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  matchText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  roleName: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  details: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 20,
  },
  skillsContainer: {
    marginBottom: 20,
  },
  skillsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    margin: 4,
  },
  skillText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  passButton: {
    backgroundColor: '#FF5722',
  },
  applyButton: {
    backgroundColor: '#4CAF50',
  },
  actionText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  reloadButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  reloadText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginTop: 20,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default InternshipSwiper;