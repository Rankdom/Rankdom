import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Score: React.FC = () => {
  const location = useLocation();
  const { selectedCategory, selectedChoices } = location.state || {}; // Get from state or default to undefined


  const frequencyMap: Record<string, number> = {};
  selectedChoices?.forEach((choice: string) => {
    frequencyMap[choice] = (frequencyMap[choice] || 0) + 1;
  });

  //  chart data, generates that pic form from CHARTJS lib.
  const labels = Object.keys(frequencyMap);
  const dataValues = Object.values(frequencyMap);


  useEffect(() => {
fetch('/api/Answer/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
        "content_array": [selectedCategory[0]]

  })
})
  }, );


  const data = {
    labels,
    datasets: [
      {
        label: 'Frequency in your selection',
        data: dataValues,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart settings
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `RANKDOM Chart for ${selectedCategory || 'Unknown Category'}`,
      },
    },
  };


  if (!selectedCategory || !selectedChoices) {
    return <div>No data available for this category.</div>;
  }

  return (
    <div>
      <h2>Score Page for {selectedCategory}</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Score;