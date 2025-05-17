import React from 'react';
import { View, FlatList, StyleSheet, RefreshControl, SafeAreaView } from 'react-native';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import EmptyState from '@/components/EmptyState';
import Colors from '@/constants/Colors';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function ProductsScreen() {
  const { products, loading, error, fetchProducts } = useProducts();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  }, [fetchProducts]);

  if (error) {
    return (
      <EmptyState
        title="Oops!"
        message={error}
        buttonText="Try Again"
        buttonAction={fetchProducts}
        icon={<AlertTriangle size={48} color={Colors.error[500]} />}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading && !refreshing ? (
        <View style={styles.productsGrid}>
          <ProductSkeleton count={6} />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item, index }) => (
            <ProductCard product={item} index={index} />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.primary[500]]}
              tintColor={Colors.primary[500]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
});