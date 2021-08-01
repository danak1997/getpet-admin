import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAuthHeaders } from '../utils/auth';

export type Report = {
  id: string;
  latitude: number;
  longitude: number;
  location: string;
  description: string;
  image: string;
  reporter: {
    name: string;
    email: string;
  }
}

export const useReports = () => {
  const [reports, setReports] = useState<Report[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (reports) return;
      const result = await axios.get('/api/reports', getAuthHeaders());
      setReports(result.data);
    })();
  }, [reports, setReports]);

  return { reports };
};
