import axios from 'axios';
import { Dispatch } from 'react';
import { useContext } from 'react';
import { createContext, SetStateAction, useEffect } from 'react';
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

export const usePets = () => {
  const [pets, setPets] = useContext(PetsContext);

  useEffect(() => {
    (async () => {
      if (pets) return;
      const result = await axios.get('/api/pets', getAuthHeaders());
      setPets(result.data);
    })();
  }, [pets, setPets]);

  const reloadPets = () => {
    setPets(null);
  };

  return { pets, reloadPets };
};

type PetsCtx = [Pet[] | null, Dispatch<SetStateAction<Pet[] | null>>];

// eslint-disable-next-line @typescript-eslint/no-empty-function
const PetsContext = createContext<PetsCtx>([[] as Pet[], () => {}]);

export default PetsContext;
