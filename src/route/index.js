import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import MetricsView from '../components/MetricsView';
import AnalyticsView from '../components/Analytics/AnalyticsView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="/" element={<MetricsView />} />
        <Route path="analytics" element={<AnalyticsView />} />
      </Route>
    </Routes>
  );
}

export default App;
