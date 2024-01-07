import React, { useCallback, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { data, isLoading, error, reFetch } = useFetch('job-details', { job_id: id });

    const [ refreshing, setRefreshing ] = useState(false);
    const [ activeTab, setActiveTab ] = useState(tabs[0]);

    const onRefresh = () => {

    }

    const displayTabContent = (activeTab) => {
        console.log(data[0].job_highlights);
        switch(activeTab) {
            case "About":
                return <JobAbout
                    info={data[0].job_description ?? "No Data Provided"}
                />
                break;
            case "Qualifications":
                return <Specifics
                    title="Qualifications"
                    points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                />
                break;
            case "Responsibilities":
                console.log(data[0].job_highlights);
                return <Specifics
                    title="Responsibilities"
                    points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
                />
                break;
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: ''
                }}
            />
            <>
                <SafeAreaView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />}>
                        { isLoading ?
                            <ActivityIndicator size="large" color={COLORS.primary} /> :
                            error ? (
                                <Text>Something Went Wrong</Text>
                            ) :
                            data.length === 0 ? (
                                <Text>No Data</Text>
                            ) :
                            (
                                <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                                    <Company
                                        companyLogo={data[0].employer_logo}
                                        jobTitle={data[0].job_title}
                                        companyName={data[0].employer_name}
                                        location={data[0].job_country}
                                    />
                                    <JobTabs
                                        tabs={tabs}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                    />

                                    { displayTabContent(activeTab) }
                                </View>
                            )
                        }
                </SafeAreaView>
            </>
        </ScrollView>
    );
}

export default JobDetails