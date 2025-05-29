import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Calendar, Clock, Users } from 'lucide-react-native';

interface Course {
  id: number;
  title: string;
  code: string;
  department: string;
  instructor: string;
  schedule: string;
  room: string;
  enrollmentCount: number;
  maxEnrollment: number;
}

interface CourseCardProps {
  course: Course;
  isDark: boolean;
}

export function CourseCard({ course, isDark }: CourseCardProps) {
  // Calculate enrollment percentage
  const enrollmentPercentage = (course.enrollmentCount / course.maxEnrollment) * 100;
  
  // Determine status color based on enrollment
  const getStatusColor = () => {
    if (enrollmentPercentage >= 90) return '#EF4444'; // Red for near full
    if (enrollmentPercentage >= 70) return '#F59E0B'; // Amber for filling up
    return '#10B981'; // Green for available
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: isDark ? '#F9FAFB' : '#111827' }]}>
            {course.title}
          </Text>
          <Text style={[styles.code, { color: isDark ? '#60A5FA' : '#3B82F6' }]}>
            {course.code}
          </Text>
        </View>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: `${getStatusColor()}20`, borderColor: getStatusColor() }
        ]}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {course.enrollmentCount}/{course.maxEnrollment}
          </Text>
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Users size={16} color={isDark ? '#D1D5DB' : '#6B7280'} />
          <Text style={[styles.detailText, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
            {course.instructor}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Clock size={16} color={isDark ? '#D1D5DB' : '#6B7280'} />
          <Text style={[styles.detailText, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
            {course.schedule}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Calendar size={16} color={isDark ? '#D1D5DB' : '#6B7280'} />
          <Text style={[styles.detailText, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
            {course.room}
          </Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View 
            style={[
              styles.progressFill,
              { 
                width: `${enrollmentPercentage}%`,
                backgroundColor: getStatusColor(),
              }
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
          {enrollmentPercentage.toFixed(0)}% Enrolled
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    width: '85%',
  },
  code: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBackground: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'right',
  },
});