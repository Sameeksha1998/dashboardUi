import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import MetricsView from '../components/MetricsView';
import AnalyticsView from '../components/Analytics/AnalyticsView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<MetricsView />} />
          <Route path="analytics" element={<AnalyticsView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
