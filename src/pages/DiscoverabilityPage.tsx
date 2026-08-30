import { useMemo, useState, type FormEvent } from 'react';
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
  TextInput,
  EmptyState,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateIcon,
  Pagination,
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';

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
  const items = useMemo(
    () => Array.from({ length: 20 }, (_, i) => ({ id: String(i), name: `Item ${i}` })),
    [],
  );
  const [query, setQuery] = useState('');
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <Card>
      <CardTitle>missing-search (fixed)</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <SearchBar
          placeholder="Search items"
          value={query}
          onChange={(_event, value) => setQuery(value)}
        />
        {filteredItems.length === 0 ? (
          <EmptyState variant="sm">
            <EmptyStateHeader
              titleText="No items match your search"
              icon={<EmptyStateIcon icon={SearchIcon} />}
            />
            <EmptyStateBody>
              <Text component="p">Try a different search term or clear the filter.</Text>
            </EmptyStateBody>
          </EmptyState>
        ) : (
          <>
            <DataGrid rows={filteredItems} />
            <Pagination itemCount={100} perPage={10} page={1} variant="bottom" />
          </>
        )}
      </CardBody>
    </Card>
  );
}

function SearchBar({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (event: FormEvent<HTMLInputElement>, value: string) => void;
}) {
  return (
    <TextInput
      aria-label="Search items"
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
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

function ValidNavigationDemo() {
  const [activeItem, setActiveItem] = useState<string | number>('general');

  return (
    <Card>
      <CardTitle>empty-navigation (fixed)</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Text component="p">Every navigation item links to a real destination.</Text>
        <Nav
          aria-label="Settings"
          theme="light"
          onSelect={(_event, selectedItem) => setActiveItem(selectedItem.itemId)}
        >
          <NavList>
            <NavItem
              itemId="general"
              to="/settings/general"
              isActive={activeItem === 'general'}
              preventDefault
            >
              General
            </NavItem>
            <NavItem
              itemId="security"
              to="/settings/security"
              isActive={activeItem === 'security'}
              preventDefault
            >
              Security
            </NavItem>
            <NavItem
              itemId="notifications"
              to="/settings/notifications"
              isActive={activeItem === 'notifications'}
              preventDefault
            >
              Notifications
            </NavItem>
          </NavList>
        </Nav>
        <Text component="p">Selected section: {activeItem}</Text>
      </CardBody>
    </Card>
  );
}

function VisiblePrimaryActionDemo() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Card>
      <CardTitle>hidden-primary-action (fixed)</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="info" title="Primary action placement" isInline isPlain>
          Keep the main action visible above scrollable content.
        </Alert>
        <Button variant="primary" onClick={() => setSubmitted(true)}>
          Submit order
        </Button>
        {submitted && (
          <Alert variant="success" title="Order submitted" isInline timeout={3000} onTimeout={() => setSubmitted(false)}>
            Your order was submitted successfully.
          </Alert>
        )}
        <div style={{ height: 120, marginTop: '0.25rem' }}>
          <Text component="p">Order details appear below without hiding the primary action.</Text>
          <div style={{ height: 80 }} />
        </div>
      </CardBody>
    </Card>
  );
}
