import { PalettesTable } from './palettes-table';
import { palettes } from '../../models/palettes';
import { Index } from '../../components';
import { TableIcon } from '../../icons/table-icon';

export function PalettesIndex() {
  return <Index title="Palettes" views={[
    { id: 'Table', name: 'Table', icon: <TableIcon />, component: <PalettesTable palettes={palettes} /> },
  ]} />;
}