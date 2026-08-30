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
 * Fixed patterns:
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
        Disabled controls explain why they are unavailable; lists show ownership clearly.
      </Text>

      <Grid hasGutter style={{ marginTop: '1rem' }}>
        <GridItem span={12} md={4}>
          <ExplainedDisabledDemo />
        </GridItem>
        <GridItem span={12} md={4}>
          <OwnershipClarityDemo />
        </GridItem>
        <GridItem span={12} md={4}>
          <OwnershipMetadataDemo />
        </GridItem>
      </Grid>
    </>
  );
}

function ExplainedDisabledDemo() {
  return (
    <Card>
      <CardTitle>unexplained-disabled (fixed)</CardTitle>
      <CardBody>
        <button
          disabled
          title="Complete all required fields before submitting"
          aria-describedby="submit-help"
          onClick={() => {}}
        >
          Send application
        </button>
        <p id="submit-help" style={{ marginTop: '0.5rem' }}>
          Submit unlocks after profile verification completes.
        </p>
        <Button
          isDisabled
          title="Cannot save without profile changes"
          style={{ marginTop: '0.5rem' }}
        >
          Save draft
        </Button>
      </CardBody>
    </Card>
  );
}

function OwnershipClarityDemo() {
  const items = [{ id: '1', name: 'Dashboard', owner: 'Alex Chen' }];

  return (
    <Card>
      <CardTitle>ownership-ambiguity (fixed)</CardTitle>
      <CardBody>
        <TeamWorkspace>
          {items.length === 0 ? (
            <EmptyState message="No shared items in this workspace" />
          ) : (
            <DataList items={items}>
              {items.map((item) => (
                <li key={item.id}>
                  <OwnerAvatar owner={item.owner} />
                  {item.name}
                </li>
              ))}
            </DataList>
          )}
        </TeamWorkspace>
      </CardBody>
    </Card>
  );
}

function TeamWorkspace({ children }: { children: React.ReactNode }) {
  return <div className="team-workspace">{children}</div>;
}

function DataList({ items, children }: { items: { id: string; name: string; owner: string }[]; children?: React.ReactNode }) {
  return (
    <ul>
      {children ??
        items.map((item) => (
          <li key={item.id}>
            <OwnerAvatar owner={item.owner} />
            {item.name}
          </li>
        ))}
    </ul>
  );
}

function OwnerAvatar({ owner }: { owner: string }) {
  return <span aria-label={`Owner: ${owner}`}>{owner}</span>;
}

function EmptyState({ message }: { message: string }) {
  return <p>{message}</p>;
}

function OwnershipMetadataDemo() {
  const resources = [{ id: 'r1', name: 'Production cluster', owner: 'Platform team' }];

  return (
    <Card>
      <CardTitle>missing-ownership (fixed)</CardTitle>
      <CardBody>
        <PermissionCheck resource="clusters">
          {resources.length === 0 ? (
            <EmptyState message="No resources available" />
          ) : (
            <>
              <ResourceList items={resources} />
              <OwnerDisplay owner="Platform team" />
            </>
          )}
        </PermissionCheck>
      </CardBody>
    </Card>
  );
}

function PermissionCheck({ children }: { resource: string; children: React.ReactNode }) {
  return <div>{children}</div>;
}

function ResourceList({ items }: { items: { id: string; name: string; owner: string }[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name} — <span className="owner">{item.owner}</span>
        </li>
      ))}
    </ul>
  );
}

function OwnerDisplay({ owner }: { owner: string }) {
  return <p>Managed by {owner}</p>;
}
