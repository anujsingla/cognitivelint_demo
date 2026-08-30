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
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="warning" title="Intentional bug" isInline isPlain>
          Disabled controls with no explanation for why they are unavailable.
        </Alert>
        <button disabled onClick={() => {}}>
          Submit application
        </button>
        <Button isDisabled style={{ marginTop: '0.25rem' }}>
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
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="warning" title="Intentional bug" isInline isPlain>
          Shared workspace list with no owner indicators.
        </Alert>
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
    <OuterScrollContainer>
      <InnerScrollContainer>
        <Table aria-label="Shared workspace items" variant="compact" borders isStriped>
          <Thead>
            <Tr>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row) => (
              <Tr key={row.id}>
                <Td dataLabel="Name">{row.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </InnerScrollContainer>
    </OuterScrollContainer>
  );
}

function MissingOwnershipDemo() {
  const resources = [{ id: 'r1', name: 'Production cluster' }];

  return (
    <Card>
      <CardTitle>missing-ownership</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="warning" title="Intentional bug" isInline isPlain>
          Protected resources with no owner metadata shown.
        </Alert>
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
    <Table aria-label="Protected resources" variant="compact" borders>
      <Thead>
        <Tr>
          <Th>Resource</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item) => (
          <Tr key={item.id}>
            <Td dataLabel="Resource">{item.name}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
