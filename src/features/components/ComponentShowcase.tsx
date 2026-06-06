import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Input,
  PageHeader,
  SectionHeader,
  Select,
  StatCard,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableShell,
  Textarea,
} from '../../components/ui';
import { EmptyState } from '../../components/feedback/EmptyState';
import { ErrorState } from '../../components/feedback/ErrorState';
import { LoadingState } from '../../components/feedback/LoadingState';
import { FilterBar } from '../../components/layout/FilterBar';

const categoryOptions = [
  { label: 'Health', value: 'health' },
  { label: 'Finance', value: 'finance' },
  { label: 'Learning', value: 'learning' },
];

const sampleRows = [
  { id: '1', title: 'Morning run', category: 'Health', value: '5 km', status: 'Active' },
  { id: '2', title: 'Budget review', category: 'Finance', value: '$120', status: 'Pending' },
];

export function ComponentShowcase() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="InsightTrack component showcase"
        description="Reusable dashboard UI primitives composed for metrics, tables, filters, and feedback states."
      />

      <section className="space-y-4">
        <SectionHeader title="Summary cards" description="KPI cards for dashboard overview." />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total metrics" value="24" trend={{ label: '+3 this week', direction: 'up' }} />
          <StatCard label="Weekly value" value="18" hint="Placeholder demo values" />
          <StatCard label="Monthly value" value="62" trend={{ label: 'Stable', direction: 'neutral' }} />
          <StatCard label="Top category" value="Health" />
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title="Filter bar" description="Shell for category, type, and date filters." />
        <FilterBar title="Metric filters" description="Compose filters for the metrics table.">
          <Input label="Search" placeholder="Search metrics..." />
          <Select label="Category" placeholder="All categories" options={categoryOptions} />
          <Input label="From date" type="date" />
          <Input label="To date" type="date" />
        </FilterBar>
      </section>

      <section className="space-y-4">
        <SectionHeader title="Metrics table shell" description="Table with loading and empty handling." />
        <TableShell
          caption="Sample metrics table"
          emptyState={
            <EmptyState
              title="No metrics yet"
              description="Create a metric to populate this table in the dashboard features phase."
              action={<Button size="sm">Add metric</Button>}
            />
          }
          isEmpty={sampleRows.length === 0}
        >
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>
                  <Badge variant={row.status === 'Active' ? 'success' : 'warning'}>{row.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableShell>
      </section>

      <section className="space-y-4">
        <SectionHeader title="Form controls" description="Inputs used for create/edit metric flows." />
        <Card>
          <CardBody className="grid gap-4 md:grid-cols-2">
            <Input label="Metric title" placeholder="Morning run" required />
            <Select label="Category" placeholder="Select category" options={categoryOptions} required />
            <Input label="Value" type="number" placeholder="5" helperText="Numeric metric value" />
            <Input label="Date" type="date" required />
            <div className="md:col-span-2">
              <Textarea label="Note" placeholder="Optional context for this metric." />
            </div>
          </CardBody>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeader title="Feedback states" />
        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardTitle title="Loading" />
            <CardBody>
              <LoadingState message="Loading metrics..." size="sm" />
            </CardBody>
          </Card>
          <Card>
            <CardTitle title="Empty" />
            <CardBody className="p-0">
              <EmptyState title="No results" description="Try adjusting your filters." />
            </CardBody>
          </Card>
          <Card>
            <CardTitle title="Error" />
            <CardBody>
              <ErrorState
                description="Unable to reach the server. Check your connection and try again."
                onRetry={() => undefined}
              />
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title="Buttons and badges" />
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
          <Button loading>Saving</Button>
          <Badge>Default</Badge>
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Pending</Badge>
        </div>
      </section>
    </div>
  );
}
