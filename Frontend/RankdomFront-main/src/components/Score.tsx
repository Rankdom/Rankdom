import React from 'react';
import { useLocation } from 'react-router-dom';
import './ui/Score.css';
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

//DET ER HER HVOR DEN HENTER DATAEN fra Client lige nu FYI, så hvis det er fra databasen,
//så Skal det fetches, og bare have navnene selectedChoices og SelectedSport.
const Score: React.FC = () => {
  const location = useLocation();
  const { selectedChoices, selectedSport } = location.state || {};

  //Group that shit af entries
  const frequencyMap: Record<string, number> = {};
  selectedChoices?.forEach((choice: string) => {
    frequencyMap[choice] = (frequencyMap[choice] || 0) + 1;
  });

  //Data via et react chartLibrary
  const labels = Object.keys(frequencyMap);
  const dataValues = Object.values(frequencyMap);

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Selections",
        data: dataValues,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `RANKDOM Chart for ${selectedSport}`,
      },
    },
  };

  return (
    <div>
      <h2>Score Page for {selectedSport}</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Score;
