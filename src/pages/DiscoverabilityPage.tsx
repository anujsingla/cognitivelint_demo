import { useState } from 'react';
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
  Nav,
  NavList,
  NavItem,
  Pagination,
} from '@patternfly/react-core';

/**
 * Rules triggered:
 * - discoverability/missing-search
 * - discoverability/hidden-primary-action
 * - discoverability/empty-navigation
 */
export function DiscoverabilityPage() {
  return (
    <>
      <Title headingLevel="h1" size="2xl">
        Discoverability
      </Title>
      <Text component="p">Hard-to-find actions, missing search, and dead-end navigation.</Text>

      <Grid hasGutter style={{ marginTop: '1rem' }}>
        <GridItem span={12} md={6}>
          <MissingSearchDemo />
        </GridItem>
        <GridItem span={12} md={6}>
          <EmptyNavigationDemo />
        </GridItem>
        <GridItem span={12}>
          <HiddenPrimaryActionDemo />
        </GridItem>
      </Grid>
    </>
  );
}

function MissingSearchDemo() {
  const items = Array.from({ length: 20 }, (_, i) => ({ id: String(i), name: `Item ${i}` }));

  return (
    <Card>
      <CardTitle>missing-search</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="warning" title="Intentional bug" isInline isPlain>
          Paginated list with no search or filter control.
        </Alert>
        <DataGrid rows={items} />
        <Pagination itemCount={100} perPage={10} page={1} variant="bottom" />
      </CardBody>
    </Card>
  );
}

function DataGrid({ rows }: { rows: { id: string; name: string }[] }) {
  return (
    <ul style={{ maxHeight: 160, overflow: 'auto', margin: 0, paddingLeft: '1rem' }}>
      {rows.map((row) => (
        <li key={row.id}>{row.name}</li>
      ))}
    </ul>
  );
}

function EmptyNavigationDemo() {
  const [activeItem, setActiveItem] = useState<string | number>('general');

  return (
    <Card>
      <CardTitle>empty-navigation</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="warning" title="Intentional bug" isInline isPlain>
          Navigation links use placeholder destinations that go nowhere.
        </Alert>
        <Nav
          aria-label="Settings"
          theme="light"
          onSelect={(_event, selectedItem) => setActiveItem(selectedItem.itemId)}
        >
          <NavList>
            <NavItem itemId="general" to="#" isActive={activeItem === 'general'} preventDefault>
              General
            </NavItem>
            <NavItem itemId="security" to="#" isActive={activeItem === 'security'} preventDefault>
              Security
            </NavItem>
            <NavItem itemId="notifications" to="#" isActive={activeItem === 'notifications'} preventDefault>
              Notifications
            </NavItem>
          </NavList>
        </Nav>
        <Text component="p">Selected section: {activeItem}</Text>
      </CardBody>
    </Card>
  );
}

function HiddenPrimaryActionDemo() {
  return (
    <Card>
      <CardTitle>hidden-primary-action</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="warning" title="Intentional bug" isInline isPlain>
          Primary action is buried inside scrollable content.
        </Alert>
        <div className="scroll-container" style={{ height: 120, overflow: 'auto', border: '1px solid var(--pf-v5-global--BorderColor--100)' }}>
          <p style={{ padding: '0.75rem' }}>Scroll down to find the primary action…</p>
          <div style={{ height: 200 }} />
          <Button variant="primary" onClick={() => {}} style={{ margin: '0.75rem' }}>
            Submit order
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
