'use client';

import { cn } from '@/lib/utils';

interface Column<T> {
  key: keyof T | string;
  header: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  className,
  striped = true,
  hoverable = true,
}: TableProps<T>) {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((column, index) => (
              <th
                key={index}
                className={cn(
                  'py-4 px-4 text-sm font-semibold text-gray-600',
                  alignStyles[column.align || 'left']
                )}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-12">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-12 text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  'border-b border-gray-100 transition',
                  striped && rowIndex % 2 === 0 && 'bg-gray-50/50',
                  hoverable && 'hover:bg-gray-50',
                  onRowClick && 'cursor-pointer'
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column, colIndex) => {
                  const value = row[column.key as keyof T];
                  
                  return (
                    <td
                      key={colIndex}
                      className={cn(
                        'py-4 px-4',
                        alignStyles[column.align || 'left']
                      )}
                    >
                      {column.render ? column.render(value, row) : value}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;