import axios from 'axios';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function AdminDashboard({ navigation }) {
	const stats = [
		{ label: 'Users', value: '1,248' },
		{ label: 'Reports', value: '36' },
		{ label: 'Updates', value: '12' },
	];

	const actions = [
		{ title: 'Manage Users', subtitle: 'View and update accounts' },
		{ title: 'Review Reports', subtitle: 'Handle new city reports' },
		{ title: 'Post Update', subtitle: 'Publish a new announcement' },
	];

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.glowTop} />
			<View style={styles.glowBottom} />

			<View style={styles.headerCard}>
				<View>
					<Text style={styles.badge}>Admin Panel</Text>
					<Text style={styles.title}>Dashboard</Text>
					<Text style={styles.subtitle}>
						Monitor activity and manage the city info app from one place.
					</Text>
				</View>

				<View style={styles.iconWrap}>
					<Feather name="layout" size={26} color="#0F172A" />
				</View>
			</View>

			<View style={styles.statsRow}>
				{stats.map((item) => (
					<View key={item.label} style={styles.statCard}>
						<Text style={styles.statValue}>{item.value}</Text>
						<Text style={styles.statLabel}>{item.label}</Text>
					</View>
				))}
			</View>

			<View style={styles.sectionCard}>
				<Text style={styles.sectionTitle}>Quick Actions</Text>

				{actions.map((item) => (
					<TouchableOpacity key={item.title} style={styles.actionItem} activeOpacity={0.85}>
						<View style={styles.actionTextWrap}>
							<Text style={styles.actionTitle}>{item.title}</Text>
							<Text style={styles.actionSubtitle}>{item.subtitle}</Text>
						</View>
						<Feather name="chevron-right" size={20} color="#94A3B8" />
					</TouchableOpacity>
				))}
			</View>

			<TouchableOpacity
				style={styles.primaryButton}
				activeOpacity={0.9}
				onPress={() => navigation && navigation.navigate && navigation.navigate('Login')}
			>
				<Text style={styles.primaryButtonText}>Sign Out</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: '#0F172A',
		padding: 24,
		position: 'relative',
	},
	glowTop: {
		position: 'absolute',
		width: 260,
		height: 260,
		borderRadius: 130,
		backgroundColor: 'rgba(56, 189, 248, 0.16)',
		top: -80,
		right: -90,
	},
	glowBottom: {
		position: 'absolute',
		width: 220,
		height: 220,
		borderRadius: 110,
		backgroundColor: 'rgba(34, 197, 94, 0.12)',
		bottom: -90,
		left: -70,
	},
	headerCard: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'rgba(15, 23, 42, 0.9)',
		borderRadius: 28,
		padding: 24,
		borderWidth: 1,
		borderColor: 'rgba(148, 163, 184, 0.18)',
		shadowColor: '#000',
		shadowOpacity: 0.24,
		shadowRadius: 20,
		shadowOffset: { width: 0, height: 12 },
		elevation: 8,
		marginTop: 48,
		marginBottom: 18,
	},
	badge: {
		color: '#7DD3FC',
		fontSize: 12,
		fontWeight: '800',
		letterSpacing: 1,
		textTransform: 'uppercase',
		marginBottom: 8,
	},
	title: {
		color: '#F8FAFC',
		fontSize: 32,
		lineHeight: 38,
		fontWeight: '800',
		marginBottom: 10,
	},
	subtitle: {
		color: '#CBD5E1',
		fontSize: 15,
		lineHeight: 22,
		maxWidth: 240,
	},
	iconWrap: {
		width: 58,
		height: 58,
		borderRadius: 18,
		backgroundColor: '#38BDF8',
		alignItems: 'center',
		justifyContent: 'center',
	},
	statsRow: {
		flexDirection: 'row',
		gap: 12,
		marginBottom: 18,
	},
	statCard: {
		flex: 1,
		backgroundColor: 'rgba(30, 41, 59, 0.9)',
		borderRadius: 20,
		paddingVertical: 18,
		paddingHorizontal: 14,
		borderWidth: 1,
		borderColor: 'rgba(148, 163, 184, 0.14)',
	},
	statValue: {
		color: '#F8FAFC',
		fontSize: 24,
		fontWeight: '800',
		marginBottom: 6,
	},
	statLabel: {
		color: '#94A3B8',
		fontSize: 13,
		fontWeight: '600',
	},
	sectionCard: {
		backgroundColor: 'rgba(15, 23, 42, 0.9)',
		borderRadius: 28,
		padding: 20,
		borderWidth: 1,
		borderColor: 'rgba(148, 163, 184, 0.18)',
		marginBottom: 18,
	},
	sectionTitle: {
		color: '#F8FAFC',
		fontSize: 18,
		fontWeight: '800',
		marginBottom: 14,
	},
	actionItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 16,
		borderTopWidth: 1,
		borderTopColor: 'rgba(148, 163, 184, 0.12)',
	},
	actionTextWrap: {
		flex: 1,
		paddingRight: 12,
	},
	actionTitle: {
		color: '#F8FAFC',
		fontSize: 15,
		fontWeight: '700',
		marginBottom: 4,
	},
	actionSubtitle: {
		color: '#94A3B8',
		fontSize: 13,
		lineHeight: 18,
	},
	primaryButton: {
		backgroundColor: '#38BDF8',
		paddingVertical: 16,
		borderRadius: 16,
		alignItems: 'center',
		shadowColor: '#38BDF8',
		shadowOpacity: 0.25,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 6 },
		elevation: 4,
	},
	primaryButtonText: {
		color: '#0F172A',
		fontSize: 16,
		fontWeight: '800',
		letterSpacing: 0.4,
	},
});
