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
 * Rules triggered:
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
      <Text component="p">Too many choices, fields, filters, and table columns.</Text>

      <Grid hasGutter style={{ marginTop: '1rem' }}>
        <GridItem span={12}>
          <ExcessivePrimaryActionsDemo />
        </GridItem>
        <GridItem span={12} md={6}>
          <LongFormDemo />
        </GridItem>
        <GridItem span={12} md={6}>
          <FilterOverloadDemo />
        </GridItem>
        <GridItem span={12}>
          <DenseTableDemo />
        </GridItem>
      </Grid>
    </>
  );
}

function ExcessivePrimaryActionsDemo() {
  return (
    <Card>
      <CardTitle>excessive-primary-actions</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="warning" title="Intentional bug" isInline isPlain>
          Four competing primary actions make the main task unclear.
        </Alert>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button variant="primary">Deploy</Button>
          <Button variant="primary">Publish</Button>
          <Button variant="primary">Approve</Button>
          <Button variant="primary">Release</Button>
        </div>
      </CardBody>
    </Card>
  );
}

/** Static fields required — parser cannot see .map()-generated JSX */
function LongFormDemo() {
  return (
    <Card>
      <CardTitle>long-forms</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="warning" title="Intentional bug" isInline isPlain>
          Fourteen fields with no grouping increases cognitive load.
        </Alert>
        <form style={{ display: 'grid', gap: '0.5rem' }}>
          <TextInput id="f1" aria-label="Name" placeholder="Name" />
          <TextInput id="f2" aria-label="Email" placeholder="Email" />
          <TextInput id="f3" aria-label="Phone" placeholder="Phone" />
          <TextInput id="f4" aria-label="Company" placeholder="Company" />
          <TextInput id="f5" aria-label="Role" placeholder="Role" />
          <TextInput id="f6" aria-label="Department" placeholder="Department" />
          <TextInput id="f7" aria-label="Location" placeholder="Location" />
          <TextInput id="f8" aria-label="Timezone" placeholder="Timezone" />
          <TextInput id="f9" aria-label="Language" placeholder="Language" />
          <TextInput id="f10" aria-label="Bio" placeholder="Bio" />
          <TextInput id="f11" aria-label="Website" placeholder="Website" />
          <TextInput id="f12" aria-label="LinkedIn" placeholder="LinkedIn" />
          <TextInput id="f13" aria-label="Notes" placeholder="Notes" />
          <TextInput id="f14" aria-label="Referral" placeholder="Referral" />
        </form>
      </CardBody>
    </Card>
  );
}

/** Static filter components — parser cannot see .map()-generated JSX */
function FilterOverloadDemo() {
  return (
    <Card>
      <CardTitle>filter-overload</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="warning" title="Intentional bug" isInline isPlain>
          Twelve visible filters create decision fatigue.
        </Alert>
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
          <FilterSelect name="namespace" />
          <FilterSelect name="label" />
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
  return <select aria-label={name} name={name} style={{ minWidth: 120 }} />;
}

/** Static columns required — parser cannot see .map()-generated JSX */
function DenseTableDemo() {
  return (
    <Card>
      <CardTitle>dense-tables</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="warning" title="Intentional bug" isInline isPlain>
          Eighteen columns make the table hard to scan.
        </Alert>
        <OuterScrollContainer>
          <InnerScrollContainer>
            <Table aria-label="Dense workload table" variant="compact" borders isStriped>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Status</Th>
                  <Th>Owner</Th>
                  <Th>Region</Th>
                  <Th>Created</Th>
                  <Th>Updated</Th>
                  <Th>Version</Th>
                  <Th>Type</Th>
                  <Th>Tier</Th>
                  <Th>Cost</Th>
                  <Th>CPU</Th>
                  <Th>Memory</Th>
                  <Th>Storage</Th>
                  <Th>Network</Th>
                  <Th>Replicas</Th>
                  <Th>Health</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td dataLabel="ID">1</Td>
                  <Td dataLabel="Name">api</Td>
                  <Td dataLabel="Status">active</Td>
                  <Td dataLabel="Owner">team-a</Td>
                  <Td dataLabel="Region">us-east</Td>
                  <Td dataLabel="Created">2024-01-01</Td>
                  <Td dataLabel="Updated">2024-06-01</Td>
                  <Td dataLabel="Version">v2</Td>
                  <Td dataLabel="Type">service</Td>
                  <Td dataLabel="Tier">prod</Td>
                  <Td dataLabel="Cost">$120</Td>
                  <Td dataLabel="CPU">2</Td>
                  <Td dataLabel="Memory">4Gi</Td>
                  <Td dataLabel="Storage">50Gi</Td>
                  <Td dataLabel="Network">1Gbps</Td>
                  <Td dataLabel="Replicas">3</Td>
                  <Td dataLabel="Health">ok</Td>
                  <Td dataLabel="Actions">…</Td>
                </Tr>
              </Tbody>
            </Table>
          </InnerScrollContainer>
        </OuterScrollContainer>
      </CardBody>
    </Card>
  );
}
