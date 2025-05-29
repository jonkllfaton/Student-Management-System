import { Tabs } from 'expo-router';
import { ChartBar as BarChart4, BookOpen, GraduationCap, Chrome as Home, UserCheck } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#60A5FA' : '#3B82F6',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#6B7280' : '#9CA3AF',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
          borderTopColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB',
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB',
        },
        headerTintColor: colorScheme === 'dark' ? '#F9FAFB' : '#111827',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="students"
        options={{
          title: 'Students',
          tabBarIcon: ({ color, size }) => <GraduationCap size={size} color={color} />,
          headerTitle: 'Students',
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
          headerTitle: 'Courses',
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: 'Attendance',
          tabBarIcon: ({ color, size }) => <UserCheck size={size} color={color} />,
          headerTitle: 'Attendance',
        }}
      />
      <Tabs.Screen
        name="grades"
        options={{
          title: 'Grades',
          tabBarIcon: ({ color, size }) => <BarChart4 size={size} color={color} />,
          headerTitle: 'Grades',
        }}
      />
    </Tabs>
  );
}