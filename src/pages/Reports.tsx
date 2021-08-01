import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Text } from '@chakra-ui/react';
import { useReports } from '../context/reports';

const ReportsPage = () => {
  const { reports } = useReports();

  return (
    <DefaultLayout>
      <Box>
        <MapContainer style={{ height: 'calc(100vh - 98px)' }} center={[32.087635, 34.788833]} zoom={10}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {reports?.map((report) => (
            <Marker key={report.id} position={[report.latitude, report.longitude]}>
              <Popup>
                <img src={report.image} />
                <Text>{report.location}</Text>
                <Text>{report.description}</Text>
                <Text>נשלח על ידי: {report.reporter.name}</Text>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </DefaultLayout>
  );
};

export default ReportsPage;
