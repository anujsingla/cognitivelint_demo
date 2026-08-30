import {
  Alert,
  Button,
  Title,
  Text,
  Card,
  CardBody,
  CardTitle,
  Grid,
  GridItem,
  TextInput,
  FormGroup,
  Label,
} from '@patternfly/react-core';
import {
  InnerScrollContainer,
  OuterScrollContainer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';

/**
 * Fixed patterns:
 * - cognitive-load/excessive-primary-actions
 * - cognitive-load/long-forms
 * - cognitive-load/filter-overload
 * - cognitive-load/dense-tables
 */
export function CognitiveLoadPage() {
  return (
    <>
      <Title headingLevel="h1" size="2xl">
        Cognitive Load
      </Title>
      <Text component="p">Focused actions, grouped forms, and scannable data layouts.</Text>

      <Grid hasGutter style={{ marginTop: '1rem' }}>
        <GridItem span={12}>
          <PrimaryActionsDemo />
        </GridItem>
        <GridItem span={12} md={6}>
          <GroupedFormDemo />
        </GridItem>
        <GridItem span={12} md={6}>
          <FilterBarDemo />
        </GridItem>
        <GridItem span={12}>
          <ScannableTableDemo />
        </GridItem>
      </Grid>
    </>
  );
}

function PrimaryActionsDemo() {
  return (
    <Card>
      <CardTitle>excessive-primary-actions (fixed)</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="info" title="One primary action" isInline isPlain>
          Use a single primary action per view. Secondary actions support the main task.
        </Alert>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary">Deploy</Button>
          <Label color="blue">Primary action</Label>
          <Button variant="secondary">Publish</Button>
          <Button variant="secondary">Approve</Button>
          <Button variant="link">Cancel</Button>
        </div>
      </CardBody>
    </Card>
  );
}

function GroupedFormDemo() {
  return (
    <Card>
      <CardTitle>long-forms (fixed)</CardTitle>
      <CardBody>
        <Text component="p" style={{ marginBottom: '0.75rem' }}>
          Long forms are split into labeled sections to reduce cognitive load.
        </Text>
        <form>
          <fieldset style={{ border: '1px solid var(--pf-v5-global--BorderColor--100)', padding: '0.75rem', marginBottom: '1rem' }}>
            <legend>Contact details</legend>
            <FormGroup label="Name" fieldId="f1">
              <TextInput id="f1" aria-label="Name" />
            </FormGroup>
            <FormGroup label="Email" fieldId="f2">
              <TextInput id="f2" aria-label="Email" />
            </FormGroup>
            <FormGroup label="Phone" fieldId="f3">
              <TextInput id="f3" aria-label="Phone" />
            </FormGroup>
            <FormGroup label="Company" fieldId="f4">
              <TextInput id="f4" aria-label="Company" />
            </FormGroup>
            <FormGroup label="Role" fieldId="f5">
              <TextInput id="f5" aria-label="Role" />
            </FormGroup>
            <FormGroup label="Department" fieldId="f6">
              <TextInput id="f6" aria-label="Department" />
            </FormGroup>
            <FormGroup label="Location" fieldId="f7">
              <TextInput id="f7" aria-label="Location" />
            </FormGroup>
          </fieldset>
          <FormGroup label="Preferences">
            <TextInput id="f8" aria-label="Timezone" />
            <TextInput id="f9" aria-label="Language" />
            <TextInput id="f10" aria-label="Bio" />
            <TextInput id="f11" aria-label="Website" />
            <TextInput id="f12" aria-label="LinkedIn" />
            <TextInput id="f13" aria-label="Notes" />
            <TextInput id="f14" aria-label="Referral" />
          </FormGroup>
        </form>
      </CardBody>
    </Card>
  );
}

function FilterBarDemo() {
  return (
    <Card>
      <CardTitle>filter-overload (fixed)</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Text component="p">Limit visible filters to the most useful set (10 or fewer).</Text>
        <FilterBar>
          <FilterSelect name="status" />
          <FilterSelect name="region" />
          <FilterSelect name="owner" />
          <FilterSelect name="priority" />
          <FilterSelect name="type" />
          <FilterSelect name="category" />
          <FilterSelect name="tag" />
          <FilterSelect name="version" />
          <FilterSelect name="environment" />
          <FilterSelect name="cluster" />
        </FilterBar>
      </CardBody>
    </Card>
  );
}

function FilterBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="filter-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {children}
    </div>
  );
}

function FilterSelect({ name }: { name: string }) {
  return (
    <TextInput
      aria-label={`Filter by ${name}`}
      type="search"
      placeholder={name}
      name={name}
      style={{ width: 120 }}
    />
  );
}

function ScannableTableDemo() {
  const columns = [
    'ID',
    'Name',
    'Status',
    'Owner',
    'Region',
    'Version',
    'Type',
    'Tier',
    'Health',
    'Cost',
  ] as const;

  const rows = [
    {
      id: '1',
      name: 'api-gateway',
      status: 'active',
      owner: 'team-a',
      region: 'us-east',
      version: 'v2.4',
      type: 'service',
      tier: 'prod',
      health: 'ok',
      cost: '$120',
    },
    {
      id: '2',
      name: 'billing-worker',
      status: 'active',
      owner: 'team-b',
      region: 'eu-west',
      version: 'v1.8',
      type: 'worker',
      tier: 'prod',
      health: 'ok',
      cost: '$86',
    },
    {
      id: '3',
      name: 'analytics-etl',
      status: 'paused',
      owner: 'team-c',
      region: 'us-west',
      version: 'v3.1',
      type: 'job',
      tier: 'staging',
      health: 'warn',
      cost: '$42',
    },
  ];

  return (
    <Card>
      <CardTitle>dense-tables (fixed)</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Text component="p">
          Keep tables scannable with essential columns only, PatternFly styling, and horizontal scroll
          when needed.
        </Text>
        <OuterScrollContainer>
          <InnerScrollContainer>
            <Table aria-label="Service inventory" variant="compact" borders isStriped>
              <Thead>
                <Tr>
                  {columns.map((column) => (
                    <Th key={column} modifier="nowrap">
                      {column}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {rows.map((row) => (
                  <Tr key={row.id}>
                    <Td dataLabel={columns[0]}>{row.id}</Td>
                    <Td dataLabel={columns[1]} modifier="breakWord">
                      {row.name}
                    </Td>
                    <Td dataLabel={columns[2]}>
                      <Label color={row.status === 'active' ? 'green' : 'orange'} isCompact>
                        {row.status}
                      </Label>
                    </Td>
                    <Td dataLabel={columns[3]}>{row.owner}</Td>
                    <Td dataLabel={columns[4]}>{row.region}</Td>
                    <Td dataLabel={columns[5]}>{row.version}</Td>
                    <Td dataLabel={columns[6]}>{row.type}</Td>
                    <Td dataLabel={columns[7]}>{row.tier}</Td>
                    <Td dataLabel={columns[8]}>
                      <Label color={row.health === 'ok' ? 'green' : 'orange'} isCompact>
                        {row.health}
                      </Label>
                    </Td>
                    <Td dataLabel={columns[9]}>{row.cost}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </InnerScrollContainer>
        </OuterScrollContainer>
      </CardBody>
    </Card>
  );
}
