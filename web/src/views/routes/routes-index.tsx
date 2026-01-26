import { RoutesTable } from './routes-table';
import { getRoutes } from '../../models/routes';
import { Index } from '../../components';
import { TableIcon } from '../../icons/table-icon';

export function RoutesIndex() {
  return <Index title="Routes" views={[
    { id: 'Table', name: 'Table', icon: <TableIcon />, component: <RoutesTable routes={getRoutes()} /> },
  ]} />;
}