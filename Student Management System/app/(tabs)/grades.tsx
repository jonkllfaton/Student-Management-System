import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, SortAsc } from 'lucide-react-native';
import { GradeCard } from '@/components/grades/GradeCard';
import { grades } from '@/data/grades';

export default function GradesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredGrades = grades
    .filter(grade => {
      if (selectedFilter === 'all') return true;
      return grade.course.department === selectedFilter;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.score - b.score;
      } else {
        return b.score - a.score;
      }
    });

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}>
        Grade Reports
      </Text>
      <TouchableOpacity 
        style={[styles.sortButton, { backgroundColor: isDark ? '#374151' : '#F3F4F6' }]}
        onPress={toggleSortOrder}
      >
        <SortAsc size={16} color={isDark ? '#D1D5DB' : '#4B5563'} />
        <Text style={[styles.sortButtonText, { color: isDark ? '#D1D5DB' : '#4B5563' }]}>
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSummary = () => {
    // Calculate grade stats
    const totalCourses = grades.length;
    const average = grades.reduce((acc, curr) => acc + curr.score, 0) / totalCourses;
    const highest = Math.max(...grades.map(grade => grade.score));
    const lowest = Math.min(...grades.map(grade => grade.score));
    
    // Convert numerical grade to letter grade
    const getLetterGrade = (score) => {
      if (score >= 90) return 'A';
      if (score >= 80) return 'B';
      if (score >= 70) return 'C';
      if (score >= 60) return 'D';
      return 'F';
    };
    
    return (
      <View style={[styles.summaryContainer, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}>
        <Text style={[styles.summaryTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}>
          Performance Summary
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: isDark ? '#F9FAFB' : '#111827' }]}>
              {average.toFixed(1)}%
            </Text>
            <Text style={[styles.statValueSecondary, { color: isDark ? '#60A5FA' : '#3B82F6' }]}>
              {getLetterGrade(average)}
            </Text>
            <Text style={[styles.statLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
              Average
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: isDark ? '#F9FAFB' : '#111827' }]}>
              {highest}%
            </Text>
            <Text style={[styles.statValueSecondary, { color: '#10B981' }]}>
              {getLetterGrade(highest)}
            </Text>
            <Text style={[styles.statLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
              Highest
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: isDark ? '#F9FAFB' : '#111827' }]}>
              {lowest}%
            </Text>
            <Text style={[styles.statValueSecondary, { color: lowest < 60 ? '#EF4444' : '#F59E0B' }]}>
              {getLetterGrade(lowest)}
            </Text>
            <Text style={[styles.statLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
              Lowest
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderFilters = () => {
    const filters = [
      { id: 'all', label: 'All' },
      { id: 'cs', label: 'Computer Science' },
      { id: 'math', label: 'Mathematics' },
      { id: 'science', label: 'Science' },
      { id: 'humanities', label: 'Humanities' },
    ];

    return (
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          data={filters}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[
                styles.filterChip,
                selectedFilter === item.id && styles.filterChipSelected,
                { 
                  backgroundColor: isDark 
                    ? selectedFilter === item.id ? '#3B82F6' : '#374151' 
                    : selectedFilter === item.id ? '#3B82F6' : '#F3F4F6'
                }
              ]}
              onPress={() => setSelectedFilter(item.id)}
            >
              <Text 
                style={[
                  styles.filterChipText,
                  { 
                    color: isDark 
                      ? selectedFilter === item.id ? '#FFFFFF' : '#D1D5DB' 
                      : selectedFilter === item.id ? '#FFFFFF' : '#4B5563'
                  }
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#111827' : '#F9FAFB' }]}>
      {renderHeader()}
      {renderSummary()}
      {renderFilters()}
      <FlatList
        data={filteredGrades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GradeCard grade={item} isDark={isDark} />
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sortButtonText: {
    marginLeft: 4,
    fontWeight: '500',
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
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statValueSecondary: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  filterChipSelected: {
    backgroundColor: '#3B82F6',
  },
  filterChipText: {
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
});