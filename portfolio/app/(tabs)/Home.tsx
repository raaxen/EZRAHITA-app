import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import avatar from "@/assets/images/avatar.png";

const { width, height } = Dimensions.get('window');
const isMobile = width < 600;

const ACCENT = '#60a5fa';
const BG     = '#0f172a';

const Home = () => {
  const router = useRouter();
  const scrollRef  = useRef<ScrollView>(null);
  const aboutRef   = useRef<View>(null);
  const projectRef = useRef<View>(null);
  const contactRef = useRef<View>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const drawerAnim  = useRef(new Animated.Value(-300)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const textFade    = useRef(new Animated.Value(0)).current;
  const textSlide   = useRef(new Animated.Value(30)).current;
  const avatarScale = useRef(new Animated.Value(0.8)).current;
  const avatarFade  = useRef(new Animated.Value(0)).current;
  const glowAnim    = useRef(new Animated.Value(0.4)).current;
  const iconAnims   = [0,1,2,3].map(() => useRef(new Animated.Value(0)).current);
  const iconScales  = [0,1,2,3].map(() => useRef(new Animated.Value(1)).current);
  const btnScale    = useRef(new Animated.Value(1)).current;

  const aboutLeftFade  = useRef(new Animated.Value(0)).current;
  const aboutLeftSlide = useRef(new Animated.Value(-40)).current;
  const aboutRightFade  = useRef(new Animated.Value(0)).current;
  const aboutRightSlide = useRef(new Animated.Value(40)).current;
  const aboutAnimated   = useRef(false);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1,   duration: 2000, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 2000, useNativeDriver: true }),
      ])
    ).start();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(avatarFade,  { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.spring(avatarScale, { toValue: 1, friction: 6, tension: 50, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(textFade,  { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.spring(textSlide, { toValue: 0, friction: 8, tension: 50, useNativeDriver: true }),
      ]),
      Animated.stagger(80, iconAnims.map(a =>
        Animated.spring(a, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true })
      )),
    ]).start();
  }, []);

  const triggerAboutAnimation = () => {
    if (aboutAnimated.current) return;
    aboutAnimated.current = true;
    Animated.parallel([
      Animated.timing(aboutLeftFade,   { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(aboutLeftSlide,  { toValue: 0, friction: 8, tension: 50, useNativeDriver: true }),
      Animated.timing(aboutRightFade,  { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(aboutRightSlide, { toValue: 0, friction: 8, tension: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y;
    if (y > height * 0.6) triggerAboutAnimation();
  };

  const scrollToSection = (ref: React.RefObject<View>) => {
    ref.current?.measureLayout(
      scrollRef.current as any,
      (x, y) => scrollRef.current?.scrollTo({ y, animated: true }),
      () => {}
    );
  };

  const openMenu = () => {
    setMenuOpen(true);
    Animated.parallel([
      Animated.spring(drawerAnim,  { toValue: 0,   friction: 7, tension: 60, useNativeDriver: true }),
      Animated.timing(overlayAnim, { toValue: 0.5, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.spring(drawerAnim,  { toValue: -300, friction: 7, tension: 60, useNativeDriver: true }),
      Animated.timing(overlayAnim, { toValue: 0,    duration: 300, useNativeDriver: true }),
    ]).start(() => setMenuOpen(false));
  };

  const navActions = [
    { label: 'Home',    action: () => scrollRef.current?.scrollTo({ y: 0, animated: true }),  icon: 'home-outline' },
    { label: 'About',   action: () => scrollToSection(aboutRef),   icon: 'person-outline' },
    { label: 'Project', action: () => scrollToSection(projectRef), icon: 'code-slash-outline' },
    { label: 'Contact', action: () => scrollToSection(contactRef), icon: 'mail-outline' },
  ];

  const socials = [
    { name: 'logo-instagram' },
    { name: 'logo-facebook'  },
    { name: 'logo-linkedin'  },
    { name: 'logo-github'    },
  ];

  return (
    <View style={styles.body}>

      {/* Background gradient */}
      <LinearGradient
        colors={[`${ACCENT}22`, `${ACCENT}08`, BG]}
        start={{ x: 0.5, y: 0.3 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Glow hero */}
      <Animated.View style={[styles.glowCircle, { opacity: glowAnim }]} />

      {/* Navbar */}
      <View style={styles.nav}>
        <Text style={styles.navTitle}>Ny Avo Nekena</Text>
        {isMobile ? (
          <TouchableOpacity onPress={openMenu}>
            <Ionicons name="menu-outline" size={28} color="white" />
          </TouchableOpacity>
        ) : (
          <View style={styles.navLinks}>
            {navActions.map(link => (
              <TouchableOpacity key={link.label} onPress={link.action}>
                <Text style={styles.navText}>{link.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Drawer */}
      {menuOpen && (
        <>
          <Animated.View style={[styles.overlay, { opacity: overlayAnim }]}>
            <TouchableOpacity style={{ flex: 1 }} onPress={closeMenu} />
          </Animated.View>
          <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}>
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>Menu</Text>
              <TouchableOpacity onPress={closeMenu}>
                <Ionicons name="close" size={26} color="white" />
              </TouchableOpacity>
            </View>
            {navActions.map(link => (
              <TouchableOpacity
                key={link.label}
                style={styles.drawerLink}
                onPress={() => { closeMenu(); setTimeout(link.action, 300); }}
              >
                <Ionicons name={link.icon as any} size={20} color="white" style={{ marginRight: 14 }} />
                <Text style={styles.drawerText}>{link.label}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </>
      )}

      {/* ScrollView */}
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >

        {/* ── Section HOME ── */}
        <View style={styles.heroSection}>
          <Animated.View style={[
            styles.avatarWrapper,
            { opacity: avatarFade, transform: [{ scale: avatarScale }] }
          ]}>
            <LinearGradient
              colors={[ACCENT, `${ACCENT}44`, 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarRingOuter}
            />
            <View style={styles.avatarRingInner}>
              <Image source={avatar} style={styles.avatarImage} />
            </View>
          </Animated.View>

          <Animated.View style={[
            styles.textBlock,
            { opacity: textFade, transform: [{ translateY: textSlide }] }
          ]}>
            <Text style={styles.tag}>✦  FULL-STACK DEVELOPER</Text>
            <Text style={styles.firstName}>Tanjon'ny Avo</Text>
            <Text style={styles.lastName}>Nekena</Text>
            <View style={styles.line} />
            <Text style={styles.desc}>
              Passionate about crafting seamless digital experiences — from pixel-perfect interfaces to robust back-end systems. Let's build something great together.
            </Text>

            <View style={styles.socialRow}>
              {socials.map((s, i) => (
                <Animated.View key={i} style={{
                  opacity: iconAnims[i],
                  transform: [{ scale: Animated.multiply(iconAnims[i], iconScales[i]) }]
                }}>
                  <TouchableOpacity
                    style={styles.socialBtn}
                    onPressIn={() => Animated.spring(iconScales[i], { toValue: 0.82, useNativeDriver: true }).start()}
                    onPressOut={() => Animated.spring(iconScales[i], { toValue: 1, friction: 3, useNativeDriver: true }).start()}
                    activeOpacity={1}
                  >
                    <Ionicons name={s.name as any} size={18} color={ACCENT} />
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>

            <Animated.View style={{ transform: [{ scale: btnScale }] }}>
              <TouchableOpacity
                onPressIn={() => Animated.spring(btnScale, { toValue: 0.95, useNativeDriver: true }).start()}
                onPressOut={() => Animated.spring(btnScale, { toValue: 1, friction: 3, useNativeDriver: true }).start()}
                onPress={() => scrollToSection(aboutRef)}
                activeOpacity={1}
              >
                <LinearGradient
                  colors={[ACCENT, '#3b82f6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.btnPrimary}
                >
                  <Text style={styles.btnPrimaryText}>Continue</Text>
                  <Ionicons name="chevron-down" size={15} color="white" style={{ marginLeft: 6 }} />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>

        {/* ── Section ABOUT ── */}
        <View ref={aboutRef} style={styles.aboutSection}>
          <Image source={avatar} style={styles.aboutBg} />
          <LinearGradient
            colors={['rgba(15,23,42,0.95)', 'rgba(15,23,42,0.6)', 'rgba(15,23,42,0.95)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFillObject}
          />

          <View style={styles.aboutContent}>

            {/* Gauche */}
            <Animated.View style={[
              styles.aboutLeft,
              { opacity: aboutLeftFade, transform: [{ translateX: aboutLeftSlide }] }
            ]}>
              <Text style={styles.aboutTag}>✦  ABOUT ME</Text>
              <Text style={styles.aboutTitle}>Who{'\n'}am I ?</Text>
              <View style={styles.line} />
              <Text style={styles.aboutDesc}>
                I'm a passionate full-stack developer based in Madagascar. I specialize in building modern, responsive web and mobile applications using React Native, React.js, Node.js and more.
              </Text>
              <Text style={styles.aboutDesc}>
                I love turning ideas into clean, functional products. Whether it's a sleek UI or a robust API, I bring dedication and creativity to every project.
              </Text>
            </Animated.View>

            {/* Droite */}
            <Animated.View style={[
              styles.aboutRight,
              { opacity: aboutRightFade, transform: [{ translateX: aboutRightSlide }] }
            ]}>
              <Text style={styles.aboutSubtitle}>My Skills</Text>
              <View style={styles.skillsGrid}>
                {['React Native', 'React.js', 'Node.js', 'TypeScript', 'Rust', 'Git'].map((skill, i) => (
                  <View key={i} style={styles.skillBadge}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                onPress={() => scrollToSection(projectRef)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[ACCENT, '#3b82f6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.btnPrimary}
                >
                  <Text style={styles.btnPrimaryText}>See Projects</Text>
                  <Ionicons name="arrow-forward" size={15} color="white" style={{ marginLeft: 6 }} />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

          </View>
        </View>

        {/* ── Section PROJECT ── */}
        <View ref={projectRef} style={styles.sectionPlaceholder}>
          <LinearGradient
            colors={[BG, `${ACCENT}0a`, BG]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          <Text style={styles.aboutTag}>✦  PROJECTS</Text>
          <Text style={styles.aboutTitle}>My Work</Text>
          <View style={styles.line} />
          <Text style={styles.aboutDesc}>Coming soon...</Text>
        </View>

        {/* ── Section CONTACT ── */}
        <View ref={contactRef} style={styles.sectionPlaceholder}>
          <LinearGradient
            colors={[BG, `${ACCENT}0a`, BG]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          <Text style={styles.aboutTag}>✦  CONTACT</Text>
          <Text style={styles.aboutTitle}>Get in Touch</Text>
          <View style={styles.line} />
          <Text style={styles.aboutDesc}>Coming soon...</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const AVATAR_SIZE = isMobile ? 200 : 260;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: BG,
  },
  glowCircle: {
    position: 'absolute',
    width: AVATAR_SIZE + 120,
    height: AVATAR_SIZE + 120,
    borderRadius: (AVATAR_SIZE + 120) / 2,
    backgroundColor: `${ACCENT}18`,
    top: isMobile ? height * 0.1 : height * 0.12,
    alignSelf: 'center',
    zIndex: 0,
  },

  // Navbar
  nav: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: isMobile ? 64 : 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: isMobile ? 20 : 48,
    justifyContent: 'space-between',
    zIndex: 50,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  navTitle: {
    color: 'white',
    fontSize: isMobile ? 16 : 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  navLinks: { flexDirection: 'row', gap: 36 },
  navText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  // Drawer
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'black',
    zIndex: 20,
  },
  drawer: {
    position: 'absolute',
    top: 0, left: 0,
    width: 260, height: '100%',
    backgroundColor: BG,
    zIndex: 30,
    paddingTop: 60, paddingHorizontal: 24,
    elevation: 20,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    paddingBottom: 16,
  },
  drawerTitle: { color: 'white', fontSize: 20, fontWeight: '700' },
  drawerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  drawerText: { color: 'white', fontSize: 16, fontWeight: '500' },

  // Hero
 heroSection: {
  height: height,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: isMobile ? 90 : 100,
  paddingBottom: 40,
  paddingHorizontal: isMobile ? 24 : 80,
  overflow: 'hidden', 
},
  avatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  avatarRingOuter: {
    position: 'absolute',
    width: AVATAR_SIZE + 16,
    height: AVATAR_SIZE + 16,
    borderRadius: (AVATAR_SIZE + 16) / 2,
  },
  avatarRingInner: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: `${ACCENT}88`,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textBlock: {
    width: '100%',
    maxWidth: 520,
    alignItems: 'center',
  },
  tag: {
    fontSize: 11,
    fontWeight: '700',
    color: ACCENT,
    letterSpacing: 3,
    marginBottom: 16,
  },
  firstName: {
    fontSize: isMobile ? 34 : 48,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
  },
  lastName: {
    fontSize: isMobile ? 38 : 54,
    fontWeight: '800',
    fontStyle: 'italic',
    color: ACCENT,
    textAlign: 'center',
    marginBottom: 18,
  },
  line: {
    width: 40,
    height: 2,
    backgroundColor: ACCENT,
    marginBottom: 20,
    opacity: 0.6,
  },
  desc: {
    fontSize: isMobile ? 14 : 15,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 28,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  socialBtn: {
    width: 42, height: 42,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: `${ACCENT}44`,
    backgroundColor: `${ACCENT}11`,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // About
  aboutSection: {
    minHeight: height,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  aboutBg: {
  position: 'absolute',
  width: '65%',
  height: '115%',
  resizeMode: 'cover',
  opacity: 0.35,
  alignSelf: 'center',
  top: '7%',
},
  aboutContent: {
    flexDirection: isMobile ? 'column' : 'row',
    paddingHorizontal: isMobile ? 28 : 80,
    paddingVertical: 80,
    gap: isMobile ? 40 : 60,
    alignItems: 'center',
    justifyContent:'space-around'
  },
  aboutLeft: {
    flex: 1,
    alignItems: isMobile ? 'center' : 'flex-start',
  },
  aboutRight: {
    flex: 1,
    alignItems: isMobile ? 'center' : 'flex-start',
  },
  aboutTag: {
    fontSize: 11,
    fontWeight: '700',
    color: ACCENT,
    letterSpacing: 3,
    marginBottom: 16,
  },
  aboutTitle: {
    fontSize: isMobile ? 36 : 52,
    fontWeight: '800',
    color: 'white',
    lineHeight: isMobile ? 44 : 62,
    marginBottom: 16,
    textAlign: isMobile ? 'center' : 'left',
  },
  aboutSubtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 16,
  },
  aboutDesc: {
    fontSize: isMobile ? 14 : 16,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 28,
    maxWidth: 340,
    textAlign: isMobile ? 'center' : 'left',
    marginBottom: 16,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 30,
  },
  skillBadge: {
    borderWidth: 1,
    borderColor: `${ACCENT}44`,
    backgroundColor: `${ACCENT}11`,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  skillText: {
    color: ACCENT,
    fontSize: 13,
    fontWeight: '600',
  },

  // Sections placeholder
  sectionPlaceholder: {
    minHeight: height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: isMobile ? 28 : 80,
    overflow: 'hidden',
  },

  // Boutons
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 28,
    borderRadius: 8,
    marginTop: 10,
  },
  btnPrimaryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});

export default Home;