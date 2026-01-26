import { ColorsTable } from './colors-table';
import { colors } from '../../models/colors';
import { Index } from '../../components';
import { TableIcon } from '../../icons/table-icon';

export function ColorsIndex() {
  return <Index title="Colors" views={[
    { id: 'Table', name: 'Table', icon: <TableIcon />, component: <ColorsTable colors={colors} /> },
  ]} />;
}