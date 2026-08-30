import {
  Button,
  Title,
  Text,
  Card,
  CardBody,
  CardTitle,
  Grid,
  GridItem,
} from '@patternfly/react-core';

/**
 * Rules triggered:
 * - trust-confidence/unexplained-disabled
 * - trust-confidence/ownership-ambiguity
 * - trust-confidence/missing-ownership
 */
export function TrustPage() {
  return (
    <>
      <Title headingLevel="h1" size="2xl">
        Trust &amp; Confidence
      </Title>
      <Text component="p">
        Disabled controls without explanation, shared lists without ownership cues.
      </Text>

      <Grid hasGutter style={{ marginTop: '1rem' }}>
        <GridItem span={12} md={4}>
          <UnexplainedDisabledDemo />
        </GridItem>
        <GridItem span={12} md={4}>
          <OwnershipAmbiguityDemo />
        </GridItem>
        <GridItem span={12} md={4}>
          <MissingOwnershipDemo />
        </GridItem>
      </Grid>
    </>
  );
}

function UnexplainedDisabledDemo() {
  return (
    <Card>
      <CardTitle>unexplained-disabled</CardTitle>
      <CardBody>
        {/* Native disabled works reliably; PatternFly isDisabled is a known gap */}
        <button disabled onClick={() => {}}>
          Submit application
        </button>
        <br />
        <Button isDisabled style={{ marginTop: '0.5rem' }}>
          PatternFly isDisabled (may not flag)
        </Button>
      </CardBody>
    </Card>
  );
}

function OwnershipAmbiguityDemo() {
  const items = [{ id: '1', name: 'Dashboard' }];

  return (
    <Card>
      <CardTitle>ownership-ambiguity</CardTitle>
      <CardBody>
        <TeamWorkspace>
          <DataTable rows={items} />
        </TeamWorkspace>
      </CardBody>
    </Card>
  );
}

function TeamWorkspace({ children }: { children: React.ReactNode }) {
  return <div className="team-workspace">{children}</div>;
}

function DataTable({ rows }: { rows: { id: string; name: string }[] }) {
  return (
    <table>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>{row.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MissingOwnershipDemo() {
  const resources = [{ id: 'r1', name: 'Production cluster' }];

  return (
    <Card>
      <CardTitle>missing-ownership</CardTitle>
      <CardBody>
        <PermissionCheck resource="clusters">
          <ResourceList items={resources} />
        </PermissionCheck>
      </CardBody>
    </Card>
  );
}

function PermissionCheck({ children }: { resource: string; children: React.ReactNode }) {
  return <div>{children}</div>;
}

function ResourceList({ items }: { items: { id: string; name: string }[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
