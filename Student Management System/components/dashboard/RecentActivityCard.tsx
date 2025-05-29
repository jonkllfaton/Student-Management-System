import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { BookOpen, Check, GraduationCap, PlusCircle } from 'lucide-react-native';

interface Activity {
  id: number;
  type: string;
  description: string;
  time: string;
}

interface RecentActivityCardProps {
  activities: Activity[];
  isDark: boolean;
}

export function RecentActivityCard({ activities, isDark }: RecentActivityCardProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'grade':
        return <BarChart size={16} color="#F59E0B" />;
      case 'attendance':
        return <Check size={16} color="#10B981" />;
      case 'enrollment':
        return <GraduationCap size={16} color="#3B82F6" />;
      case 'course':
        return <BookOpen size={16} color="#EC4899" />;
      default:
        return <PlusCircle size={16} color="#6B7280" />;
    }
  };

  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
    ]}>
      <Text style={[styles.title, { color: isDark ? '#F9FAFB' : '#111827' }]}>
        Recent Activity
      </Text>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.activityItem}>
            <View style={[
              styles.iconContainer,
              { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }
            ]}>
              {getActivityIcon(item.type)}
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: isDark ? '#F9FAFB' : '#111827' }]}>
                {item.description}
              </Text>
              <Text style={[styles.activityTime, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                {item.time}
              </Text>
            </View>
          </View>
        )}
        scrollEnabled={false}
      />
    </View>
  );
}

// Add the missing BarChart component
function BarChart({ size, color }) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ 
        width: size * 0.2, 
        height: size * 0.5, 
        backgroundColor: color,
        marginHorizontal: size * 0.05,
        borderRadius: size * 0.1,
      }} />
      <View style={{ 
        width: size * 0.2, 
        height: size * 0.7, 
        backgroundColor: color,
        marginHorizontal: size * 0.05,
        borderRadius: size * 0.1,
      }} />
      <View style={{ 
        width: size * 0.2, 
        height: size * 0.3, 
        backgroundColor: color,
        marginHorizontal: size * 0.05,
        borderRadius: size * 0.1,
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
  },
});