import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAuthHeaders } from '../utils/auth';

export type Pet = {
  id: string,
  name: string,
  description: string,
  type: string,
  age: number,
  gender: string,
  profilePhoto: string,
  tags: string[]
}

const cache = { pets: undefined };

export const usePets = () => {
  const [pets, setPets] = useState<Pet[] | undefined>(cache.pets);

  useEffect(() => {
    (async () => {
      if (pets) return;
      const result = await axios.get('/api/pets', getAuthHeaders());
      setPets(result.data);
      cache.pets = result.data;
    })();
  }, [pets, setPets]);

  return { pets };
};
