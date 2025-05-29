import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Clock } from 'lucide-react-native';

interface ScheduleItem {
  id: number;
  course: string;
  time: string;
  room: string;
  instructor: string;
}

interface ClassScheduleCardProps {
  schedule: ScheduleItem[];
  isDark: boolean;
}

export function ClassScheduleCard({ schedule, isDark }: ClassScheduleCardProps) {
  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
    ]}>
      <Text style={[styles.title, { color: isDark ? '#F9FAFB' : '#111827' }]}>
        Today's Classes
      </Text>
      <FlatList
        data={schedule}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.scheduleItem,
            { borderBottomColor: isDark ? '#374151' : '#E5E7EB' }
          ]}>
            <View style={styles.timeContainer}>
              <Clock size={14} color={isDark ? '#60A5FA' : '#3B82F6'} />
              <Text style={[styles.timeText, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                {item.time}
              </Text>
            </View>
            <Text style={[styles.courseText, { color: isDark ? '#F9FAFB' : '#111827' }]}>
              {item.course}
            </Text>
            <View style={styles.detailsContainer}>
              <Text style={[styles.detailText, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                {item.room} • {item.instructor}
              </Text>
            </View>
          </View>
        )}
        scrollEnabled={false}
      />
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
  scheduleItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  courseText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
  },
});