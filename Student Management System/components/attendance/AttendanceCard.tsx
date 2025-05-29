import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Check, Clock, X } from 'lucide-react-native';

interface Attendance {
  id: number;
  course: string;
  time: string;
  room: string;
  instructor: string;
  status: string;
}

interface AttendanceCardProps {
  attendance: Attendance;
  isDark: boolean;
}

export function AttendanceCard({ attendance, isDark }: AttendanceCardProps) {
  const [status, setStatus] = useState(attendance.status);
  
  const getStatusColor = (statusType: string) => {
    switch (statusType) {
      case 'present':
        return '#10B981'; // Green
      case 'absent':
        return '#EF4444'; // Red
      case 'late':
        return '#F59E0B'; // Amber
      default:
        return '#6B7280'; // Gray
    }
  };
  
  const getStatusIcon = (statusType: string) => {
    switch (statusType) {
      case 'present':
        return <Check size={16} color="#FFFFFF" />;
      case 'absent':
        return <X size={16} color="#FFFFFF" />;
      case 'late':
        return <Clock size={16} color="#FFFFFF" />;
      default:
        return null;
    }
  };
  
  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
    ]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#F9FAFB' : '#111827' }]}>
          {attendance.course}
        </Text>
        {status !== 'pending' && (
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(status) }
          ]}>
            {getStatusIcon(status)}
          </View>
        )}
      </View>
      
      <View style={styles.details}>
        <Text style={[styles.detailText, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
          {attendance.time} • {attendance.room} • {attendance.instructor}
        </Text>
      </View>
      
      {status === 'pending' ? (
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#10B981' }]}
            onPress={() => setStatus('present')}
          >
            <Check size={16} color="#FFFFFF" />
            <Text style={styles.actionText}>Present</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#F59E0B' }]}
            onPress={() => setStatus('late')}
          >
            <Clock size={16} color="#FFFFFF" />
            <Text style={styles.actionText}>Late</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#EF4444' }]}
            onPress={() => setStatus('absent')}
          >
            <X size={16} color="#FFFFFF" />
            <Text style={styles.actionText}>Absent</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.statusContainer}>
          <Text style={[
            styles.statusText,
            { color: getStatusColor(status) }
          ]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        </View>
      )}
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
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  actionText: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 4,
    fontSize: 12,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
});