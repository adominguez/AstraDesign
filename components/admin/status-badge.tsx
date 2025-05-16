import { Badge } from "@/components/ui/badge"

const STATUS = {
  CREATING: {
    label: 'Creating',
    color: 'bg-yellow-100 text-yellow-800',
    divColor: 'bg-yellow-600',
  },
  PENDING: {
    label: 'Pending',
    color: 'bg-blue-100 text-blue-800',
    divColor: 'bg-blue-600',
  },
  OK: {
    label: 'OK',
    color: 'bg-green-100 text-green-800',
    divColor: 'bg-green-600',
  },
  ERROR: {
    label: 'Error',
    color: 'bg-red-100 text-red-800',
    divColor: 'bg-red-600',
  },
}

export default function StatusBadge({ status, type = 'badge' }: { status: string, type?: 'badge' | 'div' }) {
  const matchStatus = STATUS[status as keyof typeof STATUS] || STATUS.OK;
  const statusLabel = matchStatus.label;
  const statusColor = matchStatus.color;
  const divColor = matchStatus.divColor;

  return (
    type === 'div' ?
    <div className={`h-1 w-full ${divColor}`}></div>
    : (

      <Badge
        variant="outline"
        className={statusColor}
      >
        {statusLabel}
      </Badge>
    )
  );
}