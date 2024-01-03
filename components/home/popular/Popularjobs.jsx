import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import styles from './popularjobs.style'
import useFetch from '../../../hook/useFetch'
import { COLORS, SIZES } from '../../../constants'

const Popularjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch('search', { query: 'react developer', num_pages: 1 });

  const [ selectedJob, setSelectedJob ] = useState();
  const handleCardPress = (item) => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        { isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard item={item} selectedJob={selectedJob} handleCardPress={handleCardPress} />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            showsHorizontalScrollIndicator={false}/>
        )}
      </View>
    </View>
  )
}

export default Popularjobs