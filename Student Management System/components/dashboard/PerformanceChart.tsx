import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

interface PerformanceChartProps {
  isDark: boolean;
}

export function PerformanceChart({ isDark }: PerformanceChartProps) {
  // Mock data for attendance by month
  const attendanceData = [
    { month: 'Jan', percent: 92 },
    { month: 'Feb', percent: 88 },
    { month: 'Mar', percent: 95 },
    { month: 'Apr', percent: 90 },
    { month: 'May', percent: 93 },
    { month: 'Jun', percent: 97 },
  ];

  // Mock data for grade distribution
  const gradeDistribution = [
    { grade: 'A', percent: 35 },
    { grade: 'B', percent: 40 },
    { grade: 'C', percent: 15 },
    { grade: 'D', percent: 7 },
    { grade: 'F', percent: 3 },
  ];

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
    ]}>
      <Text style={[styles.title, { color: isDark ? '#F9FAFB' : '#111827' }]}>
        Performance Analytics
      </Text>
      
      <View style={styles.chartsContainer}>
        <View style={styles.chartSection}>
          <Text style={[styles.chartTitle, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
            Attendance by Month
          </Text>
          <View style={styles.barChart}>
            {attendanceData.map((item, index) => (
              <View key={index} style={styles.barContainer}>
                <View style={styles.barLabelContainer}>
                  <Text style={[styles.barLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                    {item.percent}%
                  </Text>
                </View>
                <View style={styles.barWrapper}>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: `${item.percent}%`,
                        backgroundColor: getAttendanceColor(item.percent, isDark)
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.monthLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                  {item.month}
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.chartSection}>
          <Text style={[styles.chartTitle, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
            Grade Distribution
          </Text>
          <View style={styles.pieChartContainer}>
            <View style={styles.pieChart}>
              {renderPieChart(gradeDistribution, isDark)}
            </View>
            <View style={styles.legendContainer}>
              {gradeDistribution.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View 
                    style={[
                      styles.legendColor, 
                      { backgroundColor: getGradeColor(item.grade, isDark) }
                    ]} 
                  />
                  <Text style={[styles.legendText, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                    {item.grade} ({item.percent}%)
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

// Helper functions for chart colors
function getAttendanceColor(percent: number, isDark: boolean): string {
  if (percent >= 95) return '#10B981'; // Green
  if (percent >= 90) return '#3B82F6'; // Blue
  if (percent >= 85) return '#F59E0B'; // Amber
  return '#EF4444'; // Red
}

function getGradeColor(grade: string, isDark: boolean): string {
  switch (grade) {
    case 'A': return '#10B981'; // Green
    case 'B': return '#3B82F6'; // Blue
    case 'C': return '#F59E0B'; // Amber
    case 'D': return '#FB923C'; // Orange
    case 'F': return '#EF4444'; // Red
    default: return '#6B7280'; // Gray
  }
}

// Simplified pie chart renderer
function renderPieChart(data, isDark) {
  let cumulativePercent = 0;
  
  // We'll render simplified colored segments
  return (
    <View style={styles.pieChartContent}>
      {data.map((item, index) => {
        const startPercent = cumulativePercent;
        cumulativePercent += item.percent;
        
        return (
          <View 
            key={index}
            style={[
              styles.pieSegment,
              {
                backgroundColor: getGradeColor(item.grade, isDark),
                width: `${item.percent}%`,
              }
            ]}
          />
        );
      })}
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
  chartsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  chartSection: {
    width: '48%',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  barChart: {
    height: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barLabelContainer: {
    marginBottom: 4,
  },
  barLabel: {
    fontSize: 10,
  },
  barWrapper: {
    height: 100,
    width: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  monthLabel: {
    marginTop: 4,
    fontSize: 10,
  },
  pieChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pieChart: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  pieChartContent: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  pieSegment: {
    height: '100%',
  },
  legendContainer: {
    flex: 1,
    marginLeft: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 10,
  },
});