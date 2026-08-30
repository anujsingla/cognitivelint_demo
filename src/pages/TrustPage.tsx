import { useState } from 'react';
import {
  Alert,
  Avatar,
  Button,
  Title,
  Text,
  Card,
  CardBody,
  CardTitle,
  Grid,
  GridItem,
  EmptyState,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateIcon,
  Label,
  LabelGroup,
  Tooltip,
} from '@patternfly/react-core';
import { CubesIcon, LockIcon, UsersIcon } from '@patternfly/react-icons';

type WorkspaceItem = { id: string; name: string; owner: string };
type ResourceItem = { id: string; name: string; owner: string };

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
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="info" title="Why actions are disabled" isInline isPlain>
          Hover each control to see why it is unavailable.
        </Alert>
        <Tooltip content="Complete all required fields before submitting">
          <span>
            <button
              disabled
              title="Complete all required fields before submitting"
              aria-describedby="submit-help"
              onClick={() => {}}
            >
              Send application
            </button>
          </span>
        </Tooltip>
        <Text component="p" id="submit-help">
          Submit unlocks after profile verification completes.
        </Text>
        <Tooltip content="Cannot save without profile changes">
          <span>
            <Button isDisabled title="Cannot save without profile changes">
              Save draft
            </Button>
          </span>
        </Tooltip>
      </CardBody>
    </Card>
  );
}

function OwnershipClarityDemo() {
  const [items, setItems] = useState<WorkspaceItem[]>([
    { id: '1', name: 'Dashboard', owner: 'Alex Chen' },
    { id: '2', name: 'Reports', owner: 'Jordan Lee' },
  ]);

  return (
    <Card>
      <CardTitle>ownership-ambiguity (fixed)</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Text component="p">Shared workspace items show who owns each resource.</Text>
        <Button variant="link" onClick={() => setItems([])}>
          Show empty workspace
        </Button>
        <Button variant="link" onClick={() => setItems([
          { id: '1', name: 'Dashboard', owner: 'Alex Chen' },
          { id: '2', name: 'Reports', owner: 'Jordan Lee' },
        ])}>
          Restore sample items
        </Button>
        <TeamWorkspace>
          {items.length === 0 ? (
            <EmptyState variant="sm">
              <EmptyStateHeader
                titleText="No shared items in this workspace"
                icon={<EmptyStateIcon icon={UsersIcon} />}
              />
              <EmptyStateBody>
                <Text component="p">Items shared with your team will appear here with owner labels.</Text>
              </EmptyStateBody>
            </EmptyState>
          ) : (
            <DataList items={items}>
              {items.map((item) => (
                <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <OwnerAvatar owner={item.owner} />
                  {item.name}
                  <Label color="blue">Owner: {item.owner}</Label>
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

function DataList({ children }: { items: WorkspaceItem[]; children?: React.ReactNode }) {
  return <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{children}</ul>;
}

function OwnerAvatar({ owner }: { owner: string }) {
  return <Avatar alt={`Owner ${owner}`} src={`https://ui-avatars.com/api/?name=${encodeURIComponent(owner)}&size=32`} size="sm" />;
}

function OwnershipMetadataDemo() {
  const [resources, setResources] = useState<ResourceItem[]>([
    { id: 'r1', name: 'Production cluster', owner: 'Platform team' },
    { id: 'r2', name: 'Staging cluster', owner: 'DevOps team' },
  ]);

  return (
    <Card>
      <CardTitle>missing-ownership (fixed)</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Text component="p">Protected resources show who manages them.</Text>
        <Button variant="link" onClick={() => setResources([])}>
          Show empty resource list
        </Button>
        <Button variant="link" onClick={() => setResources([
          { id: 'r1', name: 'Production cluster', owner: 'Platform team' },
          { id: 'r2', name: 'Staging cluster', owner: 'DevOps team' },
        ])}>
          Restore sample resources
        </Button>
        <PermissionCheck resource="clusters">
          {resources.length === 0 ? (
            <EmptyState variant="sm">
              <EmptyStateHeader
                titleText="No resources available"
                icon={<EmptyStateIcon icon={CubesIcon} />}
              />
              <EmptyStateBody>
                <Text component="p">Clusters you can access will appear here with owner metadata.</Text>
              </EmptyStateBody>
            </EmptyState>
          ) : (
            <>
              <LabelGroup categoryName="Managed by">
                <Label color="purple" icon={<LockIcon />}>
                  Platform team
                </Label>
              </LabelGroup>
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

function ResourceList({ items }: { items: ResourceItem[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0 0' }}>
      {items.map((item) => (
        <li key={item.id} style={{ marginBottom: '0.5rem' }}>
          <Text component="p">
            {item.name} — <span className="owner">{item.owner}</span>
          </Text>
        </li>
      ))}
    </ul>
  );
}

function OwnerDisplay({ owner }: { owner: string }) {
  return (
    <Alert variant="info" title="Resource ownership" isInline isPlain>
      Managed by {owner}
    </Alert>
  );
}
