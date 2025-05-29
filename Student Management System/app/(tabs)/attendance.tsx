import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { AttendanceCard } from '@/components/attendance/AttendanceCard';
import { attendanceData } from '@/data/attendance';

export default function AttendanceScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Format date as Month Day, Year
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const decrementDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const incrementDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.dateContainer}>
        <Calendar size={20} color={isDark ? '#60A5FA' : '#3B82F6'} />
        <Text style={[styles.dateText, { color: isDark ? '#F9FAFB' : '#111827' }]}>
          {formatDate(selectedDate)}
        </Text>
      </View>
      <View style={styles.dateControls}>
        <TouchableOpacity 
          style={[styles.dateButton, { backgroundColor: isDark ? '#374151' : '#F3F4F6' }]} 
          onPress={decrementDate}
        >
          <ChevronLeft size={20} color={isDark ? '#D1D5DB' : '#4B5563'} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.dateButton, { backgroundColor: isDark ? '#374151' : '#F3F4F6' }]}
          onPress={incrementDate}
        >
          <ChevronRight size={20} color={isDark ? '#D1D5DB' : '#4B5563'} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSummary = () => {
    // Calculate attendance stats
    const total = attendanceData.length;
    const present = attendanceData.filter(item => item.status === 'present').length;
    const absent = attendanceData.filter(item => item.status === 'absent').length;
    const late = attendanceData.filter(item => item.status === 'late').length;
    
    return (
      <View style={[styles.summaryContainer, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}>
        <Text style={[styles.summaryTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}>
          Attendance Summary
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: isDark ? '#F9FAFB' : '#111827' }]}>{total}</Text>
            <Text style={[styles.statLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#10B981' }]}>{present}</Text>
            <Text style={[styles.statLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>Present</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#EF4444' }]}>{absent}</Text>
            <Text style={[styles.statLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>Absent</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#F59E0B' }]}>{late}</Text>
            <Text style={[styles.statLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>Late</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#111827' : '#F9FAFB' }]}>
      {renderHeader()}
      {renderSummary()}
      <View style={styles.listHeader}>
        <Text style={[styles.listHeaderTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}>
          Classes
        </Text>
      </View>
      <FlatList
        data={attendanceData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AttendanceCard attendance={item} isDark={isDark} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  dateControls: {
    flexDirection: 'row',
  },
  dateButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  summaryContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  listHeader: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  listHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
});