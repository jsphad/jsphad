import { ScrollView, Text, View } from 'react-native';

import { MVP_MODULES, WEEKLY_ANALYTICS } from '@ppa/shared';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 28, fontWeight: '700' }}>Personal Performance App</Text>
        <Text style={{ fontSize: 16, color: '#475569' }}>
          Mobile-first starter focused on fast capture, reminders, and weekly analytics.
        </Text>
      </View>

      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>MVP modules</Text>
        {MVP_MODULES.map((module) => (
          <Text key={module} style={{ fontSize: 16 }}>
            • {module}
          </Text>
        ))}
      </View>

      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>Weekly analytics focus</Text>
        {WEEKLY_ANALYTICS.map((metric) => (
          <Text key={metric} style={{ fontSize: 16 }}>
            • {metric}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}
