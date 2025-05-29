import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, PlusCircle, Search } from 'lucide-react-native';
import { StudentListItem } from '@/components/students/StudentListItem';
import { students } from '@/data/students';

export default function StudentsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        student.id.toString().includes(searchQuery);
    
    if (selectedFilter === 'all') return matchesSearch;
    return matchesSearch && student.year === selectedFilter;
  });

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}>
        {filteredStudents.length} Students
      </Text>
      <View style={styles.headerActions}>
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: isDark ? '#374151' : '#F3F4F6' }]}
          activeOpacity={0.7}
        >
          <Filter size={16} color={isDark ? '#D1D5DB' : '#4B5563'} />
          <Text style={[styles.filterButtonText, { color: isDark ? '#D1D5DB' : '#4B5563' }]}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: isDark ? '#3B82F6' : '#3B82F6' }]}
          activeOpacity={0.7}
        >
          <PlusCircle size={16} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Student</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSearchBar = () => (
    <View style={[styles.searchContainer, { backgroundColor: isDark ? '#374151' : '#F3F4F6' }]}>
      <Search size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
      <TextInput
        style={[styles.searchInput, { color: isDark ? '#F9FAFB' : '#111827' }]}
        placeholder="Search students..."
        placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );

  const renderFilters = () => {
    const filters = [
      { id: 'all', label: 'All' },
      { id: 'freshman', label: 'Freshman' },
      { id: 'sophomore', label: 'Sophomore' },
      { id: 'junior', label: 'Junior' },
      { id: 'senior', label: 'Senior' },
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
      {renderSearchBar()}
      {renderFilters()}
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <StudentListItem student={item} isDark={isDark} />}
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
  headerActions: {
    flexDirection: 'row',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  filterButtonText: {
    marginLeft: 4,
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    marginLeft: 4,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filtersContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
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
  },
});