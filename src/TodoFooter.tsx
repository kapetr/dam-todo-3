type Filter = 'All' | 'Active' | 'Completed';

interface Props {
  activeCount: number;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const FILTERS: Filter[] = ['All', 'Active', 'Completed'];

export function TodoFooter({ activeCount, filter, onFilterChange }: Props) {
  return (
    <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
      <span>{activeCount} {activeCount === 1 ? 'item' : 'items'} left</span>
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            style={{ fontWeight: filter === f ? 'bold' : 'normal', textDecoration: filter === f ? 'underline' : 'none' }}
          >
            {f}
          </button>
        ))}
      </div>
    </footer>
  );
}

export type { Filter };
