import { forwardRef } from 'react';

// Composant Table principal
const Table = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={`w-full caption-bottom text-sm ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  );
});
Table.displayName = 'Table';

// Header de la table
const TableHeader = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={`border-b bg-gray-50 ${className}`}
      {...props}
    >
      {children}
    </thead>
  );
});
TableHeader.displayName = 'TableHeader';

// Body de la table
const TableBody = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className={`divide-y divide-gray-200 ${className}`}
      {...props}
    >
      {children}
    </tbody>
  );
});
TableBody.displayName = 'TableBody';

// Footer de la table
const TableFooter = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <tfoot
      ref={ref}
      className={`border-t bg-gray-50 font-medium ${className}`}
      {...props}
    >
      {children}
    </tfoot>
  );
});
TableFooter.displayName = 'TableFooter';

// Ligne de la table
const TableRow = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={`transition-colors hover:bg-gray-50 ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
});
TableRow.displayName = 'TableRow';

// Cellule header
const TableHead = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={`h-12 px-4 text-left align-middle font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </th>
  );
});
TableHead.displayName = 'TableHead';

// Cellule normale
const TableCell = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={`p-4 align-middle ${className}`}
      {...props}
    >
      {children}
    </td>
  );
});
TableCell.displayName = 'TableCell';

// Export par défaut avec tous les sous-composants
export default Table;
export { TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell };

