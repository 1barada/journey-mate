import { createContext, useContext } from 'react';

interface MilestoneSelectZoneContext {
  onChange: (value: any) => void;
  onEdit?: (value: any) => void;
}
const Context = createContext<MilestoneSelectZoneContext | null>(null);

export const useMilestoneSelectZone = () => {
  const ctx = useContext(Context);

  if (!ctx) throw new Error('Must be inside MilestoneSelectZoneContextProvider');

  return ctx;
};

interface MilestoneSelectZoneContextProps extends React.PropsWithChildren {
  value: MilestoneSelectZoneContext;
}
export const MilestoneSelectZoneContext: React.FC<MilestoneSelectZoneContextProps> = ({ children, value }) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
