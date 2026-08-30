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
  FormGroup,
} from '@patternfly/react-core';

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
      <CardBody style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button variant="primary">Deploy</Button>
        <Button variant="primary">Publish</Button>
        <Button variant="primary">Approve</Button>
        <Button variant="secondary">Cancel</Button>
      </CardBody>
    </Card>
  );
}

function GroupedFormDemo() {
  return (
    <Card>
      <CardTitle>long-forms (fixed)</CardTitle>
      <CardBody>
        <form>
          <fieldset>
            <legend>Contact details</legend>
            <TextInput id="f1" aria-label="Name" />
            <TextInput id="f2" aria-label="Email" />
            <TextInput id="f3" aria-label="Phone" />
            <TextInput id="f4" aria-label="Company" />
            <TextInput id="f5" aria-label="Role" />
            <TextInput id="f6" aria-label="Department" />
            <TextInput id="f7" aria-label="Location" />
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
      <CardBody>
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
  return <div className="filter-bar">{children}</div>;
}

function FilterSelect({ name }: { name: string }) {
  return <select aria-label={name} name={name} />;
}

function ScannableTableDemo() {
  return (
    <Card>
      <CardTitle>dense-tables (fixed)</CardTitle>
      <CardBody>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Status</th><th>Owner</th><th>Region</th>
              <th>Created</th><th>Updated</th><th>Version</th><th>Type</th><th>Tier</th>
              <th>Cost</th><th>CPU</th><th>Memory</th><th>Storage</th><th>Health</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td><td>api</td><td>active</td><td>team-a</td><td>us-east</td>
              <td>2024-01-01</td><td>2024-06-01</td><td>v2</td><td>service</td><td>prod</td>
              <td>$120</td><td>2</td><td>4Gi</td><td>50Gi</td><td>ok</td>
            </tr>
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
