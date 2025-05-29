import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconBg: string;
  isDark: boolean;
}

export function StatCard({ title, value, change, icon, iconBg, isDark }: StatCardProps) {
  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
    ]}>
      <View style={styles.contentContainer}>
        <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
          {icon}
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
            {title}
          </Text>
          <Text style={[styles.value, { color: isDark ? '#F9FAFB' : '#111827' }]}>
            {value}
          </Text>
          <Text style={[styles.change, { color: isDark ? '#60A5FA' : '#3B82F6' }]}>
            {change}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  change: {
    fontSize: 12,
    fontWeight: '500',
  },
});