import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Course {
  id: number;
  title: string;
  code: string;
  department: string;
}

interface Grade {
  id: number;
  course: Course;
  score: number;
  letterGrade: string;
  updatedAt: string;
}

interface GradeCardProps {
  grade: Grade;
  isDark: boolean;
}

export function GradeCard({ grade, isDark }: GradeCardProps) {
  const getGradeColor = (score: number) => {
    if (score >= 90) return '#10B981'; // Green for A
    if (score >= 80) return '#3B82F6'; // Blue for B
    if (score >= 70) return '#F59E0B'; // Amber for C
    if (score >= 60) return '#FB923C'; // Orange for D
    return '#EF4444'; // Red for F
  };
  
  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
    ]}>
      <View style={styles.header}>
        <View style={styles.courseInfo}>
          <Text style={[styles.title, { color: isDark ? '#F9FAFB' : '#111827' }]}>
            {grade.course.title}
          </Text>
          <Text style={[styles.code, { color: isDark ? '#60A5FA' : '#3B82F6' }]}>
            {grade.course.code}
          </Text>
        </View>
        <View style={styles.gradeContainer}>
          <View style={[
            styles.scoreContainer,
            { 
              backgroundColor: `${getGradeColor(grade.score)}20`,
              borderColor: getGradeColor(grade.score)
            }
          ]}>
            <Text style={[styles.score, { color: getGradeColor(grade.score) }]}>
              {grade.score}%
            </Text>
          </View>
          <Text style={[
            styles.letterGrade,
            { color: getGradeColor(grade.score) }
          ]}>
            {grade.letterGrade}
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={[styles.updatedText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
          Updated {grade.updatedAt}
        </Text>
      </View>
    </View>
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
    alignItems: 'center',
    marginBottom: 12,
  },
  courseInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  code: {
    fontSize: 14,
  },
  gradeContainer: {
    alignItems: 'center',
  },
  scoreContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 4,
  },
  score: {
    fontSize: 14,
    fontWeight: '600',
  },
  letterGrade: {
    fontSize: 20,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  updatedText: {
    fontSize: 12,
  },
});