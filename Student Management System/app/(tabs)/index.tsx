import React from 'react';
import { ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, GraduationCap, Users } from 'lucide-react-native';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivityCard } from '@/components/dashboard/RecentActivityCard';
import { ClassScheduleCard } from '@/components/dashboard/ClassScheduleCard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';

export default function Dashboard() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const statistics = [
    { 
      title: 'Total Students', 
      value: '1,234', 
      change: '+12%', 
      icon: <Users size={20} color={isDark ? '#60A5FA' : '#3B82F6'} />,
      iconBg: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)',
    },
    { 
      title: 'Active Courses', 
      value: '28', 
      change: '+4', 
      icon: <GraduationCap size={20} color={isDark ? '#34D399' : '#10B981'} />,
      iconBg: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.1)',
    },
    { 
      title: 'Today\'s Classes', 
      value: '8', 
      change: 'In progress', 
      icon: <Calendar size={20} color={isDark ? '#FBBF24' : '#F59E0B'} />,
      iconBg: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.1)',
    },
    { 
      title: 'Avg. Attendance', 
      value: '92%', 
      change: '+3%', 
      icon: <Clock size={20} color={isDark ? '#F472B6' : '#EC4899'} />,
      iconBg: isDark ? 'rgba(236, 72, 153, 0.1)' : 'rgba(236, 72, 153, 0.1)',
    }
  ];

  const recentActivities = [
    { id: 1, type: 'grade', description: 'New grades added for Computer Science 101', time: '2 hours ago' },
    { id: 2, type: 'attendance', description: 'Attendance recorded for Mathematics 202', time: '4 hours ago' },
    { id: 3, type: 'enrollment', description: 'New student enrolled in Physics 301', time: '1 day ago' },
    { id: 4, type: 'course', description: 'New course added: Introduction to AI', time: '2 days ago' },
  ];

  const todaySchedule = [
    { id: 1, course: 'Computer Science 101', time: '09:00 - 10:30', room: 'Room 301', instructor: 'Dr. Smith' },
    { id: 2, course: 'Mathematics 202', time: '11:00 - 12:30', room: 'Room 201', instructor: 'Prof. Johnson' },
    { id: 3, course: 'Physics 301', time: '14:00 - 15:30', room: 'Lab 102', instructor: 'Dr. Williams' },
    { id: 4, course: 'Introduction to AI', time: '16:00 - 17:30', room: 'Room 405', instructor: 'Dr. Brown' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#111827' : '#F9FAFB' }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.welcomeText, { color: isDark ? '#F9FAFB' : '#111827' }]}>
          Welcome back, Admin
        </Text>
        
        <View style={styles.statsContainer}>
          {statistics.map((stat, index) => (
            <StatCard 
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              iconBg={stat.iconBg}
              isDark={isDark}
            />
          ))}
        </View>

        <View style={styles.chartsContainer}>
          <PerformanceChart isDark={isDark} />
        </View>

        <View style={styles.cardsContainer}>
          <View style={styles.cardColumn}>
            <RecentActivityCard 
              activities={recentActivities}
              isDark={isDark}
            />
          </View>
          <View style={styles.cardColumn}>
            <ClassScheduleCard 
              schedule={todaySchedule}
              isDark={isDark}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  chartsContainer: {
    marginBottom: 24,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardColumn: {
    width: '100%',
    marginBottom: 16,
  },
});