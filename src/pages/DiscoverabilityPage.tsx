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
  TextInput,
} from '@patternfly/react-core';

/**
 * Fixed patterns:
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
      <Text component="p">Search, navigation, and primary actions are easy to find.</Text>

      <Grid hasGutter style={{ marginTop: '1rem' }}>
        <GridItem span={12} md={6}>
          <SearchableListDemo />
        </GridItem>
        <GridItem span={12} md={6}>
          <ValidNavigationDemo />
        </GridItem>
        <GridItem span={12}>
          <VisiblePrimaryActionDemo />
        </GridItem>
      </Grid>
    </>
  );
}

function SearchableListDemo() {
  const items = Array.from({ length: 20 }, (_, i) => ({ id: String(i), name: `Item ${i}` }));

  return (
    <Card>
      <CardTitle>missing-search (fixed)</CardTitle>
      <CardBody>
        <SearchBar placeholder="Search items" />
        {items.length === 0 ? (
          <EmptyState message="No items match your search." />
        ) : (
          <>
            <DataGrid rows={items} />
            <Pagination total={100} />
          </>
        )}
      </CardBody>
    </Card>
  );
}

function SearchBar({ placeholder }: { placeholder: string }) {
  return <TextInput aria-label="Search items" type="search" placeholder={placeholder} />;
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

function EmptyState({ message }: { message: string }) {
  return <p>{message}</p>;
}

function Pagination({ total }: { total: number }) {
  return <nav aria-label="pagination">Page 1 of {Math.ceil(total / 10)}</nav>;
}

function ValidNavigationDemo() {
  return (
    <Card>
      <CardTitle>empty-navigation (fixed)</CardTitle>
      <CardBody>
        <Nav aria-label="Settings">
          <NavList>
            <NavItem>
              <a href="/settings/general">General</a>
            </NavItem>
            <NavItem>
              <a href="/settings/security">Security</a>
            </NavItem>
            <NavItem>
              <NavLink to="/settings/notifications">Notifications</NavLink>
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

function VisiblePrimaryActionDemo() {
  return (
    <Card>
      <CardTitle>hidden-primary-action (fixed)</CardTitle>
      <CardBody>
        <Button variant="primary" onClick={() => {}}>
          Submit order
        </Button>
        <div style={{ height: 120, marginTop: '1rem' }}>
          <p>Order details appear below without hiding the primary action.</p>
          <div style={{ height: 80 }} />
        </div>
      </CardBody>
    </Card>
  );
}
