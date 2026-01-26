import { ThemesTable } from './themes-table';
import { themes } from '../../models/themes';
import { Index } from '../../components';
import { TableIcon } from '../../icons/table-icon';

export function ThemesIndex() {
  return <Index title="Themes" views={[
    { id: 'Table', name: 'Table', icon: <TableIcon />, component: <ThemesTable themes={themes} /> },
  ]} />;
}