import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const chartConfig = {
  backgroundColor: '#f4f5ff',
  backgroundGradientFrom: '#f4f5ff',
  backgroundGradientTo: '#f4f5ff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const PieChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  // Fetch data from the API using useEffect
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint that provides the pie chart data.
    fetch('https://64665758ba7110b6639e57a4.mockapi.io/api/attendance/Task')
      .then((response) => response.json())
      .then((data) => {
        const statusData = extractStatusData(data); // Extract 'status' data from the API response
        setChartData(statusData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const extractStatusData = (data) => {
    // Assuming the API response is an array of objects with a 'status' property
    // Example: [{ status: 'Completed' }, { status: 'In Progress' }, ...]
    const statusCounts = {
      'Completed': 0,
      'Overdue': 0,
      'On Hold': 0,
      'In Progress': 0,
      'Awaited Review': 0,
    };

    data.forEach((item) => {
      const status = item.status;
      if (statusCounts.hasOwnProperty(status)) {
        statusCounts[status] += 1;
      } else {
        // If a status is not one of the predefined ones, consider it 'Awaited Review'
        statusCounts['Awaited Review'] += 1;
      }
    });

    // Convert the statusCounts object to an array of objects with 'name', 'value', and 'color' properties
    return Object.keys(statusCounts).map((status) => ({
      name: status,
      value: statusCounts[status],
      color: getStatusColor(status),
    }));
  };

  const getStatusColor = (status) => {
    // Define the color mapping for each status
    switch (status) {
      case 'Completed':
        return '#1f77b4';
      case 'Overdue':
        return '#d62728';
      case 'On Hold':
        return '#2ca02c';
      case 'In Progress':
        return '#ff7f0e';
      default:
        return '#8c564b'; // For 'Awaited Review' or any other unrecognized status
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, Color: 'white' }}>
        Task Status
      </Text>
      <PieChart
        data={chartData}
        width={300}
        height={200}
        chartConfig={chartConfig}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[10, 10]}
        absolute
      />
    </View>
  );
};

export default PieChartComponent;
