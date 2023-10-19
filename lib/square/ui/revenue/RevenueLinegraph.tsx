import { useRevenueGraph } from "@lib/square/data/hooks";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { endOfMonth, startOfMonth } from "date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Monthly revenue",
    },
  },
};

export const RevenueLinegraph = () => {
  const graph = useRevenueGraph({
    beginTime: startOfMonth(new Date()).toISOString(),
    endTime: endOfMonth(new Date()).toISOString(),
  });

  const labels: string[] = graph.data?.dates ?? [];
  const points: number[] = graph.data?.totalAmounts ?? [];
  const data = {
    labels,
    datasets: [
      {
        label: "Net revenue",
        data: points,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      // {
      //   label: "Dataset 2",
      //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      //   borderColor: "rgb(53, 162, 235)",
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };

  return <Line options={options} data={data} />;
};
