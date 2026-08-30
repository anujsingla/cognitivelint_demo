import {
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
      <CardBody>
        <DataGrid rows={items} />
        <Pagination total={100} />
      </CardBody>
    </Card>
  );
}

function DataGrid({ rows }: { rows: { id: string; name: string }[] }) {
  return (
    <ul>
      {rows.map((row) => (
        <li key={row.id}>{row.name}</li>
      ))}
    </ul>
  );
}

function Pagination({ total }: { total: number }) {
  return <nav aria-label="pagination">Page 1 of {Math.ceil(total / 10)}</nav>;
}

function EmptyNavigationDemo() {
  return (
    <Card>
      <CardTitle>empty-navigation</CardTitle>
      <CardBody>
        <Nav aria-label="Settings">
          <NavList>
            <NavItem>
              <a href="#">General</a>
            </NavItem>
            <NavItem>
              <a href="#">Security</a>
            </NavItem>
            <NavItem>
              <NavLink to="#">Notifications</NavLink>
            </NavItem>
          </NavList>
        </Nav>
      </CardBody>
    </Card>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <a href={to}>{children}</a>;
}

function HiddenPrimaryActionDemo() {
  return (
    <Card>
      <CardTitle>hidden-primary-action</CardTitle>
      <CardBody>
        <div className="scroll-container" style={{ height: 120, overflow: 'auto' }}>
          <p>Scroll down to find the primary action…</p>
          <div style={{ height: 200 }} />
          <Button variant="primary" onClick={() => {}}>
            Submit order
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
