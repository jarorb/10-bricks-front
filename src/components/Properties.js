import React from 'react';
import Property from './Property';
import { useGetProperties } from '../hooks/useGetProperties';

import '../styles/components/Property.css';

const API = 'http://127.0.0.1:8000/properties';

const Properties = () => {
  const properties = useGetProperties(API);

  return (
    <div className="Property">
      <div className="Property-items">
        {properties.map(property => (
          <Property key={property.id_properties} property={property} />
        ))}
      </div>
  </div>
  );
}

export { Properties };