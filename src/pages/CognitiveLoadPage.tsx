import {
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
      <CardBody style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button variant="primary">Deploy</Button>
        <Button variant="primary">Publish</Button>
        <Button variant="primary">Approve</Button>
        <Button variant="primary">Release</Button>
      </CardBody>
    </Card>
  );
}

/** Static fields required — parser cannot see .map()-generated JSX */
function LongFormDemo() {
  return (
    <Card>
      <CardTitle>long-forms</CardTitle>
      <CardBody>
        <form>
          <TextInput id="f1" aria-label="Name" />
          <TextInput id="f2" aria-label="Email" />
          <TextInput id="f3" aria-label="Phone" />
          <TextInput id="f4" aria-label="Company" />
          <TextInput id="f5" aria-label="Role" />
          <TextInput id="f6" aria-label="Department" />
          <TextInput id="f7" aria-label="Location" />
          <TextInput id="f8" aria-label="Timezone" />
          <TextInput id="f9" aria-label="Language" />
          <TextInput id="f10" aria-label="Bio" />
          <TextInput id="f11" aria-label="Website" />
          <TextInput id="f12" aria-label="LinkedIn" />
          <TextInput id="f13" aria-label="Notes" />
          <TextInput id="f14" aria-label="Referral" />
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
      <CardBody style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
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
      </CardBody>
    </Card>
  );
}

function FilterSelect({ name }: { name: string }) {
  return <select aria-label={name} name={name} />;
}

/** Static columns required — parser cannot see .map()-generated JSX */
function DenseTableDemo() {
  return (
    <Card>
      <CardTitle>dense-tables</CardTitle>
      <CardBody style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Status</th><th>Owner</th><th>Region</th>
              <th>Created</th><th>Updated</th><th>Version</th><th>Type</th><th>Tier</th>
              <th>Cost</th><th>CPU</th><th>Memory</th><th>Storage</th><th>Network</th>
              <th>Replicas</th><th>Health</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td><td>api</td><td>active</td><td>team-a</td><td>us-east</td>
              <td>2024-01-01</td><td>2024-06-01</td><td>v2</td><td>service</td><td>prod</td>
              <td>$120</td><td>2</td><td>4Gi</td><td>50Gi</td><td>1Gbps</td>
              <td>3</td><td>ok</td><td>…</td>
            </tr>
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
