import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import Avatar from '@/assets/images/avatar.png';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const ACCENT = '#60a5fa';
const BG     = '#0f172a';

const Index = () => {
  const router = useRouter();

  const fadeAnim    = useRef(new Animated.Value(0)).current;
  const slideAnim   = useRef(new Animated.Value(60)).current;
  const avatarScale = useRef(new Animated.Value(0.5)).current;
  const glowAnim    = useRef(new Animated.Value(0.4)).current;
  const buttonAnim  = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const iconAnims = [0,1,2,3].map(() => useRef(new Animated.Value(0)).current);
  const iconScales = [0,1,2,3].map(() => useRef(new Animated.Value(1)).current);

  useEffect(() => {
    // Glow pulsant
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1,   duration: 2000, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 2000, useNativeDriver: true }),
      ])
    ).start();

    // Entrée
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      Animated.spring(avatarScale, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }),
    ]).start(() => {
      Animated.stagger(120, iconAnims.map(anim =>
        Animated.spring(anim, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true })
      )).start();
      Animated.spring(buttonAnim, { toValue: 1, friction: 6, tension: 60, useNativeDriver: true }).start();
    });
  }, []);

  const icons = [
    { name: 'logo-instagram' },
    { name: 'logo-facebook'  },
    { name: 'logo-linkedin'  },
    { name: 'logo-github'    },
  ];

  return (
    <Animated.View style={[styles.body, { opacity: fadeAnim }]}>

      {/* Gradient radial background */}
      <LinearGradient
        colors={[`${ACCENT}22`, `${ACCENT}08`, BG]}
        start={{ x: 0.5, y: 0.2 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Glow derrière avatar */}
      <Animated.View style={[styles.glowCircle, { opacity: glowAnim }]} />

      <Animated.View style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
      ]}>

        {/* Avatar */}
        <Animated.View style={[
          styles.containerImage,
          { transform: [{ scale: avatarScale }] }
        ]}>
          {/* Anneau gradient */}
          <LinearGradient
            colors={[ACCENT, `${ACCENT}44`, 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatarRing}
          />
          <Image source={Avatar} style={styles.avatar} />
        </Animated.View>

        <View style={styles.containerText}>

          <Text style={styles.hi}>
            Razakasoa{'\n'}
            <Text style={styles.name}>Tanjon'ny Avo Nekena</Text>
          </Text>

          {/* Ligne déco */}
          <View style={styles.line} />

          {/* Icônes */}
          <View style={styles.socialContainer}>
            {icons.map((icon, index) => (
              <Animated.View key={index} style={{
                opacity: iconAnims[index],
                transform: [{ scale: Animated.multiply(iconAnims[index], iconScales[index]) }],
              }}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPressIn={() => Animated.spring(iconScales[index], { toValue: 0.85, useNativeDriver: true }).start()}
                  onPressOut={() => Animated.spring(iconScales[index], { toValue: 1, friction: 3, useNativeDriver: true }).start()}
                  activeOpacity={1}
                >
                  <Ionicons name={icon.name as any} size={20} color={ACCENT} />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {/* Bouton gradient */}
          <Animated.View style={{
            opacity: buttonAnim,
            transform: [
              { translateY: buttonAnim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) },
              { scale: buttonScale },
            ],
          }}>
            <TouchableOpacity
              onPressIn={() => Animated.spring(buttonScale, { toValue: 0.93, useNativeDriver: true }).start()}
              onPressOut={() => Animated.spring(buttonScale, { toValue: 1, friction: 3, useNativeDriver: true }).start()}
              onPress={() => router.push('/(tabs)/home')}
              activeOpacity={1}
            >
              <LinearGradient
                colors={[ACCENT, '#3b82f6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>See my Portfolio</Text>
                <Ionicons name="arrow-forward" size={15} color="white" style={{ marginLeft: 8 }} />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

        </View>
      </Animated.View>
    </Animated.View>
  );
};

const AVATAR_SIZE = width > 600 ? 200 : 150;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black",
  },

  // Glow
  glowCircle: {
    position: 'absolute',
    width: AVATAR_SIZE + 120,
    height: AVATAR_SIZE + 120,
    borderRadius: (AVATAR_SIZE + 120) / 2,
    backgroundColor: `${ACCENT}18`,
    alignSelf: 'center',
    zIndex: 0,
  },

  // Carte
  container: {
    width: width > 600 ? '40%' : '85%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${BG}ee`,
    borderRadius: 40,
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: `white`,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },

  // Avatar
  containerImage: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarRing: {
    position: 'absolute',
    width: AVATAR_SIZE + 10,
    height: AVATAR_SIZE + 10,
    borderRadius: (AVATAR_SIZE + 10) / 2,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: `${ACCENT}66`,
  },

  // Texte
  containerText: {
    alignItems: 'center',
  },
  hi: {
    fontSize: width > 600 ? 18 : 15,
    textAlign: 'center',
    marginBottom: 6,
    color: 'rgba(255,255,255,0.5)',
  },
  name: {
    fontSize: width > 600 ? 26 : 21,
    fontWeight: 'bold',
    color: 'white',
  },
  line: {
    width: 36,
    height: 2,
    backgroundColor: ACCENT,
    opacity: 0.6,
    marginVertical: 14,
  },

  // Socials
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: `${ACCENT}44`,
    backgroundColor: `${ACCENT}11`,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Bouton
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 28,
    borderRadius: 25,
    marginTop: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
});

export default Index;