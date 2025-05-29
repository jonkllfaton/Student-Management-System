import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface Student {
  id: number;
  name: string;
  email: string;
  year: string;
  major: string;
  gpa: number;
  avatar: string;
}

interface StudentListItemProps {
  student: Student;
  isDark: boolean;
}

export function StudentListItem({ student, isDark }: StudentListItemProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
      ]}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: student.avatar }} 
        style={styles.avatar} 
      />
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: isDark ? '#F9FAFB' : '#111827' }]}>
          {student.name}
        </Text>
        <Text style={[styles.details, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
          {student.year} • {student.major}
        </Text>
        <Text style={[styles.email, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
          {student.email}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={[
          styles.gpaContainer, 
          { 
            backgroundColor: getGpaColor(student.gpa, isDark).bgColor,
            borderColor: getGpaColor(student.gpa, isDark).borderColor,
          }
        ]}>
          <Text style={[
            styles.gpaText,
            { color: getGpaColor(student.gpa, isDark).textColor }
          ]}>
            {student.gpa.toFixed(1)}
          </Text>
        </View>
        <ChevronRight size={20} color={isDark ? '#6B7280' : '#9CA3AF'} />
      </View>
    </TouchableOpacity>
  );
}

// Helper function to get GPA color based on value
function getGpaColor(gpa: number, isDark: boolean) {
  if (gpa >= 3.5) {
    return {
      bgColor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)',
      borderColor: isDark ? 'rgba(16, 185, 129, 0.5)' : 'rgba(16, 185, 129, 0.3)',
      textColor: '#10B981',
    };
  } else if (gpa >= 3.0) {
    return {
      bgColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
      borderColor: isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)',
      textColor: '#3B82F6',
    };
  } else if (gpa >= 2.5) {
    return {
      bgColor: isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)',
      borderColor: isDark ? 'rgba(245, 158, 11, 0.5)' : 'rgba(245, 158, 11, 0.3)',
      textColor: '#F59E0B',
    };
  } else {
    return {
      bgColor: isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)',
      borderColor: isDark ? 'rgba(239, 68, 68, 0.5)' : 'rgba(239, 68, 68, 0.3)',
      textColor: '#EF4444',
    };
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    marginBottom: 2,
  },
  email: {
    fontSize: 12,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  gpaContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  gpaText: {
    fontSize: 14,
    fontWeight: '600',
  },
});