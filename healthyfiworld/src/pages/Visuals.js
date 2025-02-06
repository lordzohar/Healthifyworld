import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import { db, auth } from '../firebase'; // Add auth import
import { doc, getDoc } from 'firebase/firestore';

export default function Visuals() {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) { // Add null check
        const docSnap = await getDoc(doc(db, 'calories', auth.currentUser.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          new Chart(chartRef.current, {
            type: 'bar',
            data: {
              labels: ['Calories'],
              datasets: [{
                label: 'Daily Intake',
                data: [data.calories],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
              }]
            }
          });
        }
      }
    };
    fetchData();
  }, []);

  return <canvas ref={chartRef} />;
}