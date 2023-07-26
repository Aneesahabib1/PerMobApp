import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const BarChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://64665758ba7110b6639e57a4.mockapi.io/api/attendance/AttendanceMark')
      .then((response) => response.json())
      .then((data) => {
        const statusData = extractStatusData(data); 
        setChartData(statusData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const extractStatusData = (data) => {
  
    const statusCounts = {
      'Present': 0,
      'Leave': 0,
      'Sick-Leave': 0,
      'On-Duty': 0,
    };

    data.forEach((item) => {
      const status = item.status;
      if (statusCounts.hasOwnProperty(status)) {
        statusCounts[status] += 1;
      }
    });

    return Object.keys(statusCounts).map((status) => ({
      name: status,
      count: statusCounts[status],
    }));
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: 'black' }}>
        Attendance Status
      </Text>
      <BarChart
        data={{
          labels: chartData.map((item) => item.name),
          datasets: [
            {
              data: chartData.map((item) => item.count),
            },
          ],
        }}
        width={300}
        height={220}
        yAxisLabel="Count"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: 'lightblue',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          barColors: chartData.map((item) => item.color), 
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
        fromZero={true}
        showBarTops
        showValuesOnTopOfBars
        segments={4}
      />
    </View>
  );
};

export default BarChartComponent;
